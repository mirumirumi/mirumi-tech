import secret from "@/secrets/export"
import { PostLink } from "@/lib/defines"
import { friendlyDatetime } from "@/lib/utils"

export default defineEventHandler(async (event) => {
  const posts = await $fetch<PostLink[]>(`get-top-indexes`, {
    baseURL: secret.API_BASE_URL,
    headers: {
      "x-api-key": secret.API_KEY,
    },
    params: {
      page: event.context.params.page,
    },  // no cacheable ...?
  })

  return transform(posts)
})

function transform(posts: PostLink[]): PostLink[] {
  return posts.map((post) => {
    return {
      slag: post.slag,
      title: post.title,
      created_at: friendlyDatetime(post.created_at),
      updated_at: friendlyDatetime(post.updated_at),
    }
  })
}
