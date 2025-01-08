import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import {
  Box,
  Grid2 as Grid,
  IconButton,
  Link,
  styled,
  Typography as Typ,
} from '@mui/material'
import { useContext } from 'react'

import { SiteContext } from '../content/SiteContext'

const FooterBox = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.dark,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',

  '@media print': { display: 'none' },
}))

const OuterGrid = styled(Grid)(({ theme }) => ({
  spacing: 0,
  justifyContent: 'space-between',
  maxWidth: theme.breakpoints.values.lg,
  flexGrow: 1,
}))

const GridItem = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  alignItems: 'center',
  textAlign: 'left',
  [theme.breakpoints.down('md')]: {
    textAlign: 'center',
  },
}))

const GitHub = styled(GitHubIcon)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&:hover': {
    transition: theme.transitions.create('color', { duration: 250 }),
    color: theme.palette.primary.light,
  },
}))

const LinkedIn = styled(LinkedInIcon)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&:hover': {
    transition: theme.transitions.create('color', { duration: 250 }),
    color: theme.palette.primary.light,
  },
}))

const linkProperties = {
  color: 'inherit',
  target: '_blank',
  rel: 'noreferrer',
}

const Footer = () => {
  const { ownerInfo } = useContext(SiteContext)

  return (
    <FooterBox>
      <OuterGrid container>
        <GridItem size={{ xs: 12, md: 8 }} textAlign="center">
          <Typ variant="body1">
            &copy; Copyright {new Date().getFullYear()} - {ownerInfo.firstName}{' '}
            {ownerInfo.lastName}. Powered by&nbsp;
            <Link href="https://azure.microsoft.com/en-us/" {...linkProperties}>
              Azure
            </Link>
            ,&nbsp;
            <Link href="https://react.dev/" {...linkProperties}>
              React
            </Link>
            &nbsp;and&nbsp;
            <Link href="https://mui.com/" {...linkProperties}>
              MUI
            </Link>
            &nbsp;,&nbsp;
            <Link
              href="https://github.com/jwilliamson-dev/PersonalSite"
              {...linkProperties}
            >
              Website v2.0
            </Link>
          </Typ>
        </GridItem>
        <GridItem size={{ xs: 12, md: 3 }} textAlign="center">
          <Link href={ownerInfo.links.github} {...linkProperties}>
            <IconButton disableRipple>
              <GitHub fontSize="large" />
            </IconButton>
          </Link>
          <Link href={ownerInfo.links.linkedIn} {...linkProperties}>
            <IconButton disableRipple>
              <LinkedIn fontSize="large" />
            </IconButton>
          </Link>
        </GridItem>
      </OuterGrid>
    </FooterBox>
  )
}

export default Footer
