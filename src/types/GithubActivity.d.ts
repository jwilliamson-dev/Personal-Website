type Commit = {
    sha: string,
    message: string
}

type GitHubActivity = {
    type: 'PushEvent',
    repo: {
        name: string,
        url: string
    },
    payload: {
        size: number,
        commits: Commit[]
    },
    created_at: Date
}

export { GitHubActivity, Commit }