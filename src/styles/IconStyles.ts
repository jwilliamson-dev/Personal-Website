import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import { styled } from '@mui/material'
import Theme from './theme'

const SGitHubIcon = styled(GitHubIcon)`
    font-size: 1.8rem !important;
    margin-left: 1rem;
    align-self: center;
    color: #062630;
    -webkit-transition: color 200ms linear;
    -ms-transition: color 200ms linear;
    -moz-transition: color 200ms linear;
    transition: color 200ms linear;

    :hover {
        color: ${Theme.palette.background.default};
        -webkit-transition: color 200ms linear;
        -ms-transition: color 200ms linear;
        -moz-transition: color 200ms linear;
        transition: color 200ms linear;
    }
`
const SLinkedInIcon = styled(LinkedInIcon)`
font-size: 1.8rem !important;
margin-left: 1rem;
align-self: center;
color: #062630;
-webkit-transition: color 200ms linear;
-ms-transition: color 200ms linear;
-moz-transition: color 200ms linear;
transition: color 200ms linear;

:hover {
    color: ${Theme.palette.background.default};
    -webkit-transition: color 200ms linear;
    -ms-transition: color 200ms linear;
    -moz-transition: color 200ms linear;
    transition: color 200ms linear;
}
`
const STwitterIcon = styled(TwitterIcon)`
font-size: 1.8rem !important;
margin-left: 1rem;
align-self: center;
color: #062630;
-webkit-transition: color 200ms linear;
-ms-transition: color 200ms linear;
-moz-transition: color 200ms linear;
transition: color 200ms linear;

:hover {
    color: ${Theme.palette.background.default};
    -webkit-transition: color 200ms linear;
    -ms-transition: color 200ms linear;
    -moz-transition: color 200ms linear;
    transition: color 200ms linear;
}
`

export {
  SGitHubIcon,
  SLinkedInIcon,
  STwitterIcon
}