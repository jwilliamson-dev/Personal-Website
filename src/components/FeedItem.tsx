import React, { ReactElement } from 'react'
import { Card, CardActionArea, Link, Typography as Typ } from '@mui/material'
import moment from 'moment'
import '../styles/utility.css'
import '../styles/ActivityFeed.css'

interface IFeedItem {
  title: string,
  description: ReactElement,
  date: Date,
  url: string
}

const FeedItem: React.FC<IFeedItem> = ({
  title,
  description,
  date,
  url
}) => {
  const formatDate = (d: Date): string => moment(d).format('MMM Do, YYYY [at] h:mm a')

  return (
    <Card sx={{borderRadius: 0}}>
      <CardActionArea href={url} target='_blank' rel='noopener noreferrer' className='FeedItem'>
        <Typ variant='h5' className='p-b-1'>{title}</Typ>
        {description}
        <Typ variant='body1'>{formatDate(date)}</Typ>
      </CardActionArea>
    </Card>
  )
}

export { FeedItem }
export type { IFeedItem }

