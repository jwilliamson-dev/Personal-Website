import { Box, Grid, GridProps, Typography as Typ, styled } from '@mui/material'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import { GithubEvent } from 'types/GitHubEvents'
import FeedItem from 'components/FeedItem'
import useLocalData from 'hooks/useLocalData'
import gitHubTransformer from 'utils/gitHubTransformer'

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

const Home: React.FC = () => {
  const {
    data: gitHubData,
    isLoading
  } = useLocalData<GithubEvent[]>('githubactivity.json')

  const activityFeedProps: GridProps = {
    item: true,
    xs: 10,
    md: 5,
    lg: 4,
    maxHeight: '65vh',
    overflow: 'auto',
    mb: 1
  }

  console.warn(gitHubData)

  let key = 0
  
  return (
    <>
      <Grid 
        item 
        sm={11} 
        md={10} 
        height='fit-content' 
        textAlign='center'>
        <Typ fontWeight={300} fontSize='3.5rem'>Hi, I&apos;m Jacob!</Typ>
        <Typ variant='body2'>Using technology to automate and integrate</Typ>
      </Grid>

      <Grid {...activityFeedProps}>
        { isLoading ? (
          <Typ variant='h1'>Loading Data...</Typ>
        ) : (
          gitHubData &&
          <AFBox>
            <Typ variant='h2'>My GitHub Feed</Typ>
            { gitHubData.length > 0 ?
              gitHubData.map(item => <FeedItem {...gitHubTransformer(item)} key={key++} />) 
              : <Typ variant='body1' p={2}>There is no activity to display at this time.</Typ>}
          </AFBox>
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