/** Editorial code samples never change at runtime — highlight each one once. */
const examples = new Map<string, string>()

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }

  const project = await getProject(slug)

  if (!project) {
    throw createError({ statusCode: 404, statusMessage: 'No such project' })
  }

  let exampleHtml: string | null = null
  if (project.example) {
    const cached = examples.get(slug)
    if (cached) {
      exampleHtml = cached
    }
    else {
      exampleHtml = await highlight(project.example.code, project.example.lang)
      examples.set(slug, exampleHtml)
    }
  }

  return { ...project, exampleHtml }
})
