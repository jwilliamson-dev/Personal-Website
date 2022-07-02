import { Typography as Typ } from '@mui/material'
import { Page } from 'types/Page'
import useLoacalData from 'hooks/useLocalData'
import ResumeContent from './ResumeContent'

const Resume: React.FC = () => {
  const {
    data: resumeData,
    isLoading
  } = useLoacalData<Page>('resume.json')

  return (
    <>
      { isLoading ? 
        <Typ variant='h1'>Loading Data...</Typ>
        : resumeData && 
        
        <ResumeContent 
          header={resumeData.sections[0]}
          education={resumeData.sections[1]}
          experience={resumeData.sections[2]}
          projects={resumeData.sections[3]}
          skills={resumeData.sections[4]}
          activities={resumeData.sections[5]}
        />
      }
    </>
  )
}

export default Resume