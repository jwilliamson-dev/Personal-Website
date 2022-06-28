import { useState, useEffect } from 'react'
import { Typography as Typ } from '@mui/material'
import { Page } from 'types/Page'
import ResumeContent from './ResumeContent'

const Resume: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [resumeData, setResumeData] = useState<Page | null>()
  
  useEffect(() => {
    const getAboutData = async () => {
      setIsLoading(true)

      try {
        const res = await fetch('/data/resume.json')
        const jsonData: Page = await res.json()
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