import React from 'react'
import { Box, Typography as Typ, Link, styled } from '@mui/material'
import FeedItem,  { IFeedItem } from './FeedItem'
import { GitHubActivity } from 'types'
import { openUrl } from 'utils/navigation'


interface IActivityFeed {
  title: string,
  items: Array<GitHubActivity>
}

const AFBox = styled(Box)`
  text-align: left;
  background-color: #FFFFFF;
  min-height: 100%;

  h2 {
    padding-left: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
`

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
            <Typ variant='body1'>
              <Link color='inherit'
                onClick={e => openUrl(e, `https://github.com/${item.repo.name}/commit/${x.sha}`)}>
                {x.sha.slice(0,8)}
              </Link> - {x.message}
            </Typ>
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
    <AFBox>
      <Typ variant='h2'>{title}</Typ>
      { items.length > 0 ?
        items.map(x => <FeedItem {...generateIFeedItem(x)} key={(key++).toString()} />) 
        : <Typ variant='body1' p={2}>There is no activity to display at this time.</Typ>}
    </AFBox>
  )
}

export default ActivityFeed