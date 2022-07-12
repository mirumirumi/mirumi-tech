import secret from "@/secrets/export"
import { PostData } from "@/lib/defines"
import { friendlyDatetime } from "@/lib/utils"

export default defineEventHandler(async (event) => {
  const post = await $fetch<PostData>(`get-post`, {
    baseURL: secret.API_BASE_URL,
    headers: {
      "x-api-key": secret.API_KEY,
    },
    params: {
      slag: event.context.params.slag,
    },  // no cacheable ...?
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
