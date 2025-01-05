import LaunchIcon from '@mui/icons-material/Launch'
import {
  Grid2 as Grid,
  IconButton,
  Link,
  styled,
  Typography as Typ,
} from '@mui/material'

import type { PublicationInfo } from '$models/Resume'

const ItemContainer = styled(Grid)({
  flexGrow: 1,
  padding: '5px 0 5px 0',
})

const LaunchButton = styled(IconButton)(({ theme }) => ({
  paddingLeft: '5px',
  color: theme.palette.text.primary,
  '@media print': { display: 'none' },
}))

const PublicationItem = (props: PublicationInfo) => {
  return (
    <ItemContainer>
      <Typ variant="h6">
        <strong>{props.title}</strong>
        <Link href={props.publicationUrl} target="_blank" rel="noreferrer">
          <LaunchButton disableRipple size="small">
            <LaunchIcon fontSize="small" />
          </LaunchButton>
        </Link>
      </Typ>
      <Typ variant="h6" display="inline">
        {props.publication}
        {' - '}
      </Typ>
      <Typ variant="body2" display="inline">
        {props.publicationDate}
      </Typ>
      <Typ variant="body2">{props.description}</Typ>
    </ItemContainer>
  )
}

export default PublicationItem
