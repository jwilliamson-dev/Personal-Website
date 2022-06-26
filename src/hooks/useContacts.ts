import { useEffect, useState } from 'react'
import Contact from 'types/Contact'

type ContactInfo = {
  contacts: Contact[],
  isLoading: boolean
}

const useContacts = (): ContactInfo => {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true)

      try {
        const res = await fetch('/data/contacts.json')
        const jsonData: Contact[] = await res.json()
        setContacts(jsonData)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
  
    fetchContacts()
  }, [])
  
  return {
    contacts,
    isLoading
  }
}


export default useContacts