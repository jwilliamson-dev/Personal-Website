import React from 'react'
import { Box, Typography as Typ, Link} from '@mui/material'
import { FeedItem, IFeedItem } from './FeedItem'
import { GitHubActivity } from '../types'
import '../styles/ActivityFeed.css'
import '../styles/utility.css'


interface IActivityFeed {
  title: string,
  items: Array<GitHubActivity>
}

const ActivityFeed: React.FC<IActivityFeed> = ({
  title,
  items
}) => {
  let key = 0

  const generateIFeedItem = (item: GitHubActivity): IFeedItem => {

    const desc = 
    <>
      <Typ variant='h6'>Added {item.payload.size} commits</Typ>
      <ul>
        {item.payload.commits.map(x => 
          <li key={(key++).toString()}>
            <Link color='inherit' href={`https://github.com/${item.repo.name}/commit/${x.sha}`} target='_blank' rel='noopener noreferrer'>{x.sha.slice(0,8)}</Link> - {x.message}
          </li>)}
      </ul>
    </>
    
    return {
      title: `${item.type} in ${item.repo.name}`,
      url: `https://github.com/${item.repo.name}`,
      date: item.created_at,
      description: desc
    }
  }

  return (
    <Box className='ActivityFeed'>
      <Typ variant='h2' className='bg-white'>{title}</Typ>
      { items.map(x => <FeedItem {...generateIFeedItem(x)} key={(key++).toString()} />) }
    </Box>
  )
}

export default ActivityFeed