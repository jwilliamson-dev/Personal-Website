import React from 'react'
import { Box, Grid, Typography as Typ } from '@mui/material'
import { ContactLink, Section } from 'components'
import { useContacts, usePageContent } from 'hooks'

const About: React.FC = () => {
  const { 
    content: aboutData, 
    isLoading: isLoadingContent 
  } = usePageContent('about')
  
  const { 
    contacts, 
    isLoading: isLoadingContacts 
  } = useContacts()
  
  let key = 0
  
  return (
    <Grid item lg={9} md={10} xs={11} textAlign='left'>
      { (isLoadingContacts || isLoadingContent) ? (
        <Typ variant='h1'>Loading Data...</Typ>
      ) : (
        <>
          { contacts.length > 0 && (
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