import React, { ReactElement } from 'react'
import { Box, Grid, Typography as Typ } from '@mui/material'
import { Document, Section } from 'types/Document'
import usePageContent from 'hooks/usePageContent'
import useContacts from 'hooks/useContacts'
import ContactLink from 'components/ContactLink'

type HLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const levelToHeader = new Map<number, HLevel>([
  [1, 'h1'],
  [2, 'h2'],
  [3, 'h3'],
  [4, 'h4'],
  [5, 'h5'],
  [6,'h6']
])

const About: React.FC = () => {
  const { 
    content: aboutData, 
    isLoading: isLoadingContent 
  } = usePageContent('about')
  const { contacts, isLoading: isLoadingContacts } = useContacts()
  let i = 0

  const renderSection = (section: Section, level: number): ReactElement => {
    const hLevel = levelToHeader.get(level)
    let thisSection: ReactElement | Array<ReactElement> = []
    let subsections: Array<ReactElement> = []

    if (section.subsections !== null && section.subsections !== undefined) {
      subsections = section.subsections.map(x => renderSection(x, level+1))
    }

    if (section.type === 'list') {
      thisSection = <ul>{section.content.map(x => <li>{x}</li>)}</ul>
    } else if (section.type === 'paragraph') {
      thisSection = section.content.map(x => <Typ variant='body2' key={i++}>{x}</Typ>)
    }

    return (
      <React.Fragment key={i++}>
        <Typ variant={hLevel} key={i++}>{section.heading}</Typ>
        { thisSection }
        { subsections }
      </React.Fragment>
    )
  }
  
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
              { contacts.map(contact => <ContactLink key={i++} {...contact} useIcon />) }
            </Box>
          ) }

          { aboutData ? (
            aboutData.sections.map(section => renderSection(section, 1))
          ) : (
            <Typ variant='h1'>Error loading page content</Typ>
          ) }
        </>
      ) }
    </Grid>
  )
}

export default About