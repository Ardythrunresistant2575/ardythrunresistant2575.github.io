export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' })
  }

  const project = await getProject(slug)

  if (!project) {
    throw createError({ statusCode: 404, statusMessage: 'No such project' })
  }

  return project
})
