export interface EducationInfo {
  thumbnailUrl: string
  profileUrl: string
  name: string
  degree: string
  dates: string
  additionalInfo?: string[]
}

export interface ExperienceInfo {
  thumbnailUrl: string
  profileUrl: string
  title: string
  name: string
  employmentType: string
  startMonth: string
  endMonth: string
  duration: string
  location: string
  locationType: string
  dutyList: string[]
}

export interface ProjectInfo {
  name: string
  keywords: string[]
  description: string
  url: string
}

export interface PublicationInfo {
  publicationUrl: string
  title: string
  publication: string
  publicationDate: string
  description: string
}
