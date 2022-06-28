import { Typography as Typ, Link, Box } from '@mui/material'

const NoPage: React.FC = () => {
  return (
    <Box mt={3}>
      <Typ variant='h1'>Uh oh!</Typ>
      <Typ variant='body1'>You ended up somewhere you're not supposed to be.</Typ>
      <Link href='/'>Click to go home</Link>
    </Box>
  )
}

export default NoPage