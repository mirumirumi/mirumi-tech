export const SITE_FULL_PATH = "https://mirumi.tech"
export const MAIL_ADDRESS = "mail@mirumi.tech"
export const SITE_CREATED_AT = "2022-07-01T00:00:00+09:00"

export const DEBOUNCE_MS = 333

export interface PageMeta {
  title: string,
  description: string,
  keywords: string,
  thumbnail?: string,
  url: string,
  createdAt: string,
  updatedAt: string,
}

export interface PostLink {
  slug: string,
  slag?: string,
  title: string,
  created_at: string,
  updated_at: string,
}

export interface PostData {
  title: string,
  created_at: string,
  updated_at: string,
  tags: string[],
  search_tags: string[],
  body: string,
}

export interface ResIndexesAPI {
  items: PostLink[],
  count: number,
}

export interface Tag {
  tag: string,
  search_tag: string,
}
