import secret from "@/secrets"
import { PostLink } from "@/lib/defines"

export default defineEventHandler(async (e) => {
  const posts = await $fetch<PostLink[]>(e.req.url!, {
    baseURL: secret.API_BASE_URL,
    headers: {
      "x-api-key": secret.API_KEY,
    },
  })

  return posts
})
