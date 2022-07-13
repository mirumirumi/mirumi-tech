import secret from "@/secrets"
import { PostLink } from "@/lib/defines"
import { friendlyDatetime } from "@/lib/utils"

export default defineEventHandler(async (e) => {
  const posts = await $fetch<PostLink[]>(e.req.url!, {
    baseURL: secret.API_BASE_URL,
    headers: {
      "x-api-key": secret.API_KEY,
    },
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
