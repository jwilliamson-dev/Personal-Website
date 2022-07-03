interface Repo {
  id: number
  name: string
  url: string
}

interface Repository {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: User
  html_url: string
  description: string
  fork: boolean
  url: string
  forks_url: string
  keys_url: string
  collaborators_url: string
  teams_url: string
  hooks_url: string
  issue_events_url: string
  events_url: string
  assignees_url: string
  branches_url: string
  tags_url: string
  blobs_url: string
  git_tags_url: string
  git_refs_url: string
  trees_url: string
  statuses_url: string
  languages_url: string
  stargazers_url: string
  contributors_url: string
  subscribers_url: string
  subscription_url: string
  commits_url: string
  git_commits_url: string
  comments_url: string
  issue_comment_url: string
  contents_url: string
  compare_url: string
  merges_url: string
  archive_url: string
  downloads_url: string
  issues_url: string
  pulls_url: string
  milestones_url: string
  notifications_url: string
  labels_url: string
  releases_url: string
  deployments_url: string
  created_at: Date
  updated_at: Date
  pushed_at: Date
  git_url: string
  ssh_url: string
  clone_url: string
  svn_url: string
  homepage: string
  size: number
  stargazers_count: number
  watchers_count: number
  language: string
  has_issues: boolean
  has_projects: boolean
  has_downloads: boolean
  has_wiki: boolean
  has_pages: boolean
  forks_count: number
  mirror_url: URL
  archived: boolean
  disabled: boolean
  open_issues_count: number
  license: string
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
  public: boolean
}

interface Actor {
  id: number
  login: string
  display_login: string
  gravatar_id: string
  avatar_url: string
  url: string
}

interface Org {
  id: number
  login: string
  gravatar_id: string
  url: string
  avatar_url: string
}

interface User {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  name?: string
  company?: string
  blog?: string
  location?: string
  email?: string
  hireable?: boolean
  bio?: string
  public_repos?: number
  public_gists?: number
  followers?: number
  following?: number
  created_at?: Date
  updated_at?: Date
}

interface Issue {
  url: string
  repository_url: string
  labels_url: string
  comments_url: string
  events_url: string
  html_url: string
  id: number
  node_id: string
  number: number
  title: string
  user: User
  state: string
  locked: boolean
  assignee: User
  assignees: User[]
  comments: number
  created_at: Date
  updated_at: Date
  closed_at?: Date
  author_association: string
  body: string
}

interface PullRequest {
  url: string
  id: number
  node_id: string
  html_url: string
  diff_url: string
  patch_url: string
  issue_url: string
  number: number
  state: string
  locked: boolean
  title: string
  user: User
  body: string
  created_at: Date
  updated_at: Date
  closed_at: Date
  merge_commit_sha: string
  assignee: User
  assignees: User[]
  requested_reviewers: User[]
  commits_url: string
  review_comments_url: string
  review_comment_url: string
  comments_url: string
  statuses_url: string
  head: object
  base: object
  _links: object
  author_association: string
  merged: boolean
  mergeable: boolean
  rebaseable: boolean
  mergeable_state: string
  merged_by: User
  comments: number
  review_comments: number
  maintainer_can_modify: boolean
  commits: number
  additions: number
  deletions: number
  changed_files: number
}

interface Comment {
  html_url: string
  url: string
  id: number
  node_id: string
  body: string
  path: string
  position: number
  line: number
  commit_id: string
  user: User
  created_at: Date
  updated_at: Date
}

interface BaseEvent {
  type: string
  id: string
  public: boolean
  repo: Repo
  actor: Actor
  org?: Org
  created_at: Date
}

interface CreateEvent extends BaseEvent {
  type: 'CreateEvent'
  payload:
    | {
        ref_type: 'repository'
        master_branch: 'master' | string
        description: string
      }
    | {
        ref_type: 'branch' | 'tag'
        ref: string
        master_branch: 'master' | string
        description: string
      }
}

interface MemberEvent extends BaseEvent {
  type: 'MemberEvent'
  payload: {
    member: User
    action: 'added' | 'deleted' | 'edited'
    changes?: object
  }
}

interface Commit {
  sha: string,
  message: string,
  url: URL,
  distinct: boolean
}

interface PushEvent extends BaseEvent {
  type: 'PushEvent'
  payload: {
    ref: 'refs/heads/master' | string
    head: string
    before: string
    size: number
    distinct_size: number
    commits: Commit[]
  }
}

interface ForkEvent extends BaseEvent {
  type: 'ForkEvent'
  payload: {
    forkee: Repository
  }
}

interface WatchEvent extends BaseEvent {
  type: 'WatchEvent'
  payload: {
    action: 'started'
  }
}

interface IssuesEvent extends BaseEvent {
  type: 'IssuesEvent'
  payload: {
    action:
      | 'opened'
      | 'edited'
      | 'deleted'
      | 'transferred'
      | 'pinned'
      | 'unpinned'
      | 'closed'
      | 'reopened'
      | 'assigned'
      | 'unassigned'
      | 'labeled'
      | 'unlabeled'
      | 'locked'
      | 'unlocked'
      | 'milestoned'
      | 'demilestoned'
    issue: Issue
    changes?: object
    assignee?: object
    label?: object
  }
}

interface PullRequestEvent extends BaseEvent {
  type: 'PullRequestEvent'
  payload: {
    action:
      | 'assigned'
      | 'unassigned'
      | 'review_requested'
      | 'review_request_removed'
      | 'labeled'
      | 'unlabeled'
      | 'opened'
      | 'edited'
      | 'closed'
      | 'ready_for_review'
      | 'locked'
      | 'unlocked'
      | 'reopened'
    number: number
    changes: object
    pull_request: PullRequest
  }
}

interface GollumEvent extends BaseEvent {
  type: 'GollumEvent'
  payload: {
    pages: {
      page_name: string
      title: string
      action: 'created' | 'edited'
      sha: string
      html_url: string
    }[]
  }
}

interface CommitCommentEvent extends BaseEvent {
  type: 'CommitCommentEvent'
  payload: {
    comment: Comment
  }
}

interface PullRequestReviewCommentEvent extends BaseEvent {
  type: 'PullRequestReviewCommentEvent'
  payload: {
    action: 'created' | 'edited' | 'deleted'
    changes?: object
    pull_request: PullRequest
    comment: Comment
  }
}

interface IssueCommentEvent extends BaseEvent {
  type: 'IssueCommentEvent'
  payload: {
    action: 'created' | 'edited' | 'deleted'
    changes?: object
    issue: Issue
    comment: Comment
  }
}

interface DeleteEvent extends BaseEvent {
  type: 'DeleteEvent'
  payload: {
    ref_type: 'branch' | 'tag'
    ref: string
  }
}

interface PublicEvent extends BaseEvent {
  type: 'PublicEvent'
  payload: null
}

interface ReleaseEvent extends BaseEvent {
  type: 'ReleaseEvent'
  payload: {
    action:
      | 'published'
      | 'unpublished'
      | 'created'
      | 'edited'
      | 'deleted'
      | 'prereleased'
    changes?: object
    release: Release
  }
}

interface Release {
  url: string
  html_url: string
  assets_url: string
  upload_url: string
  tarball_url: string
  zipball_url: string
  id: number
  node_id: string
  tag_name: string
  target_commitish: string
  name: string
  body: string
  draft: boolean
  prerelease: boolean
  created_at: Date
  published_at: Date
  author: User
  assets: ReleaseAsset[]
}

interface ReleaseAsset {
  url: string
  browser_download_url: string
  id: number
  node_id: string
  name: string
  label: string
  state: string
  content_type: string
  size: number
  download_count: number
  created_at: Date
  updated_at: Date
  uploader: User
}

type GithubEvent =
  | CommitCommentEvent
  | CreateEvent
  | DeleteEvent
  | ForkEvent
  | GollumEvent
  | IssueCommentEvent
  | IssuesEvent
  | MemberEvent
  | PublicEvent
  | PullRequestEvent
  | PullRequestReviewCommentEvent
  | PushEvent
  | ReleaseEvent
  | WatchEvent

export { GithubEvent }