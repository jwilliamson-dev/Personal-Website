import LaunchIcon from '@mui/icons-material/Launch'
import {
  Grid2 as Grid,
  IconButton,
  Link,
  styled,
  Typography as Typ,
} from '@mui/material'

import type { ExperienceInfo } from '$models/Resume'

const ItemContainer = styled(Grid)({
  flexGrow: 1,
  padding: '5px 0 5px 0',
  width: '100%',
})

const LaunchButton = styled(IconButton)(({ theme }) => ({
  paddingLeft: '5px',
  color: theme.palette.text.primary,
  '@media print': { display: 'none' },
}))

const Thumbnail = styled(Grid)({
  '@media print': { display: 'none' },
})

const ExperienceItem = (props: ExperienceInfo) => {
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
        <Typ variant="body2">
          {props.startMonth}&mdash;{props.endMonth} · {props.employmentType} ·{' '}
          {props.locationType}
        </Typ>
        <Typ variant="h6">
          <strong>{props.title}, </strong> {props.name}
          <Link href={props.profileUrl} target="_blank" rel="noreferrer">
            <LaunchButton disableRipple size="small">
              <LaunchIcon fontSize="small" />
            </LaunchButton>
          </Link>
        </Typ>
        <ul style={{ margin: 0 }}>
          {props.dutyList.map((v, i) => (
            <li key={i}>
              <Typ variant="body1">{v}</Typ>
            </li>
          ))}
        </ul>
      </Grid>
    </ItemContainer>
  )
}

export default ExperienceItem
