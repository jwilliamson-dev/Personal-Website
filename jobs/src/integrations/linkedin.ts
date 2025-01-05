import { CheerioAPI, load } from 'cheerio'
import { existsSync } from 'fs'
import { writeFile } from 'fs/promises'
import { Browser, Builder } from 'selenium-webdriver'
import { Options } from 'selenium-webdriver/chrome.js'

import type {
  EducationInfo,
  ExperienceInfo,
  PublicationInfo,
} from '$models/Resume'

interface ExperienceData {
  thumbnailUrl: string | undefined
  profileUrl: string | undefined
  info: string[]
}

export const generateResumeInfo = async (
  chromeData: string,
  username: string,
  baseFilePath: string
) => {
  const html = await loadLinkedInProfile(chromeData, username)

  const $ = load(html)

  return {
    experience: await getExperience($, baseFilePath),
    education: await getEducation($, baseFilePath),
    publications: getPublications($),
  }
}

const loadLinkedInProfile = async (chromeData: string, username: string) => {
  const options = new Options()
  options.addArguments(`--user-data-dir=${chromeData}`)
  const driver = await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build()

  await driver.get(`https://www.linkedin.com/in/${username}/`)
  await driver.sleep(3000)
  const html = await driver.executeScript<string>(
    'return document.documentElement.outerHTML'
  )
  await driver.quit()

  return html
}

const getExperience = async (
  $: CheerioAPI,
  baseFilePath: string
): Promise<ExperienceInfo[]> => {
  const experience = $('#experience')
    .parent()
    .extract({
      experiences: [
        {
          selector: '.artdeco-list__item',
          value: {
            thumbnailUrl: {
              selector: 'img',
              value: 'src',
            },
            profileUrl: {
              selector: 'a',
              value: 'href',
            },
            info: [
              {
                selector: '[aria-hidden=true]',
                value: 'innerText',
              },
            ],
          },
        },
      ],
    })

  const result = await Promise.all(
    experience.experiences.map(async (exp) => {
      if (exp.info.length > 5) {
        return handleMultipleRoles(exp, baseFilePath)
      }

      return handleSingleRole(exp, baseFilePath)
    })
  )

  return result.flat()
}

const handleMultipleRoles = async (
  exp: ExperienceData,
  baseFilePath: string
): Promise<ExperienceInfo[]> => {
  const { thumbnailUrl = '', profileUrl = '', info = [] } = exp
  const [
    name = '',
    employmentTypeAndTotalDuration = '',
    locationAndLocationType = '',
    ...rest
  ] = info
  const roles: string[][] = []

  const [employmentType = '', _totalDuration = ''] =
    employmentTypeAndTotalDuration.split('·').map((s) => s.trim())

  const [location = '', locationType = ''] = locationAndLocationType
    .split('·')
    .map((s) => s.trim())

  while (rest.length > 0) {
    rest.splice(0, 1)
    const role = rest.splice(0, 3)
    roles.push(role)
  }

  return await Promise.all(
    roles.flatMap(async (role) => {
      const [title = '', datesAndDuration = '', duties = ''] = role

      const [startMonth = '', endMonth = '', duration = ''] = datesAndDuration
        .split(/·|-/)
        .map((s) => s.trim())

      const dutyList = duties
        .split('- ')
        .map((s) => s.trim())
        .filter((s) => s.length > 0)

      const thumbnailPath = await downloadThumbnail(
        thumbnailUrl,
        `${baseFilePath}${name}`
      )

      return {
        thumbnailUrl: thumbnailPath,
        profileUrl,
        title,
        name,
        employmentType,
        startMonth,
        endMonth,
        duration,
        location,
        locationType,
        dutyList,
      }
    })
  )
}

const handleSingleRole = async (
  exp: ExperienceData,
  baseFilePath: string
): Promise<ExperienceInfo> => {
  const { thumbnailUrl = '', profileUrl = '', info = [] } = exp
  const [
    title = '',
    employment = '',
    datesAndDuration = '',
    locationAndLocationType = '',
    duties = '',
  ] = info
  const [name = '', employmentType = ''] = employment
    .split('·')
    .map((s) => s.trim())

  const [startMonth = '', endMonth = '', duration = ''] = datesAndDuration
    .split(/·|-/)
    .map((s) => s.trim())
  const dutyList = duties
    .split('- ')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
  const [location = '', locationType = ''] = locationAndLocationType
    .split('·')
    .map((s) => s.trim())

  const thumbnailPath = await downloadThumbnail(
    thumbnailUrl,
    `${baseFilePath}${name}`
  )

  const result: ExperienceInfo = {
    thumbnailUrl: thumbnailPath,
    profileUrl,
    title,
    name,
    employmentType,
    startMonth,
    endMonth,
    duration,
    location,
    locationType,
    dutyList,
  }

  return result
}

const getEducation = async (
  $: CheerioAPI,
  baseFilePath: string
): Promise<EducationInfo[]> => {
  const education = $('#education')
    .parent()
    .extract({
      education: [
        {
          selector: '.artdeco-list__item',
          value: {
            thumbnailUrl: {
              selector: 'img',
              value: 'src',
            },
            profileUrl: {
              selector: 'a',
              value: 'href',
            },
            info: [
              {
                selector: '[aria-hidden=true]',
                value: 'innerText',
              },
            ],
          },
        },
      ],
    })

  return await Promise.all(
    education.education.map(async (edu) => {
      const { thumbnailUrl = '', profileUrl = '', info = [] } = edu
      const [name = '', degree = '', dates = '', additionalInfos = ''] = info

      const additionalInfo = additionalInfos
        .split('- ')
        .map((s) => s.trim())
        .filter((s) => s.length > 0)

      const thumbnailPath = await downloadThumbnail(
        thumbnailUrl,
        `${baseFilePath}${name}`
      )

      return {
        thumbnailUrl: thumbnailPath,
        profileUrl,
        name,
        degree,
        dates,
        additionalInfo,
      }
    })
  )
}

const getPublications = ($: CheerioAPI): PublicationInfo[] => {
  const publications = $('#publications')
    .parent()
    .extract({
      publications: [
        {
          selector: '.artdeco-list__item',
          value: {
            publicationUrl: {
              selector: 'a',
              value: 'href',
            },
            info: [
              {
                selector: '[aria-hidden=true]',
                value: 'innerText',
              },
            ],
          },
        },
      ],
    })

  return publications.publications.map((pub) => {
    const { publicationUrl = '', info = '' } = pub
    const [_1, title = '', journalAndDate = '', _2, description = ''] = info
    const [publication = '', publicationDate = ''] = journalAndDate
      .split('·')
      .map((s) => s.trim())

    return {
      publicationUrl,
      title,
      publication,
      publicationDate,
      description,
    }
  })
}

const downloadThumbnail = async (url: string, filePath: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Fetch failed for ${url}`)
  }

  const fileType = res.headers.get('content-type')?.split('/').pop() ?? ''

  const fileName = `${filePath}.${fileType}`

  if (!existsSync(fileName)) {
    const blob = await res.blob()
    await writeFile(fileName, blob.stream())
  }

  return fileName
}
