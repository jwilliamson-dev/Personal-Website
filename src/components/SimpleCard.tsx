import { openUrl } from 'utils/navigation'
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography as Typ,
  styled,
  useTheme
} from '@mui/material'

interface ISimpleCard {
  title: string,
  description: string,
  actionMessage?: string
  url?: URL
}

const SimpleCard: React.FC<ISimpleCard> = ({
  title,
  description,
  actionMessage,
  url
}) => {
  const theme = useTheme().palette

  const ProjectCard = styled(Card)`
height: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;
background-color: ${theme.primary.main};
`

  return (
    <Grid 
      item 
      xs={11} 
      md={6} 
      lg={4}>
      <ProjectCard>
        <CardContent>
          <Typ variant='h3' textAlign='center'>{title}</Typ>
          <Typ>{description}</Typ>
        </CardContent>

        { actionMessage && url &&
        <CardActions>
          <Button onClick={e => openUrl(e, url)} color='secondary'>{actionMessage}</Button>
        </CardActions>
        } 

      </ProjectCard>
    </Grid>
  )
}

export default SimpleCard