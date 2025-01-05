import PaletteIcon from '@mui/icons-material/Palette'
import {
  Box,
  Button,
  Grid2 as Grid,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Typography as Typ,
} from '@mui/material'
import { useContext, useState } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'

import type { SiteMapItem } from '../App'
import { SiteContext } from '../content/SiteContext'
import { ThemeContext, ThemeMap, ThemeName } from '../styles/ThemeContext'

const HeaderBox = styled(Box)(({ theme }) => ({
  background: theme.palette.primary.dark,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  boxShadow: theme.palette.mode === 'light' ? '0 0 10px 0' : '0',
  '@media print': { display: 'none' },
}))

const OuterGrid = styled(Grid)(({ theme }) => ({
  spacing: 0,
  justifyContent: 'space-between',
  maxWidth: theme.breakpoints.values.lg,
  flexGrow: 1,
}))

const GridItem = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
})

const ActiveNavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 'bold',
  borderBottom: `5px solid ${theme.palette.text.primary}`,
  borderTop: '5px solid transparent',
  '&:hover': {
    borderBottom: `5px solid ${theme.palette.primary.light}`,
    color: theme.palette.primary.light,
  },
}))

const InactiveNavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 'bold',
  borderBottom: '5px solid transparent',
  borderTop: '5px solid transparent',
  '&:hover': {
    borderBottom: `5px solid ${theme.palette.primary.light}`,
    color: theme.palette.primary.light,
  },
}))

const Palette = styled(PaletteIcon)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&:hover': {
    transition: theme.transitions.create('color', { duration: 250 }),
    color: theme.palette.primary.light,
  },
}))

const generateNavButtons = (
  siteMap: SiteMapItem[],
  currentLocation: string
) => {
  return siteMap.map((v) => {
    const NavButton =
      currentLocation === v.route ? ActiveNavButton : InactiveNavButton
    const props = {
      variant: 'text' as const,
      color: 'secondary' as const,
      to: v.route,
      disableRipple: true,
    }

    return (
      <NavButton LinkComponent={RouterLink} {...props} key={v.name}>
        {v.name}
      </NavButton>
    )
  })
}

const themeOptions = [...ThemeMap.keys()]

const Header = (props: IHeaderProps) => {
  const { pathname } = useLocation()
  const { ownerInfo } = useContext(SiteContext)
  const { themeName, setThemeName } = useContext(ThemeContext)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuItemClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const target = event.target as HTMLLIElement
    setThemeName(target.innerText as ThemeName)
    setAnchorEl(null)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <HeaderBox>
      <OuterGrid container>
        <GridItem size={{ xs: 12, md: 4 }} textAlign="center">
          <Typ variant="h4" fontWeight="normal" color="inherit">
            {ownerInfo.firstName} {ownerInfo.lastName}
          </Typ>
        </GridItem>
        <GridItem size={{ xs: 12, md: 4 }}>
          {generateNavButtons(props.nav, pathname)}
          <IconButton
            aria-label="choose theme"
            size="medium"
            id="themeButton"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            disableRipple
          >
            <Palette fontSize="inherit" />
          </IconButton>
          <Menu
            id="themeChoiceMenu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-label': 'choose theme',
              role: 'listbox',
            }}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {themeOptions.map((v) => (
              <MenuItem
                key={v}
                selected={v === themeName}
                onClick={handleMenuItemClick}
                style={{ fontWeight: v === themeName ? 'bold' : 'normal' }}
              >
                {v}
              </MenuItem>
            ))}
          </Menu>
        </GridItem>
      </OuterGrid>
    </HeaderBox>
  )
}

export default Header

export interface IHeaderProps {
  nav: SiteMapItem[]
}
