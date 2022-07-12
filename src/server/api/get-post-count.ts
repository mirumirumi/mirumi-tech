import dev from "@/secrets/secret.dev"
import prd from "@/secrets/secret.prd"
const secret = process.env.NODE_ENV === "development" ? dev : prd

export default defineEventHandler(async (event) => {
  const postCount = await $fetch<number>(`get-post-count`, {
    baseURL: secret.API_BASE_URL,
    headers: {
      "x-api-key": secret.API_KEY,
    },
  })

  return postCount
})
