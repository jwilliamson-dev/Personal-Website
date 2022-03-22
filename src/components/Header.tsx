import React from 'react'
import { Button, Box, Link } from '@mui/material'
import { OBanner, IBanner } from '../styles/BannerStyles'


type Props = {};

const Header: React.FC = (props: Props) => {
  return (
    <OBanner container sx={{ boxShadow: 3 }}>
      <IBanner item sm={11} md={10}>
        <Link variant='h4'color='inherit' underline='none' href='/'>Jacob Williamson</Link>
        <Box>
          <Button variant='text' color='secondary' href='/About'>About</Button>
          <Button variant='text' color='secondary' href='/Resume'>Resume</Button>
          <Button variant='text' color='secondary' href='/Projects'>Projects</Button>
          <Button disabled variant='text' href='/Blog'>Blog</Button>
        </Box>
      </IBanner>
    </OBanner>
  )
}

export default Header
