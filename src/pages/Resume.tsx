import React, { useState, useEffect, ReactElement } from 'react'
import { Typography as Typ, Grid } from '@mui/material'
import { Document } from '../types/Document'
import ResumeContent from './ResumeContent'

type Props = {}

const Resume: React.FC = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [resumeData, setResumeData] = useState<Document | null>()
  
  useEffect(() => {
    const getAboutData = async () => {
      setIsLoading(true)

      try {
        const res = await fetch('/data/resume.json')
        const jsonData: Document = await res.json()
        setResumeData(jsonData)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
  
    getAboutData()
  }, [])
  
  return (
    <>
      {isLoading ? (
        <Typ variant='h1'>Loading Data...</Typ>
      ) : (resumeData ? (
        <ResumeContent 
          header={resumeData.sections[0]}
          education={resumeData.sections[1]}
          experience={resumeData.sections[2]}
          projects={resumeData.sections[3]}
          skills={resumeData.sections[4]}
          activities={resumeData.sections[5]}
        />
      ) : (
        <Typ variant='h1'>Unable to load content :(</Typ>
      )
      )}
    </>
  )
}

export default Resume