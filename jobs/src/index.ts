import 'dotenv/config'

import {
  ContainerClient,
  StorageSharedKeyCredential,
} from '@azure/storage-blob'
import { BlobServiceClient } from '@azure/storage-blob'
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
} from 'fs'
import { readFile, writeFile } from 'fs/promises'
import path from 'path'

import type { PartialSiteData } from '$models/SiteData'

import { generateGistInfo, generateRepoInfo } from './integrations/github'
import { generateResumeInfo } from './integrations/linkedin'

const mergeJSON = (baseData: PartialSiteData, newData: PartialSiteData) => {
  const newObj = structuredClone(baseData) as Record<string, unknown>
  for (const [k, v] of Object.entries(newData)) {
    const valueToCompare = newObj[k]

    if (!valueToCompare) {
      newObj[k] = v
    } else if (Array.isArray(valueToCompare) && Array.isArray(v)) {
      newObj[k] = mergeArray(
        valueToCompare as Record<string, unknown>[],
        v as Record<string, unknown>[]
      )
    } else if (typeof valueToCompare === 'object' && typeof v === 'object') {
      newObj[k] = mergeJSON(valueToCompare, v as object)
    } else {
      newObj[k] = v
    }
  }

  return newObj
}

const mergeArray = (
  baseArray: Record<string, unknown>[],
  newArray: Record<string, unknown>[]
) => {
  if (baseArray.length === 0) {
    return newArray
  } else if (typeof baseArray[0] !== 'object') {
    return [...baseArray, ...newArray]
  } else if (Array.isArray(baseArray[0])) {
    throw new Error('Nested Array')
  }

  const mergedArray: Record<string, unknown>[] = []

  for (const i of baseArray) {
    const key = i['name']

    if (!key) {
      mergedArray.push(i)
      continue
    }

    const matchingItems = newArray.filter((v) => v['name'] === key)

    if (matchingItems[0]) {
      mergedArray.push(mergeJSON(i, matchingItems[0]))
      continue
    }

    mergedArray.push(i)
  }

  for (const i of newArray) {
    if (!i['name']) {
      mergedArray.push(i)
    }

    const matchingItems = mergedArray.filter((v) => v['name'] === i['name'])

    if (matchingItems.length === 0) {
      mergedArray.push(i)
    }
  }

  return mergedArray
}

const uploadToAzure = async () => {
  if (
    !(
      process.env['AZURE_ACCOUNT_KEY'] &&
      process.env['AZURE_STORAGE_ACCOUNT_NAME']
    )
  ) {
    return
  }

  const key = process.env['AZURE_ACCOUNT_KEY']
  const account = process.env['AZURE_STORAGE_ACCOUNT_NAME']

  const sharedKeyCredential = new StorageSharedKeyCredential(account, key)
  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  )
  const containerClient = blobServiceClient.getContainerClient('$web')
  await uploadDirectory('data', containerClient)
}

const uploadDirectory = async (dirPath: string, container: ContainerClient) => {
  const folders = readdirSync(dirPath)

  for (const file of folders) {
    const filePath = path.join(dirPath, file)

    if (statSync(filePath).isDirectory()) {
      await uploadDirectory(filePath, container)
    } else {
      const blobClient = container.getBlockBlobClient(filePath)
      await blobClient.uploadFile(filePath, {
        blobHTTPHeaders: {
          blobContentType:
            filePath.split('.').pop() === 'json'
              ? 'application/json'
              : 'image/jpeg',
        },
      })
    }
  }
}

if (
  !(
    process.env['GITHUB_KEY'] &&
    process.env['GITHUB_USERNAME'] &&
    process.env['CHROME_USER_DATA'] &&
    process.env['LINKEDIN_USERNAME']
  )
) {
  throw new Error('Missing environment variables')
}

if (!process.argv[2]) {
  throw new Error('Missing Argument')
}

if (!existsSync('./data/img')) {
  mkdirSync('./data/img', { recursive: true })
}

const [repos, gists, resume] = await Promise.all([
  generateRepoInfo(process.env['GITHUB_KEY'], process.env['GITHUB_USERNAME']),
  generateGistInfo(process.env['GITHUB_KEY'], process.env['GITHUB_USERNAME']),
  generateResumeInfo(
    process.env['CHROME_USER_DATA'],
    process.env['LINKEDIN_USERNAME'],
    './data/img/'
  ),
])

const generatedData: PartialSiteData = {
  projects: { projectList: [...repos, ...gists] },
  resume,
}
const manualData = JSON.parse(
  await readFile('./local_data/local_data.json', 'utf-8')
) as PartialSiteData

const mergedData = mergeJSON(generatedData, manualData)
const homepageMarkdown = await readFile('./local_data/homepage.md', 'utf-8')

await writeFile(
  './data/siteData.json',
  JSON.stringify({ ...mergedData, homepageMarkdown })
)

if (process.argv[2] === 'local') {
  cpSync('./data', '../web/data', { recursive: true })
  cpSync('./data', '../web/dist/data', { recursive: true })
} else if (process.argv[2] === 'azure') {
  await uploadToAzure()
}

rmSync('./data', { recursive: true, force: true })
