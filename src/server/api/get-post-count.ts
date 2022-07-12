const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const postCount = await $fetch<number>(`get-post-count`, {
    baseURL: config.baseURL,
    headers: {
      "x-api-key": config.key,
    },
  })

  return postCount
})
