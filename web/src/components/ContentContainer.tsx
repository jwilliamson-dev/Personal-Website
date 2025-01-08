import { Box, styled } from '@mui/material'

import { transitionMixin } from '../styles/Mixins'
import { useFadeTransition } from '../styles/useFadeTransition'

interface Props {
  children: React.ReactNode
}

const ContentBox = styled(Box)({
  flexGrow: 1,
  ...transitionMixin,
})

const ContentContainer = (props: Props) => {
  const { ref } = useFadeTransition()
  return <ContentBox ref={ref}>{props.children}</ContentBox>
}

export default ContentContainer
