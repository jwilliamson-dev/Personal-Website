import * as Icon from 'styles/IconStyles'
import * as Banner from 'styles/BannerStyles'
import { 
  Grid, 
  Link, 
  Typography as Typ, 
  useMediaQuery, 
  useTheme 
} from '@mui/material'

const Footer: React.FC = () => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))
  const linkProperties = { 
    color: 'inherit', 
    target: '_blank', 
    rel: 'noopener noreferrer' 
  }

  return (
    <Banner.Outer container>
      <Banner.Inner container item xs={11} md={10}>
        <Grid item sm={10}>
          <Typ variant='body1' textAlign={ isSmall ? 'center' : 'left'}>
          &copy; Copyright {(new Date()).getFullYear()} - Jacob Williamson, Powered by&nbsp;
            <Link href='https://reactjs.org/' {...linkProperties}>
              React
            </Link> 
          &nbsp;and&nbsp;
            <Link href='https://mui.com/' {...linkProperties}>
                MUI
            </Link>
          , Website v1.0
          </Typ>
        </Grid>
        <Grid 
          item
          xs={6}
          sm={2} 
          display='flex'
          alignItems='center'
          justifyContent={ isSmall ? 'space-evenly' : 'space-evenly'}>
          <Link href='https://github.com/jwilliamson-dev' {...linkProperties}>
            <Icon.GitHub />
          </Link>
          <Link href='https://www.linkedin.com/in/jjw324' {...linkProperties}>
            <Icon.LinkedIn />
          </Link>
          <Link href='https://twitter.com/jwilliamson_dev' {...linkProperties}>
            <Icon.Twitter />
          </Link>
        </Grid>
      </Banner.Inner>
    </Banner.Outer>
  )
}

export default Footer