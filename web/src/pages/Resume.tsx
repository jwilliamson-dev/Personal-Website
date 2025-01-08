import { Box, Divider, Link, styled, Typography as Typ } from '@mui/material'
import { useContext } from 'react'

import type { OwnerInfo } from '$models/OwnerInfo'

import ContentContainer from '../components/ContentContainer'
import EducationItem from '../components/EducationItem'
import ExperienceItem from '../components/ExperienceItem'
import ProjectItem from '../components/ProjectItem'
import PublicationItem from '../components/PublicationItem'
import ShowMoreGroup from '../components/ShowMoreGroup'
import { SiteContext } from '../content/SiteContext'

const SectionDivider = styled(Divider)(({ theme }) => ({
  backgroundColor: theme.palette.divider,
}))

const SectionItem = styled(Box)({
  padding: '5px 0 5px 0',
})

const SectionContent = styled(Box)({
  maxWidth: '90%',
  display: 'flex',
  flexWrap: 'wrap',
  justifySelf: 'center',
})

const PrintLink = styled(Link)({
  '@media print': { textDecoration: 'none' },
})

const generateContactBar = (data: OwnerInfo) => {
  const emailHref = `mailto:${data.email}`
  const emailElement = (
    <PrintLink href={emailHref} color="inherit">
      {data.email}
    </PrintLink>
  )
  const urlElements = Object.entries(data.links).map(([k, v]) => {
    const url = new URL(v)
    return (
      <PrintLink
        href={url.href}
        color="inherit"
        target="_blank"
        rel="noreferrer"
        key={k}
      >
        {url.host}
        {url.pathname}
      </PrintLink>
    )
  })
  const locationElement = (
    <Typ display="inline-block" variant="body1">
      {data.city} {data.stateProvince}
    </Typ>
  )

  const result = [emailElement, ...urlElements, locationElement]
    .flatMap((elem) => [
      <elem.type {...elem.props} key={crypto.randomUUID()} />,
      getSeparator(crypto.randomUUID()),
    ])
    .slice(0, -1)

  return result
}

const getSeparator = (key: string) => (
  <Typ display="inline-block" variant="body1" key={key}>
    &nbsp;|&nbsp;
  </Typ>
)

const Resume = () => {
  const { isLoading, ownerInfo, resume } = useContext(SiteContext)
  if (isLoading) {
    return <Typ variant="h2">Loading...</Typ>
  }

  return (
    <ContentContainer>
      {/* Heading and contact info */}
      <SectionItem textAlign="center">
        <Typ variant="h3">
          {ownerInfo.firstName} {ownerInfo.lastName}
        </Typ>
        {generateContactBar(ownerInfo)}
      </SectionItem>
      {/* Experience */}
      <SectionItem>
        <Typ variant="h4">Experience</Typ>
        <SectionDivider />
        <SectionContent>
          <ShowMoreGroup maxToShow={4}>
            {resume.experience.map((v, i) => (
              <ExperienceItem {...v} key={i} />
            ))}
          </ShowMoreGroup>
        </SectionContent>
      </SectionItem>
      {/* Projects */}
      <SectionItem>
        <Typ variant="h4">Projects</Typ>
        <SectionDivider />
        <SectionContent>
          <ShowMoreGroup maxToShow={3}>
            {resume.projects.map((v, i) => (
              <ProjectItem {...v} key={i} />
            ))}
          </ShowMoreGroup>
        </SectionContent>
      </SectionItem>
      {/* Publications */}
      <SectionItem>
        <Typ variant="h4">Publications</Typ>
        <SectionDivider />
        <SectionContent>
          <ShowMoreGroup maxToShow={3}>
            {resume.publications.map((v, i) => (
              <PublicationItem {...v} key={i} />
            ))}
          </ShowMoreGroup>
        </SectionContent>
      </SectionItem>
      {/* Education */}
      <SectionItem>
        <Typ variant="h4">Education</Typ>
        <SectionDivider />
        <SectionContent>
          <ShowMoreGroup maxToShow={3}>
            {resume.education.map((v, i) => (
              <EducationItem {...v} key={i.toString()} />
            ))}
          </ShowMoreGroup>
        </SectionContent>
      </SectionItem>
    </ContentContainer>
  )
}

export default Resume
