import React, { createContext, useEffect, useState } from 'react'

import type { SiteData } from '$models/SiteData'

export interface Site extends SiteData {
  isLoading: boolean
}

interface Props {
  children: React.ReactNode
}

const SiteContext = createContext<Site>({} as Site)

const SiteContextProvider = (props: Props) => {
  const [siteData, setSiteData] = useState<SiteData>({
    homepageMarkdown: '',
    ownerInfo: {
      firstName: '',
      lastName: '',
      email: '',
      links: {},
      city: '',
      stateProvince: '',
    },
    projects: {
      projectBlurb: '',
      projectList: [],
    },
    resume: {
      education: [],
      experience: [],
      projects: [],
      publications: [],
    },
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      try {
        const res = await fetch(`/data/siteData.json`)

        if (!res.ok) {
          throw new Error(`Failed to fetch siteData`)
        }

        const jsonData = (await res.json()) as SiteData
        setSiteData(jsonData)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    void fetchData()
  }, [])
  return (
    <SiteContext.Provider value={{ ...siteData, isLoading }}>
      {props.children}
    </SiteContext.Provider>
  )
}

export { SiteContextProvider as default, SiteContext }
