import { useContext } from 'react'
import ReactMarkdown from 'react-markdown'

import ContentContainer from '../components/ContentContainer'
import { SiteContext } from '../content/SiteContext'

const Home = () => {
  const { homepageMarkdown } = useContext(SiteContext)
  return (
    <ContentContainer>
      <ReactMarkdown>{homepageMarkdown}</ReactMarkdown>
    </ContentContainer>
  )
}

export default Home
