import { Section as TSection } from 'types'
import { Experience, Section } from 'components'
import { getLinkProps } from 'utils/navigation'
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
  let key = 0

  const transformLink = (item: string): JSX.Element => {
    let url

    try {
      url = new URL(item)
    } catch {
      return <span key={key++}>{item}</span>
    }

    return (
      <span key={key++}>
        <Link {...getLinkProps(item, 'inherit')}>
          {`${url.hostname}${url.pathname}`}
        </Link> |&nbsp;
      </span>
    )
  }

  return (
    <ResumeGrid item lg={9} md={10} xs={11} textAlign='left'>
      <Typ variant='h1' textAlign='center'>{header.heading}</Typ>
      <Typ variant='body1' mb={2} textAlign='center'>{header.content
        .map(i => transformLink(i))}
      </Typ>

      <Section {...education} underlineHeader startAtLevel={2} />

      <Typ variant='h2'>{experience.heading}</Typ>
      <hr />
      { experience.subsections?.map(exp => <Experience data={exp} key={key++} />) }

      <Grid display='flex' justifyContent='space-between' alignItems='flex-end'>
        <Typ variant='h2'>{projects.heading}</Typ>
        <Link color='inherit' href={projects.content[0]}>(See More)</Link>
      </Grid>
      <hr />
      <ul>
        { projects.subsections?.map(project => 
          <li key={key++}>
            <strong>{project.heading}</strong> <br />
            {project.content}
          </li>
        ) }
      </ul>

      <Typ variant='h2'>{skills.heading}</Typ>
      <hr />
      <Grid container>
        { skills.subsections?.map(category => 
          <Grid item md={6} xs={12} key={key++}>
            <Section {...category} startAtLevel={3} key={key++} />
          </Grid>
        )}
      </Grid>

      <Section {...activities} startAtLevel={2} underlineHeader />

    </ResumeGrid>
  )
}

export default ResumeContent