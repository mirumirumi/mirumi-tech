import secret from "@/secrets/export"

export default defineEventHandler(async (e) => {
  const posts = await $fetch<string[]>(e.req.url!, {
    baseURL: secret.API_BASE_URL,
    headers: {
      "x-api-key": secret.API_KEY,
    },
  })

  return posts
})
