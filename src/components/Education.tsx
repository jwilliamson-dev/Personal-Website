import React from 'react'
import { Section } from '../types/Document'

type Props = {
  data: Section
}

const Education: React.FC<Props> = ({ data }) => {
  let i = 1

  return (
    <>
      { data.content.map(item => <li key={(i++)}>{item}</li>) }
      { data.subsections && 
        <ul>
          { data.subsections.map(item => <Education data={item} key={(i++)} />) }
        </ul>
      }
    </>
  )
}

export default Education