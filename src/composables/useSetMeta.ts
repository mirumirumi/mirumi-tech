import { PageMeta } from "@/lib/defines"

export default ({ type, pageMeta }: { type?: "slag" | "tag", pageMeta?: PageMeta }) => {
  switch (type) {
    case "slag":
      slag()
      break
    case "tag":
      tag()
      break
    case undefined:
      direct(pageMeta!)
      break
  }
}

async function slag(): Promise<void> {
  // const res = $fetch()

  const pageMeta: PageMeta = {
    title: "title",
    description: "description",
    keywords: "keywords",
    url: "url",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }

  set(pageMeta)
}

async function tag(): Promise<void> {


  const pageMeta: PageMeta = {
    title: "title",
    description: "description",
    keywords: "keywords",
    url: "url",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }

  set(pageMeta)
}

function direct(pageMeta: PageMeta): void {
  set(pageMeta)
}

function set(pageMeta: PageMeta): void {
  useHead({
    title: "mirumi.tech",
    titleTemplate: (title) => {
      if (pageMeta && title !== pageMeta.title) return `${pageMeta.title} | ${title}`
      else return title
    },
    meta: [
      { name: "description", content: pageMeta.description },
      { name: "keywords", content: pageMeta.keywords },
      { property: "article:published_time", content: pageMeta.createdAt },
      { property: "article:modified_time", content: pageMeta.updatedAt },
      { property: "og:description", content: pageMeta.description },
      { property: "og:title", content: pageMeta.title },
      { property: "og:url", content: pageMeta.url },
      { property: "twitter:title", content: pageMeta.title },
      { property: "twitter:url", content: pageMeta.url },
      { property: "twitter:description", content: pageMeta.description },
    ],
    link: [
      { rel: "canonical", href: pageMeta.url },
    ],
  })
}
