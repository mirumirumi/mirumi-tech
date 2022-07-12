import secret from "@/secrets/export"

export default defineEventHandler(async (event) => {
  const postCount = await $fetch<number>(`get-post-count`, {
    baseURL: secret.API_BASE_URL,
    headers: {
      "x-api-key": secret.API_KEY,
    },
  })

  return postCount
})
