import { Typography, Link, Box } from '@mui/material'
import React from 'react'

type Props = {}

const NoPage = (props: Props) => {
  return (
    <Box mt={3}>
      <Typography variant='h1'>Uh oh!</Typography>
      <Typography variant='body1'>You ended up somewhere you're not supposed to be.</Typography>
      <Link href='/'>Click to go home</Link>
    </Box>
  )
}

export default NoPage