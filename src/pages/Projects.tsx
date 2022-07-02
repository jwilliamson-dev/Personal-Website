import { Project } from 'types'
import { getLinkProps } from 'utils/navigation'
import useLocalData from 'hooks/useLocalData'
import SimpleCard from 'components/SimpleCard'
import {
  Grid, 
  Link,
  Typography as Typ
} from '@mui/material'

const Projects: React.FC = () => {
  const {
    data: projectData,
    isLoading
  } = useLocalData<Project[]>('projects.json')
  let key = 0

  return (
    <Grid item lg={9} md={10} xs={11} textAlign='left'>
      <Typ variant='h1'>Projects</Typ>
      <Typ>This section contains information about the projects I have worked on.
      Public repositories are linked. Snippets of code, including my .zshrc and my
      terminal prompt configuration can be found in&nbsp;
      <Link {...getLinkProps('https://gist.github.com/jwilliamson-dev', 'inherit')}>
            my gists
      </Link>.
      </Typ>
      <br />

      <Grid 
        container 
        spacing={3} 
        rowSpacing={2} 
        justifyContent='center' 
        alignItems='stretch'
        mb={2}>
        { isLoading ? 
          <Typ variant='h2'>Loading...</Typ>
          : projectData && projectData.map(project => 
            <SimpleCard
              key={key++}
              title={project.name}
              description={project.description}
              actionMessage='View on GitHub'
              url={project.url} />
          )
        }
      </Grid>

    </Grid>
  )
}

export default Projects