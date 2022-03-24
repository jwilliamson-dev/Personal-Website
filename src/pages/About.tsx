import React, { useState, useEffect, ReactElement } from 'react'
import { Box, Grid, Link, Typography as Typ, styled } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Document, Section } from '../types/Document'

type Props = {}

type HLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const levelToHeader = new Map<number, HLevel>([
  [1, 'h1'],
  [2, 'h2'],
  [3, 'h3'],
  [4, 'h4'],
  [5, 'h5'],
  [6,'h6']
])

const AGrid = styled(Grid)`
  text-align: left;
  margin-top: 1rem;
`

const Contact = styled(Box)`
  display: flex;
  align-items: center;
  padding-bottom: 0.5rem;
`

const ContactBar= styled(Box)`
  display: flex;
  justify-content: space-around;
`

const About: React.FC = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [aboutData, setAboutData] = useState<Document | null>()
  let i = 0
  
  useEffect(() => {
    const getAboutData = async () => {
      setIsLoading(true)

      try {
        const res = await fetch('/data/about.json')
        const jsonData: Document = await res.json()
        setAboutData(jsonData)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
  
    getAboutData()
  }, [])

  const renderSection = (section: Section, level: number): ReactElement => {
    const hLevel = levelToHeader.get(level)
    let thisSection: ReactElement | Array<ReactElement> = []
    let subsections: Array<ReactElement> = []

    if (section.subsections !== null && section.subsections !== undefined) {
      subsections = section.subsections.map(x => renderSection(x, level+1))
    }

    if (section.type === 'list') {
      thisSection = <ul>{section.content.map(x => <li id={(i++).toString()}>{x}</li>)}</ul>
    } else if (section.type === 'paragraph') {
      thisSection = section.content.map(x => <Typ variant='body2' id={(i++).toString()}>{x}</Typ>)
    }

    return (
      <>
        <Typ variant={hLevel}>{section.heading}</Typ>
        { thisSection }
        { subsections }
      </>
    )
  }
  
  return (
    <AGrid container justifyContent='center'>
      <Grid item lg={8} md={9} sm={10} xs={11}>
        <ContactBar>
          <Contact>
            <EmailIcon fontSize='medium' /> &nbsp;
            <Link color='inherit' href='mailto:me@jacobwilliamson.dev'>me@jacobwilliamson.dev</Link>
          </Contact>
          <Contact>
            <GitHubIcon fontSize='medium' /> &nbsp;
            <Link color='inherit' href='https://github.com/jwilliamson-dev' target='_blank' rel='noopener noreferrer'>jwilliamson-dev</Link>
          </Contact>
          <Contact>
            <LinkedInIcon fontSize='medium' /> &nbsp;
            <Link color='inherit' href='https://www.linkedin.com/in/jjw324/' target='_blank' rel='noopener noreferrer'>jwilliamson-dev</Link>
          </Contact>
          <Contact>
            <TwitterIcon fontSize='medium' /> &nbsp;
            <Link color='inherit' href='https://twitter.com/jwilliamson_dev' target='_blank' rel='noopener noreferrer'>@jwilliamson_dev</Link>
          </Contact>
        </ContactBar>

        {aboutData ? (
          aboutData.sections.map(section => renderSection(section, 1))
        ) : (
          <Typ variant='h1'>Loading Data...</Typ>
        )}
      </Grid>
    </AGrid>
  )
}

export default About