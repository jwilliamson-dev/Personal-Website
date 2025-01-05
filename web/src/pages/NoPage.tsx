import { Link, Typography as Typ } from '@mui/material'

import ContentContainer from '../components/ContentContainer'

const NoPage = () => {
  return (
    <ContentContainer>
      <Typ variant="h1">Uh oh!</Typ>
      <Typ variant="body1">
        You ended up somewhere you&apos;re not supposed to be.
      </Typ>
      <Link href="/">Click to go home</Link>
    </ContentContainer>
  )
}

export default NoPage
