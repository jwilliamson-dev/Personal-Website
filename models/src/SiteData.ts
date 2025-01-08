import type { OwnerInfo } from './OwnerInfo'
import type { Project } from './Project'
import type {
  EducationInfo,
  ExperienceInfo,
  ProjectInfo,
  PublicationInfo,
} from './Resume'

export interface SiteData {
  ownerInfo: OwnerInfo
  resume: {
    education: EducationInfo[]
    experience: ExperienceInfo[]
    projects: ProjectInfo[]
    publications: PublicationInfo[]
  }
  projects: {
    projectBlurb: string
    projectList: Project[]
  }
  homepageMarkdown: string
}

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

export type PartialSiteData = DeepPartial<SiteData>
