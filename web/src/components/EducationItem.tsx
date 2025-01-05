import LaunchIcon from '@mui/icons-material/Launch'
import {
  Grid2 as Grid,
  IconButton,
  Link,
  styled,
  Typography as Typ,
} from '@mui/material'

import type { EducationInfo } from '$models/Resume'

const ItemContainer = styled(Grid)({
  width: '100%',
  padding: '5px 0 5px 0',
})

const LaunchButton = styled(IconButton)(({ theme }) => ({
  paddingLeft: '5px',
  color: theme.palette.text.primary,
  '@media print': { display: 'none' },
}))

const Thumbnail = styled(Grid)({
  '@media print': { display: 'none' },
})

const EducationItem = (props: EducationInfo) => {
  return (
    <ItemContainer container spacing={2}>
      <Thumbnail size="auto">
        <img
          src={props.thumbnailUrl}
          alt={`${props.name} profile avatar`}
          width="60px"
        />
      </Thumbnail>
      <Grid size="grow">
        <Typ variant="h6">
          <strong>{props.degree}</strong>
          <Link href={props.profileUrl} target="_blank" rel="noreferrer">
            <LaunchButton disableRipple size="small">
              <LaunchIcon fontSize="small" />
            </LaunchButton>
          </Link>
        </Typ>
        <Typ variant="body1">{props.name}</Typ>
        <Typ variant="body2">{props.dates}</Typ>
        {props.additionalInfo?.map((v, i) => (
          <Typ variant="body2" key={i}>
            {v}
          </Typ>
        ))}
      </Grid>
    </ItemContainer>
  )
}

export default EducationItem
