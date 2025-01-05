import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Button, styled } from '@mui/material'
import { useState } from 'react'

interface Props {
  children: React.ReactNode[]
  maxToShow: number
}

const ExpandCollapseButton = styled(Button)({
  '@media print': { display: 'none' },
})

const ShowMoreGroup = (props: Props) => {
  const [expanded, setExpanded] = useState(false)

  const handleClick = () => {
    setExpanded(!expanded)
  }

  if (props.children.length <= props.maxToShow) {
    return props.children
  }

  return (
    <>
      {expanded ? props.children : props.children.slice(0, props.maxToShow - 1)}
      <ExpandCollapseButton
        endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        onClick={handleClick}
        color="inherit"
      >
        {expanded ? 'Show Less' : 'Show More'}
      </ExpandCollapseButton>
    </>
  )
}

export default ShowMoreGroup
