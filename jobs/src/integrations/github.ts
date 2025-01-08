import { Octokit } from '@octokit/rest'

import type { Project } from '$models/Project'

export const generateRepoInfo = async (
  key: string,
  username: string
): Promise<Project[]> => {
  const client = new Octokit({ auth: key })

  const repos = await client.repos.listForUser({
    username,
    visibility: 'public',
  })

  if (repos.data.length === 0) {
    return []
  }

  return repos.data.map((r) => {
    return {
      type: 'Repository' as const,
      name: r.name,
      url: r.html_url,
      description: r.description ?? '',
      created_at: r.created_at ?? '',
      updated_at: r.updated_at ?? '',
      keywords: r.topics ?? [],
      readme_url: `https://raw.githubusercontent.com/${r.full_name}/${r.default_branch ?? 'main'}/README.md`,
    }
  })
}

export const generateGistInfo = async (
  key: string,
  username: string
): Promise<Project[]> => {
  const client = new Octokit({ auth: key })

  const gists = await client.gists.listForUser({
    username,
  })

  if (gists.data.length === 0) {
    return []
  }

  return gists.data.map((g) => {
    return {
      type: 'Snippet' as const,
      name: g.description ?? '',
      url: g.html_url,
      created_at: g.created_at,
      updated_at: g.updated_at,
      embed_tag: `<script src="https://gist.github.com/${username}/${g.id}.js"></script>`,
    }
  })
}
