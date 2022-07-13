import secret from "@/secrets"
import { PostData } from "@/lib/defines"
import { friendlyDatetime } from "@/lib/utils"

export default defineEventHandler(async (e) => {
  const post = await $fetch<PostData>(e.req.url!, {
    baseURL: secret.API_BASE_URL,
    headers: {
      "x-api-key": secret.API_KEY,
    },
  })

  return transform(post)
})

function transform(post: PostData): PostData {
  return {
    title: post.title,
    created_at: friendlyDatetime(post.created_at),
    updated_at: friendlyDatetime(post.updated_at),
    tags: post.tags,
    body: post.body,
  }
}
