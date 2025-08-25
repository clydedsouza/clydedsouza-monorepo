const fs = require('fs')
const path = require('path')

// === CONFIGURATION ===
const POSTS_DIR = path.join(__dirname, 'data', 'posts', 'test') // Adjust if needed

// The frontmatter template
const FRONTMATTER_TEMPLATE = (title, subtitle, date) => `---
title: '${title}'
subtitle: '${subtitle}'
date: '${date}'
lastmod: '${date}'
tags: ['one', 'two']
readingList: []
draft: false
summary: '${subtitle}'
images: ['/static/images/blog/powerautomate.jpg']
---

<InlineImage
  src="/static/images/blog/powerautomate.jpg"
  alt="Featured photo of a waterfall representing Microsoft Power Automate"
  caption={
    <>
      Image source: <a href="https://unsplash.com/photos/waAAaeC9hns">Unsplash</a>
    </>
  }
/>
`

const FILENAME_REGEX = /^(\d{4}-\d{2}-\d{2})_(.+)\.html\.md$/i
const SUFFIX_REGEX = /-\w{12}(?=\.mdx$)/ // matches -ab3d1a4740f6 before .mdx

fs.readdirSync(POSTS_DIR).forEach((filename) => {
  const match = filename.match(FILENAME_REGEX)
  if (!match) return

  const [, date, rest] = match
  const oldPath = path.join(POSTS_DIR, filename)

  // Remove weird alphanumeric suffix (e.g., -ab3d1a4740f6)
  let newBase = rest.toLowerCase().replace(/ /g, '-').replace(/_/g, '-').replace(/--+/g, '-')
  newBase = newBase.replace(/-\w{12}$/, '') // Remove the 12-char suffix at the end

  const newFilename = `${newBase}.mdx`
  const newPath = path.join(POSTS_DIR, newFilename)

  // Read original content
  const originalContent = fs.readFileSync(oldPath, 'utf8')

  // Extract title and subtitle from content
  // Title: first line starting with "# "
  // Subtitle: first non-empty line after the title
  const lines = originalContent.split('\n')
  let title = ''
  let subtitle = ''
  let foundTitle = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!foundTitle && line.startsWith('# ')) {
      title = line.replace(/^# /, '').replace(/'/g, "\\'")
      foundTitle = true
      continue
    }
    if (foundTitle && line.length > 0 && !subtitle) {
      subtitle = line.replace(/'/g, "\\'")
      break
    }
  }

  // Fallbacks if not found
  if (!title) title = '<TITLE>'
  if (!subtitle) subtitle = '<SUBTITLE>'

  // Remove the title and subtitle lines from the original content
  let contentStartIdx = 0
  let foundTitleIdx = -1
  let foundSubtitleIdx = -1
  for (let i = 0; i < lines.length; i++) {
    if (foundTitleIdx === -1 && lines[i].trim().startsWith('# ')) {
      foundTitleIdx = i
      continue
    }
    if (foundTitleIdx !== -1 && foundSubtitleIdx === -1 && lines[i].trim().length > 0) {
      foundSubtitleIdx = i
      break
    }
  }
  if (foundSubtitleIdx !== -1) {
    contentStartIdx = foundSubtitleIdx + 1
  } else if (foundTitleIdx !== -1) {
    contentStartIdx = foundTitleIdx + 1
  }
  const restOfContent = lines.slice(contentStartIdx).join('\n').trimStart()

  // Build new content
  const newContent = `${FRONTMATTER_TEMPLATE(title, subtitle, date)}\n${restOfContent}`

  // Write new file
  fs.writeFileSync(newPath, newContent, 'utf8')

  // Remove old file
  fs.unlinkSync(oldPath)

  console.log(`Renamed and updated: ${filename} -> ${newFilename}`)
})
