import { Section } from 'types/Page'

type Props = {
  data: Section
}

const Project: React.FC<Props> = ({ data }) => {
  return (
    <>
      <li>
        <strong>{data.heading}</strong>
        <br />
        {data.content}
      </li>
    </>
  )
}

export default Project