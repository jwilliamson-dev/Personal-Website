import React from 'react'
import { Grid, Typography, Box, Link } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import '../styles/utility.css'

type Props = {}

const Footer: React.FC = (props: Props) => {
  return (
    <Grid container className='banner-outer bottom' sx={{ bgcolor: 'primary.main' }}>
      <Grid item sm={11} md={10} className='banner-inner'>
        <Typography variant='body1'>
          &copy; Copyright {(new Date()).getFullYear()} - Jacob Williamson, Powered by&nbsp;
          <Link color='inherit' href='https://reactjs.org/' target='_blank' rel='noopener noreferrer'>React</Link> 
          &nbsp;and&nbsp;
          <Link color='inherit' href='https://mui.com/' target='_blank' rel='noopener noreferrer'>MUI</Link>
          , Website v1.0
        </Typography>
        <Box className='d-flex'>
          <Link href='https://github.com/jwilliamson-dev' target='_blank' rel='noopener noreferrer'>
            <GitHubIcon className='icon' />
          </Link>
          <Link href='https://www.linkedin.com/in/jjw324' target='_blank' rel='noopener noreferrer'>
            <LinkedInIcon className='icon' />
          </Link>
          <Link href='https://twitter.com/jwilliamson_dev' target='_blank' rel='noopener noreferrer'>
            <TwitterIcon className='icon' />
          </Link>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Footer