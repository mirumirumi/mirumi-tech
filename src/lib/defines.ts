// constants and typings

export const SITE_FULL_PATH = "https://mirumi.tech"
export const SITE_CREATED_AT = "2022/7/1"

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
  slag: string,
  title: string,
  createdAt: string,
  updatedAt: string,
}

export interface PostData {
  title: string,
  createdAt: string,
  updatedAt: string,
  tags: string[],
  html: string,
}
