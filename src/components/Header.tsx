import React from 'react'
import * as Banner from 'styles/BannerStyles'
import { 
  Button, 
  Grid, 
  Link, 
  useMediaQuery, 
  useTheme 
} from '@mui/material'


type Props = {}

const Header: React.FC = (props: Props) => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Banner.Outer container pt={1} pb={1} sx={{ boxShadow: 3 }}>
      <Banner.Inner container item sm={11} md={10}>
        <Grid item sm={6}>
          <Link
            variant='h4' 
            fontWeight='normal' 
            color='inherit' 
            underline='none' 
            href='/'>
            Jacob Williamson
          </Link>
        </Grid>
        <Grid 
          item 
          sm={6} 
          display='flex' 
          justifyContent={ isSmall ? 'center' : 'flex-end' }>
          <Button variant='text' color='secondary' href='/About'>About</Button>
          <Button variant='text' color='secondary' href='/Resume'>Resume</Button>
          <Button variant='text' color='secondary' href='/Projects'>Projects</Button>
          <Button disabled variant='text' href='/Blog'>Blog</Button>
        </Grid>
      </Banner.Inner>
    </Banner.Outer>
  )
}

export default Header
