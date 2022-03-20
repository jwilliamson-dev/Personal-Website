import React from 'react'
import { Button, Box, Grid, Link } from '@mui/material'

type Props = {};

const Header: React.FC = (props: Props) => {
  return (
    <Grid container
      sx={{
        bgcolor: 'primary.main',
        justifyContent: 'center',
        height: '3.5rem',
        boxShadow: 3
      }}>
      <Grid item sm={11} md={10}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <Link variant="h4"color="inherit" underline="none" href="/">Jacob Williamson</Link>
        <Box>
          <Button variant="text" color="secondary" href="/About">About</Button>
          <Button variant="text" color="secondary" href="/Resume">Resume</Button>
          <Button variant="text" color="secondary" href="/Projects">Projects</Button>
          <Button disabled variant="text" href="/Blog">Blog</Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Header
