import LaunchIcon from '@mui/icons-material/Launch'
import {
  Box,
  Chip,
  Grid2 as Grid,
  IconButton,
  Link,
  styled,
  Typography as Typ,
} from '@mui/material'

import type { ProjectInfo } from '$models/Resume'

const ItemContainer = styled(Grid)({
  flexGrow: 1,
  padding: '5px 0 5px 0',
})

const LaunchButton = styled(IconButton)(({ theme }) => ({
  paddingLeft: '5px',
  color: theme.palette.text.primary,
  '@media print': { display: 'none' },
}))

const ChipBox = styled(Box)({
  display: 'flex',
  flexGrow: 1,
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  gap: '10px',
})

const ProjectItem = (props: ProjectInfo) => {
  return (
    <ItemContainer>
      <Typ variant="h6">
        <strong>{props.name}</strong>
        <Link href={props.url} target="_blank" rel="noreferrer">
          <LaunchButton disableRipple size="small">
            <LaunchIcon fontSize="small" />
          </LaunchButton>
        </Link>
      </Typ>
      <ChipBox>
        {props.keywords.map((v, i) => (
          <Chip label={v} key={i} />
        ))}
      </ChipBox>
      <Typ variant="body2">{props.description}</Typ>
    </ItemContainer>
  )
}

export default ProjectItem
