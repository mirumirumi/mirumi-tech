import secret from "@/secrets/export"

export default defineEventHandler(async (e) => {
  const postCount = await $fetch<number>(e.req.url!, {
    baseURL: secret.API_BASE_URL,
    headers: {
      "x-api-key": secret.API_KEY,
    },
  })

  return postCount
})
