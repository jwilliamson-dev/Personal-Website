import { Grid, styled } from '@mui/material'
import Theme from './theme'

const OBanner = styled(Grid)`
    justify-content: center;
    min-height: 3rem;
    width: 100%;
    background-color: ${Theme.palette.primary.main};
`

const IBanner = styled(Grid)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export { OBanner, IBanner }