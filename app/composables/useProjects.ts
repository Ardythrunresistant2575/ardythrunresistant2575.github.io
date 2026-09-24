import type { EnrichedProject } from '~~/shared/types/project'

/**
 * Card-level data for every project. Rendered on the server on first paint, so
 * the numbers in the HTML are as fresh as the server's cache.
 */
export async function useProjects() {
  const { data, error } = await useFetch<{ count: number, projects: EnrichedProject[] }>(
    '/api/projects',
    { key: 'projects' },
  )
  return {
    projects: computed<EnrichedProject[]>(() => data.value?.projects ?? []),
    error,
  }
}

/** One project, README included. */
export async function useProject(slug: MaybeRefOrGetter<string>) {
  const key = computed(() => `project:${toValue(slug)}`)
  const { data, error } = await useFetch<EnrichedProject>(
    () => `/api/projects/${toValue(slug)}`,
    { key: () => key.value },
  )
  return { project: data, error }
}
