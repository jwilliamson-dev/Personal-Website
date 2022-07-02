import { Grid, Typography as Typ } from '@mui/material'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import { GitHubActivity } from 'types'
import ActivityFeed from 'components/ActivityFeed'
import useLocalData from 'hooks/useLocalData'

const Home: React.FC = () => {
  const {
    data: gitHubData,
    isLoading
  } = useLocalData<GitHubActivity[]>('githubactivity.json')

  const activityFeedProps = {
    item: true,
    xs: 10,
    md: 5,
    lg: 4,
    maxHeight: '65vh',
    overflow: 'auto',
    mb: 1
  }
  
  return (
    <>
      <Grid 
        item 
        sm={11} 
        md={10} 
        height='fit-content' 
        textAlign='center'>
        <Typ fontWeight={300} fontSize='3.5rem'>Hi, I'm Jacob!</Typ>
        <Typ variant='body2'>Using technology to automate and integrate</Typ>
      </Grid>

      <Grid {...activityFeedProps}>
        { isLoading ? (
          <Typ variant='h1'>Loading Data...</Typ>
        ) : (
          gitHubData &&
            <ActivityFeed title='My GitHub Feed' items={gitHubData} />
        ) }
      </Grid>

      <Grid {...activityFeedProps}>
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="jwilliamson_dev"
        ></TwitterTimelineEmbed>
      </Grid>
    </>
  )
}

export default Home