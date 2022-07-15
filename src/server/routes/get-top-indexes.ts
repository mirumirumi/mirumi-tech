import secret from "@/secrets"
import { ResIndexesAPI } from "@/lib/defines"

export default defineEventHandler(async (e) => {
  const data = await $fetch<ResIndexesAPI>(e.req.url!, {
    baseURL: secret.API_BASE_URL,
    headers: {
      "x-api-key": secret.API_KEY,
    },
  })

  return data
})
