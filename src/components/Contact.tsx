import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import { getLinkProps } from 'utils/navigation'
import { Grid, Link } from '@mui/material'
import { Contact as TContact } from 'types'

interface IContact extends TContact {
  useIcon?: boolean
}

const Contact: React.FC<IContact> = ({
  service,
  url,
  username,
  useIcon
}) => {
  const getIcon = (icon: string) => {
    switch (icon.toLowerCase()) {
    case 'email':
      return <EmailIcon fontSize='medium' />
    case 'github':
      return <GitHubIcon fontSize='medium' />
    case 'linkedin':
      return <LinkedInIcon fontSize='medium' />
    case 'twitter':
      return <TwitterIcon fontSize='medium' />
    }
  }

  return (
    <Grid item xs={12} sm={6} md={3} display='flex' alignItems='center' justifyContent='center'>
      { useIcon && getIcon(service) }
      <Link {...getLinkProps(url, 'inherit')}>{username}</Link>
    </Grid>
  )
}

export default Contact