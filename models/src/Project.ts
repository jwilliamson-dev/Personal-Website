export interface Project {
  type: 'Repository' | 'Snippet'
  name: string
  url: string
  description?: string
  created_at: string
  updated_at: string
  keywords?: string[]
  embed_tag?: string
  readme_url?: string
}
