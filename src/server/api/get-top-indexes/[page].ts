import { PostLink } from "@/lib/defines"
import { friendlyDatetime } from "@/lib/utils"

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  const post = await $fetch<PostLink[]>(`get-top-indexes`, {
    baseURL: config.baseURL,
    headers: {
      "x-api-key": config.key,
    },
    params: {
      page: event.context.params.page,
    },  // no cacheable ...?
  })

  return transform(post)
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
