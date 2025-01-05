import LaunchIcon from '@mui/icons-material/Launch'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Link,
  Modal,
  styled,
  Typography as Typ,
} from '@mui/material'
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

import { Project } from '../../../models/src/Project'

interface Props {
  project: Project
  selectedKeywords: string[]
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>
}

const CardContainer = styled(Card)({
  minWidth: '250px',
  width: '30%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
})

const ActionBar = styled(CardActions)({
  display: 'flex',
  justifyContent: 'space-between',
})

const ChipBox = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2px',
})

const ModalBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #000',
  maxHeight: '75vh',
  maxWidth: '75vw',
  overflow: 'auto',
  padding: '5px',
}))

const getDateString = (timestamp: string) =>
  new Date(timestamp).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

const generateKeywordChips = (params: Props) => {
  const {
    project: { keywords },
    selectedKeywords,
  } = params
  return keywords
    ?.sort((a, b) => a.localeCompare(b))
    .map((v, i) => {
      const p = {
        label: v,
        color: selectedKeywords.includes(v)
          ? ('primary' as const)
          : ('default' as const),
      }
      return (
        <Chip
          {...p}
          onClick={() => {
            handleChipClick(v, params.selectedKeywords, params.setKeywords)
          }}
          key={i}
        />
      )
    })
}

const getGistContent = (scriptTag: string, elementId: string) => {
  const resizeHeight = `onload="parent.document.getElementById('${elementId}').style.height=document.body.scrollHeight + 'px'"`
  return `<html><head><base target="_parent"></head><body ${resizeHeight} >${scriptTag}</body></html>`
}

const handleChipClick = (
  keyword: string,
  keywords: string[],
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>
) => {
  let newKeywords: string[]
  if (!keywords.includes(keyword)) {
    newKeywords = [...keywords, keyword]
  } else {
    newKeywords = keywords.filter((v) => v !== keyword)
  }

  setKeywords(newKeywords)
}

const ProjectCard = (props: Props) => {
  const [showModal, setShowModal] = useState(false)
  const [iframeRef, setIframeRef] = useState<HTMLIFrameElement | null>(null)
  const [readme, setReadme] = useState('')
  const { project } = props

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!project.readme_url) {
        return
      }

      try {
        const res = await fetch(project.readme_url)

        if (!res.ok) {
          throw new Error(`Failed to fetch ${project.readme_url}`)
        }

        const data = await res.text()

        setReadme(data)
      } catch (error) {
        console.error(error)
      }
    }

    void fetchData()
  }, [project.readme_url])

  useEffect(() => {
    if (iframeRef && project.embed_tag) {
      const doc = iframeRef.contentDocument ?? iframeRef.contentWindow?.document

      if (!doc) {
        return
      }

      const content = getGistContent(project.embed_tag, project.name)

      doc.open()
      doc.writeln(content)
      doc.close()
    }
  }, [iframeRef, project.embed_tag, project.name])

  return (
    <CardContainer>
      <CardContent>
        <Typ gutterBottom>{project.type}</Typ>
        <Typ variant="h5">{project.name}</Typ>
        {project.description && (
          <Typ variant="body1">{project.description}</Typ>
        )}
        <ChipBox>{generateKeywordChips(props)}</ChipBox>
        <Typ variant="body2">
          Last updated on {getDateString(project.updated_at)}
        </Typ>
      </CardContent>
      <ActionBar>
        <Button size="small" color="inherit" onClick={openModal}>
          View {project.embed_tag ? 'Content' : 'Readme'}
        </Button>
        <Link href={project.url} target="_blank" rel="noreferrer">
          <IconButton size="small">
            <LaunchIcon fontSize="small" />
          </IconButton>
        </Link>
        <Modal
          open={showModal}
          onClose={closeModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <ModalBox>
            <Typ id="modal-title" variant="h6" component="h2">
              {project.readme_url ? 'README.md' : 'Gist Content'}
            </Typ>

            {project.readme_url && <ReactMarkdown>{readme}</ReactMarkdown>}
            {project.embed_tag && (
              <Box width="50vw">
                <iframe
                  title={`${project.name} content`}
                  ref={setIframeRef}
                  id={project.name}
                  style={{ border: 0 }}
                  width="100%"
                />
              </Box>
            )}
          </ModalBox>
        </Modal>
      </ActionBar>
    </CardContainer>
  )
}

export default ProjectCard
