import { Box, styled, Typography as Typ } from '@mui/material'
import { useContext, useState } from 'react'

import type { Project } from '../../../models/src/Project'
import ContentContainer from '../components/ContentContainer'
import ProjectCard from '../components/ProjectCard'
import ProjectSearchBar from '../components/ProjectSearchBar'
import { SiteContext } from '../content/SiteContext'

const ProjectCardBox = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  gap: '10px',
  marginBottom: '10px',
})

export type SortOrder =
  | 'Relevance'
  | 'Last Updated'
  | 'Last Created'
  | 'A to Z'
  | 'Z to A'

interface SortFunctionParams {
  a: Project
  b: Project
  keywords?: string[]
}

const sortOptionMap = new Map<
  SortOrder,
  (params: SortFunctionParams) => number
>([
  [
    'Relevance',
    (params: SortFunctionParams) => {
      const aKeywords = new Set(params.a.keywords)
      const bKeywords = new Set(params.b.keywords)
      const keywordsSet = new Set(params.keywords)

      const score =
        bKeywords.intersection(keywordsSet).size -
        aKeywords.intersection(keywordsSet).size

      if (score === 0) {
        return (
          new Date(params.b.updated_at).getTime() -
          new Date(params.a.updated_at).getTime()
        )
      }

      return score
    },
  ],
  [
    'Last Updated',
    (params: SortFunctionParams) =>
      new Date(params.b.updated_at).getTime() -
      new Date(params.a.updated_at).getTime(),
  ],
  [
    'Last Created',
    (params: SortFunctionParams) =>
      new Date(params.b.created_at).getTime() -
      new Date(params.a.created_at).getTime(),
  ],
  [
    'A to Z',
    (params: SortFunctionParams) => params.a.name.localeCompare(params.b.name),
  ],
  [
    'Z to A',
    (params: SortFunctionParams) => params.b.name.localeCompare(params.a.name),
  ],
])

const getOptions = (
  projects: Project[],
  field: keyof Project,
  additionalOptions?: string[]
) => {
  const projectValues = projects
    .flatMap((p) => p[field])
    .filter((v) => typeof v === 'string')

  const allValues = additionalOptions
    ? [...additionalOptions, ...projectValues]
    : projectValues

  return [...new Set(allValues)].sort((a, b) => a.localeCompare(b))
}

const generateCards = (
  projects: Project[],
  keywordFilter: string[],
  setKeywordFilter: React.Dispatch<React.SetStateAction<string[]>>,
  typeFilter: string,
  sortOrder: SortOrder
) => {
  const sortFunction = sortOptionMap.get(sortOrder)
  if (!sortFunction) {
    throw new Error('Invalid sort function option')
  }

  const filteredProjects = projects
    .filter((v) => {
      if (keywordFilter.length > 0) {
        const keywordFilterSet = new Set(keywordFilter)
        const projectKeywordSet = new Set(v.keywords)
        if (keywordFilterSet.intersection(projectKeywordSet).size === 0)
          return false
      }

      if (typeFilter !== 'All') {
        return v.type === typeFilter
      }

      return true
    })
    .sort((a, b) => sortFunction({ a, b, keywords: keywordFilter }))

  return filteredProjects.map((v) => (
    <ProjectCard
      project={v}
      selectedKeywords={keywordFilter}
      setKeywords={setKeywordFilter}
      key={v.name}
    />
  ))
}

const Projects = () => {
  const {
    isLoading,
    projects: { projectList: projects, projectBlurb: blurb },
  } = useContext(SiteContext)
  const [keywordFilter, setKeywordFilter] = useState<string[]>([])
  const [sortOrder, setSortOrder] = useState<SortOrder>('Relevance')
  const [typeFilter, setTypeFilter] = useState('All')

  if (isLoading) {
    return <Typ variant="h2">Loading...</Typ>
  } else if (projects.length === 0) {
    return <Typ variant="h2">Failed to load data</Typ>
  }

  return (
    <ContentContainer>
      <Typ variant="h3">My Projects</Typ>
      <Typ variant="body1">{blurb}</Typ>
      <ProjectSearchBar
        keywordFilter={{
          options: getOptions(projects, 'keywords'),
          setter: setKeywordFilter,
          value: keywordFilter,
        }}
        typeFilter={{
          options: getOptions(projects, 'type', ['All']),
          setter: setTypeFilter,
          value: typeFilter,
        }}
        sortOrder={{
          options: [...sortOptionMap.keys()],
          setter: setSortOrder,
          value: sortOrder,
        }}
      />
      <ProjectCardBox>
        {generateCards(
          projects,
          keywordFilter,
          setKeywordFilter,
          typeFilter,
          sortOrder
        )}
      </ProjectCardBox>
    </ContentContainer>
  )
}

export default Projects
