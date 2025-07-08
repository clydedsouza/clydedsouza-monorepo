import { defineQuery } from "next-sanity";

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`);

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  tags[]->{_id, title, slug},
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`;

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`;

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`;

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`);

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`);

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`);

// This query is used to fetch the latest 10 posts for the homepage
export const latestTenPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc)[0...10] {
    ${postFields}
  }
`);

// This query is used to fetch the latest 10 posts for the homepage
export const latestTenReadingListsQuery = defineQuery(`
  *[_type == "readingList" && defined(slug.current)] | order(date asc)[0...10] {
    _id,
    title,
    excerpt,
    "slug": slug.current,
    posts[]->{
      _id,
      "title": coalesce(title, "Untitled"),
      "slug": slug.current,
      excerpt,
      coverImage,
      tags[]->{_id, title, slug},
      "date": coalesce(date, _updatedAt),
      "author": author->{firstName, lastName, picture},
    },
  }
`);

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`);

export const postsByTagQuery = defineQuery(`
  *[_type == "post" && references(*[_type=="tag" && slug.current == $tagSlug]._id)]{
  ${postFields}
  }
`);

export const allTagsQuery = defineQuery(`
  *[_type == "tag"] | order(title asc) {
    _id,
    title,
    slug
  }
`);

export const topTagsQuery = defineQuery(`
  *[_type == "tag"] {
    _id,
    title,
    slug,
    "postCount": count(*[_type == "post" && references(^._id)])
  } | order(postCount desc)[0...10]
`);

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`);

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`);

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`);
