import { useEffect, useState } from 'react'

interface LocalData<T> {
  data: T | null,
  isLoading: boolean
}

const useLocalData = <T>(path: string): LocalData<T> => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        const res = await fetch(`/data/${path}`)
        const jsonData: T = await res.json()
        setData(jsonData)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
  
    fetchData()
  }, [])
  
  return {
    data,
    isLoading
  }
}


export default useLocalData