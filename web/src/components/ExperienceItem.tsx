import LaunchIcon from '@mui/icons-material/Launch'
import {
  Grid2 as Grid,
  IconButton,
  Link,
  styled,
  Typography as Typ,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import type { ExperienceInfo } from '$models/Resume'

const ItemContainer = styled(Grid)({
  flexGrow: 1,
  padding: '5px 0 5px 0',
  width: '100%',
  gap: '0px 10px',
  '& ul': {
    padding: '0 0 0 30px',
    margin: '0',
  },
})

const LaunchButton = styled(IconButton)(({ theme }) => ({
  paddingLeft: '5px',
  color: theme.palette.text.primary,
  '@media print': { display: 'none' },
}))

const Thumbnail = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'start',
  [theme.breakpoints.down('sm')]: {
    alignItems: 'center',
  },
  '@media print': { display: 'none' },
}))

const generateDutyList = (duties: string[]) => {
  return (
    <ul>
      {duties.map((v, i) => (
        <li key={i}>
          <Typ variant="body1">{v}</Typ>
        </li>
      ))}
    </ul>
  )
}

const ExperienceItem = (props: ExperienceInfo) => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

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
        {!isSmall && generateDutyList(props.dutyList)}
      </Grid>
      {isSmall && (
        <Grid size={{ xs: 12 }}>{generateDutyList(props.dutyList)}</Grid>
      )}
    </ItemContainer>
  )
}

export default ExperienceItem
