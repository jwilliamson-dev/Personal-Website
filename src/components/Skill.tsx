import React from 'react'
import { Grid, Typography as Typ } from '@mui/material'
import { Section } from '../types/Document'

type Props = {
  data: Section
}

const Skill: React.FC<Props> = ({ data }) => {
  let i = 0
  
  return (
    <Grid item md={6} xs={12}>
      <Typ variant='h3'>{data.heading}</Typ>
      <ul>
        { data.content.map(skill => <li key={i++}>{skill}</li>) }
      </ul>
    </Grid>
  )
}

export default Skill