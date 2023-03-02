import { PageMeta, SITE_CREATED_AT, SITE_FULL_PATH } from "@/utils/defines"

export default (p: PageMeta) => {
  if (!p.createdAt) {
    p.createdAt = SITE_CREATED_AT
  }

  if (!p.updatedAt) {
    p.updatedAt = today()
  }

  useSetMeta(p)

  const schema = `
{
  "@context": "https://schema.org",
  "@type": "Article",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "${p.url}"
  },
  "headline": "${p.title.replaceAll('"', "")}",
  "image": {
    "@type": "ImageObject",
    "url": "${p.thumbnail ?? "https://mirumi.tech/assets/main-visual.png"}",
    "width": 1200,
    "height": 630
  },
  "datePublished": "${p.createdAt}",
  "dateModified": "${p.updatedAt}",
  "author": {
    "@type": "Person",
    "name": "mirumi.tech",
    "url": "${SITE_FULL_PATH}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "mirumi.tech",
    "logo": {
      "@type": "ImageObject",
      "url": "https://mirumi.tech/assets/main-visual.png",
      "width": 114,
      "height": 60
    }
  },
  "description": "${p.description.replaceAll('"', "")}"
}
`

  useHead({
    script: [
      { type: "application/ld+json", children: schema }
    ]
  })
}
