import React, { useEffect, useState } from 'react'
import { Grid, Typography as Typ } from '@mui/material'
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import { styled } from '@mui/material'
import ActivityFeed from '../components/ActivityFeed'
import { GitHubActivity } from '../types'

type Props = {}

const AFGrid = styled(Grid)`
  max-height: 65vh;
  overflow: auto;
  margin-bottom: .5rem;
`

const Hello = styled(Typ)`
  font-size: 3.5rem;
  font-weight: 300;
`

const Home: React.FC = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [gitHubData, setGitHubData] = useState<Array<GitHubActivity>>([])
  
  useEffect(() => {
    const getGitHubData = async () => {
      setIsLoading(true)

      try {
        const res = await fetch('/data/githubactivity.json')
        const jsonData: Array<GitHubActivity> = await res.json()
        setGitHubData(jsonData)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    getGitHubData()
  }, [])
  
  return (
    <>
      <Grid item sm={11} md={10} height='fit-content'>
        <Hello>Hi, I'm Jacob!</Hello>
        <Typ variant='body2'>I enjoy using technology to make things happen</Typ>
      </Grid>
      <AFGrid item xs={10} md={5} lg={4}>
        <ActivityFeed title='My GitHub Feed' items={gitHubData} />
      </AFGrid>
      <AFGrid item xs={10} md={5} lg={4}>
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="jwilliamson_dev"
        ></TwitterTimelineEmbed>
      </AFGrid>
    </>
  )
}

export default Home