import { ReactNode } from 'react'
import moment from 'moment'
import { openUrl } from 'utils/navigation'
import { 
  Card, 
  CardActionArea,
  styled,
  Typography as Typ 
} from '@mui/material'

interface IFeedItem {
  title: string,
  date: Date,
  url: string,
  children?: ReactNode
}

const AFCardActionArea  = styled(CardActionArea)`
    padding-top: 0.5rem !important;
    padding-left: 1rem !important;
    padding-right: 1rem !important;
`

const AFTyp = styled(Typ)`
  padding-bottom: 0.5rem;
`

const FeedItem: React.FC<IFeedItem> = ({
  title,
  date,
  url,
  children
}) => {
  const formatDate = (d: Date): string => moment(d).format('MMM Do, YYYY [at] h:mm a')

  return (
    <Card sx={{borderRadius: 0}}>
      <AFCardActionArea onClick={e => openUrl(e, url)}>
        <AFTyp variant='h5'>{title}</AFTyp>
        {children}
        <AFTyp variant='body1'>{formatDate(date)}</AFTyp>
      </AFCardActionArea>
    </Card>
  )
}

export default FeedItem 
export type { IFeedItem }

