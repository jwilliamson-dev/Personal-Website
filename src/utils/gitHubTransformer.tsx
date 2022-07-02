import { IFeedItem } from 'components/FeedItem'
import { GitHubActivity } from 'types'
import { openUrl } from 'utils/navigation'
import { Link, Typography as Typ } from '@mui/material'

const gitHubTransformer = (item: GitHubActivity): IFeedItem => {
  let key = 0

  const description = 
  <>
    <Typ variant='h6'>Added {item.payload.size} commits</Typ>
    <ul>
      { item.payload.commits.map(x => 
        <li key={key++}>
          <Typ variant='body1'>
            <Link color='inherit'
              onClick={e => openUrl(e, `https://github.com/${item.repo.name}/commit/${x.sha}`)}>
              {x.sha.slice(0,8)}
            </Link> - {x.message}
          </Typ>
        </li>
      )}
    </ul>
  </>

  return {
    title: `${item.type} in ${item.repo.name}`,
    url: `https://github.com/${item.repo.name}`,
    date: item.created_at,
    children: description
  }
}

export default gitHubTransformer