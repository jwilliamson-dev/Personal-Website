import { Typography as Typ } from '@mui/material'
import { Section as TSection } from 'types'

interface ISection extends TSection {
  startAtLevel?: number,
  underlineHeader?: boolean,
  underlineSubHeadings?: boolean
}

type HLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const levelToHeader = new Map<number, HLevel>([
  [1, 'h1'],
  [2, 'h2'],
  [3, 'h3'],
  [4, 'h4'],
  [5, 'h5'],
  [6,'h6']
])

const Section: React.FC<ISection> = ({
  heading,
  type,
  content,
  subsections,
  startAtLevel,
  underlineHeader,
  underlineSubHeadings
}) => {
  let key = 0

  const level = !startAtLevel || startAtLevel < 1 ? 1 
    : startAtLevel > 6 ? 6 
      : startAtLevel

  return (
    <>
      <Typ 
        variant={startAtLevel ? levelToHeader.get(startAtLevel) : levelToHeader.get(1)}>
        {heading}
      </Typ>
      { underlineHeader && <hr /> }

      { type === 'paragraph' ? (
        <>
          { content.map(paragraph => <Typ variant='body2' key={key++}>{paragraph}</Typ>) }
          { subsections && subsections.map(section =>
            <Section 
              key={key++}
              {...section} 
              startAtLevel={level+1} 
              underlineHeader={underlineSubHeadings} 
              underlineSubHeadings={underlineSubHeadings}/>
          ) }
        </>
        
      ) : (
        <ul>
          { content.map(item => <li key={key++}>{item}</li>) }
          { subsections && subsections.map(section =>
            <Section 
              {...section} 
              startAtLevel={level+1} 
              underlineHeader={underlineSubHeadings} 
              underlineSubHeadings={underlineSubHeadings}
              key={key++}/>
          ) }
        </ul>
      ) }
      
      
    </>
  )
}

export default Section