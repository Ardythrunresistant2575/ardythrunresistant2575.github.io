import type { Project } from '~~/data/projects'

/** The live half of a project: whatever GitHub and crates.io report right now. */
export interface RepoMeta {
  repo: string
  /** When the upstream call behind this data was made. */
  fetchedAt: string
  /** 'snapshot' means upstream was unreachable and the committed fallback was used. */
  source: 'live' | 'snapshot'
  description: string | null
  htmlUrl: string
  homepage: string | null
  language: string | null
  topics: string[]
  stars: number
  forks: number
  openIssues: number
  license: string | null
  defaultBranch: string
  createdAt: string
  pushedAt: string
  archived: boolean
  readmeHtml: string | null
  latestRelease: { tag: string, url: string, publishedAt: string } | null
  crateVersion?: string
  crateDownloads?: number
  crateUrl?: string
  docsUrl?: string
}

export type EnrichedProject = Project & {
  meta: RepoMeta | null
  /** `project.example.code`, syntax-highlighted on the server. */
  exampleHtml?: string | null
}
