import {page} from './documents/page'
import {person} from './documents/person'
import {post} from './documents/post'
import {blockContent} from './objects/blockContent'
import {callToAction} from './objects/callToAction'
import {githubGist} from './objects/githubGist/githubGist'
import {googleAds} from './objects/googleAds/googleAds'
import {infoSection} from './objects/infoSection'
import {inlineImage} from './objects/inlineImage/inlineImage'
import {link} from './objects/link/link'

import {tags} from './objects/tags/tags'
import {youtube} from './objects/youtube/youtube'
import {settings} from './singletons/settings'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  person,
  // Objects
  inlineImage,
  githubGist,
  googleAds,
  youtube,
  link,
  tags,
  blockContent,
  infoSection,
  callToAction,
]
