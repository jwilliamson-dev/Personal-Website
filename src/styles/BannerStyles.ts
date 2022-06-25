import { Grid, styled } from '@mui/material'
import Theme from './theme'

const Outer = styled(Grid)`
  min-height: 3rem;
  width: 100%;
  background-color: ${Theme.palette.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Inner = styled(Grid)`
  display: flex;  
  align-items: center;
  justify-content: center;
`

export { Outer, Inner }