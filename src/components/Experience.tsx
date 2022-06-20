import React from 'react'
import { Typography as Typ } from '@mui/material'
import { Section } from 'types/Document'

type Props = {
  data: Section
}

const Experience: React.FC<Props> = ({ data }) => {
  let i = 0

  return (
    <>
      <Typ>{data.content[0]}</Typ>
      <Typ variant='h3' mb={0}>{data.heading}</Typ>
      <ul>
        { data.content.slice(1).map(item => <li key={(i++)}>{item}</li>) }
      </ul>
    </>
  )
}

export default Experience