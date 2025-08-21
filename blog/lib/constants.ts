export const POSTS_PER_PAGE = 6
export const POSTS_PAGE_TITLE = 'All blog posts'

export const getTagPageTitle = (tag: string) =>
  tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)

export const SHOW_THEME_SELECTION = false
