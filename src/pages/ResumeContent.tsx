import React from 'react'
import { Section as TSection } from 'types'
import { 
  Education, 
  Experience, 
  Project,
  Skill 
} from 'components'
import { 
  Grid, 
  Link, 
  styled, 
  Typography as Typ 
} from '@mui/material'

type Props = {
    header: TSection,
    education: TSection,
    experience: TSection,
    projects: TSection,
    skills: TSection,
    activities: TSection
}

const ResumeGrid = styled(Grid)`
  ul {
    margin-top: 0;
  }
  h1, h2, h3 {
    margin-bottom: 0;
  }
  hr {
    margin-top: .25rem;
  }
`

const ResumeContent: React.FC<Props> = ({
  header,
  education,
  experience,
  projects,
  skills,
  activities
}) => {
  let i = 0

  const transformLink = (item: string): JSX.Element => {
    let url

    try {
      url = new URL(item)
    } catch {
      return <span key={i++}>{item}</span>
    }

    return (
      <span key={i++}>
        <Link color='inherit' 
          href={item} 
          target='_blank' 
          rel='noopener noreferrer'>
          {`${url.hostname}${url.pathname}`}
        </Link> |&nbsp;
      </span>
    )
  }

  return (
    <>
      <ResumeGrid item lg={9} md={10} xs={11} textAlign='left'>
        <Typ variant='h1' textAlign='center'>{header.heading}</Typ>
        <Typ variant='body1' mb={2} textAlign='center'>{header.content
          .map(i => transformLink(i))}
        </Typ>

        <Typ variant='h2'>{education.heading}</Typ>
        <hr />
        <ul>
          { education.subsections?.map(edu => <Education data={edu} key={i++}/>) }
        </ul>

        <Typ variant='h2'>{experience.heading}</Typ>
        <hr />
        { experience.subsections?.map(exp => <Experience data={exp} key={i++} />) }

        <Grid display='flex' justifyContent='space-between' alignItems='flex-end'>
          <Typ variant='h2'>{projects.heading}</Typ>
          <Link color='inherit' href={projects.content[0]}>(See More)</Link>
        </Grid>
        <hr />
        <ul>
          { projects.subsections?.map(project => <Project data={project} key={i++} />) }
        </ul>

        <Typ variant='h2'>{skills.heading}</Typ>
        <hr />
        <Grid container>
          { skills.subsections?.map(category => <Skill data={category} key={i++} />) }
        </Grid>

        <Typ variant='h2'>{activities.heading}</Typ>
        <hr />
        <ul>
          { activities.content.map(activity => <li key={i++}>{activity}</li>) }
        </ul>

      </ResumeGrid>
    </>
  )
}

export default ResumeContent