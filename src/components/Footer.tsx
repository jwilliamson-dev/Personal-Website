import React from 'react'
import { Typography as Typ, Box, Link } from '@mui/material'
import { OBanner, IBanner } from '../styles/BannerStyles'
import { SGitHubIcon, SLinkedInIcon, STwitterIcon } from '../styles/IconStyles'

type Props = {}

const Footer: React.FC = (props: Props) => {
  return (
    <OBanner container >
      <IBanner item sm={11} md={10}>
        <Typ variant='body1'>
          &copy; Copyright {(new Date()).getFullYear()} - Jacob Williamson, Powered by&nbsp;
          <Link color='inherit' href='https://reactjs.org/' target='_blank' rel='noopener noreferrer'>React</Link> 
          &nbsp;and&nbsp;
          <Link color='inherit' href='https://mui.com/' target='_blank' rel='noopener noreferrer'>MUI</Link>
          , Website v1.0
        </Typ>
        <Box display='flex'>
          <Link href='https://github.com/jwilliamson-dev' target='_blank' rel='noopener noreferrer'>
            <SGitHubIcon />
          </Link>
          <Link href='https://www.linkedin.com/in/jjw324' target='_blank' rel='noopener noreferrer'>
            <SLinkedInIcon />
          </Link>
          <Link href='https://twitter.com/jwilliamson_dev' target='_blank' rel='noopener noreferrer'>
            <STwitterIcon />
          </Link>
        </Box>
      </IBanner>
    </OBanner>
  )
}

export default Footer