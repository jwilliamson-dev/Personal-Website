import React, { useState, useEffect } from 'react'
import { Project } from 'types'
import { openUrl } from 'utils/navigation'
import { 
  Button, 
  Card, 
  CardActions, 
  CardContent, 
  Grid, 
  Link, 
  styled, 
  Typography as Typ,
  useTheme, 
} from '@mui/material'

type Props = {}


const ProjectCard = styled(Card)`
height: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;
`

const Projects: React.FC<Props> = (props: Props) => {
  const [projectData, setProjectData] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const theme = useTheme().palette
  let i = 0
  
  useEffect(() => {
    const getProjectData = async () => {
      setIsLoading(true)
      
      try {
        const res = await fetch('/data/projects.json')
        const jsonData: Project[] = await res.json()
        setProjectData(jsonData)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
  
    getProjectData()
  }, [])

  return (
    <Grid item lg={9} md={10} xs={11} textAlign='left'>
      <Typ variant='h1'>Projects</Typ>
      <Typ>This section contains information about the projects I have worked on.
      Public repositories are linked. Snippets of code, including my .zshrc and my
      terminal prompt configuration can be found in&nbsp;
      <Link href='https://gist.github.com/jwilliamson-dev' 
        color='inherit'
        target='_blank' 
        rel='noopener noreferrer'>
            my gists
      </Link>.
      </Typ>
      <br />

      <Grid container 
        spacing={3} 
        rowSpacing={2} 
        justifyContent='center' 
        alignItems='stretch'
        mb={2}>
        { isLoading ? 
          <Typ variant='h2'>Loading...</Typ>
          : projectData.map(project => 
            <Grid item xs={11} md={6} lg={4} key={i++}>
              <ProjectCard key={i++} style={{backgroundColor: theme.primary.main}}>
                <CardContent>
                  <Typ variant='h3' textAlign='center'>{project.name}</Typ>
                  <Typ>{project.description}</Typ>
                </CardContent> 
                <CardActions>
                  <Button onClick={e => openUrl(e, project.url)} color='secondary'>View on GitHub</Button>
                </CardActions>
              </ProjectCard>
            </Grid>
          )
        }
      </Grid>

    </Grid>
  )
}

export default Projects