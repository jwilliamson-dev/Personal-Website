import { Box, Grid, Typography as Typ } from '@mui/material'
import { ContactLink, Section } from 'components'
import { Page, Contact } from 'types'
import useLocalData from 'hooks/useLocalData'

const About: React.FC = () => {
  const { 
    data: aboutData, 
    isLoading: isLoadingContent 
  } = useLocalData<Page>('about.json')
  
  const { 
    data: contacts, 
    isLoading: isLoadingContacts 
  } = useLocalData<Contact[]>('contacts.json')
  
  let key = 0
  
  return (
    <Grid item lg={9} md={10} xs={11} textAlign='left'>
      { (isLoadingContacts || isLoadingContent) ? (
        <Typ variant='h1'>Loading Data...</Typ>
      ) : (
        <>
          { contacts && contacts.length > 0 && (
            <Box 
              display='flex' 
              alignItems='center' 
              justifyContent='space-around'
              pb={1}> 
              { contacts.map(contact => <ContactLink key={key++} {...contact} useIcon />) }
            </Box>
          ) }

          { aboutData ? (
            aboutData.sections.map(section => <Section {...section} />)
          ) : (
            <Typ variant='h1'>Error loading page content</Typ>
          ) }
        </>
      ) }
    </Grid>
  )
}

export default About