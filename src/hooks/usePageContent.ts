import { useEffect, useState } from 'react'
import { Document } from 'types/Document'

type PageConent = {
  content: Document | null,
  isLoading: boolean
}

const usePageContent = (path: string): PageConent => {
  const [content, setContent] = useState<Document | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true)

      try {
        const res = await fetch(`/data/${path}.json`)
        const jsonData: Document = await res.json()
        setContent(jsonData)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
  
    fetchContent()
  }, [])
  
  return {
    content,
    isLoading
  }
}


export default usePageContent