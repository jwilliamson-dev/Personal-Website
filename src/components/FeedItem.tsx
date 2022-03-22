import React, { ReactElement } from 'react'
import moment from 'moment'
import { 
  Card, 
  CardActionArea, 
  Link,
  styled,
  Typography as Typ 
} from '@mui/material'

interface IFeedItem {
  title: string,
  description: ReactElement,
  date: Date,
  url: string
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
  description,
  date,
  url
}) => {
  const formatDate = (d: Date): string => moment(d).format('MMM Do, YYYY [at] h:mm a')

  return (
    <Card sx={{borderRadius: 0}}>
      <AFCardActionArea>
        <Link color='inherit' variant='inherit' underline='none' href={url} target='_blank' rel='noopener noreferrer'>
          <AFTyp variant='h5'>{title}</AFTyp>
          {description}
          <AFTyp variant='body1'>{formatDate(date)}</AFTyp>
        </Link>
      </AFCardActionArea>
    </Card>
  )
}

export { FeedItem }
export type { IFeedItem }

