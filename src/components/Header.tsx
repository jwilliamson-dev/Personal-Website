import React from 'react'
import { Button, Box, Grid, Link } from '@mui/material'

type Props = {};

const Header: React.FC = (props: Props) => {
  return (
    <Grid container className='banner-outer' sx={{ bgcolor: 'primary.main', boxShadow: 3 }}>
      <Grid item sm={11} md={10} className='banner-inner'>
        <Link variant='h4'color='inherit' underline='none' href='/'>Jacob Williamson</Link>
        <Box>
          <Button variant='text' color='secondary' href='/About'>About</Button>
          <Button variant='text' color='secondary' href='/Resume'>Resume</Button>
          <Button variant='text' color='secondary' href='/Projects'>Projects</Button>
          <Button disabled variant='text' href='/Blog'>Blog</Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Header
