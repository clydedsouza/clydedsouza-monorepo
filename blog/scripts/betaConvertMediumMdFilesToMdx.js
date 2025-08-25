const fs = require('fs')
const path = require('path')

// === CONFIGURATION ===
const POSTS_DIR = path.join(__dirname, 'data', 'posts', 'test') // Adjust if needed

// The frontmatter template (replace with your actual values as needed)
const FRONTMATTER_TEMPLATE = (date) => `---
title: '<TITLE>'
subtitle: '<SUBTITLE>'
date: '${date}'
lastmod: '${date}'
tags: ['one', 'two']
readingList: []
draft: false
summary: '<SUBTITLE>'
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

fs.readdirSync(POSTS_DIR).forEach((filename) => {
  const match = filename.match(FILENAME_REGEX)
  if (!match) return

  const [, date, rest] = match
  const oldPath = path.join(POSTS_DIR, filename)

  // New filename: remove date prefix, lowercase, change extension
  const newBase = rest.toLowerCase().replace(/ /g, '-').replace(/_/g, '-').replace(/--+/g, '-')
  const newFilename = `${newBase.replace(/\.md$/, '')}.mdx`
  const newPath = path.join(POSTS_DIR, newFilename)

  // Read original content
  const originalContent = fs.readFileSync(oldPath, 'utf8')

  // Build new content
  const newContent = `${FRONTMATTER_TEMPLATE(date)}\n${originalContent}`

  // Write new file
  fs.writeFileSync(newPath, newContent, 'utf8')

  // Remove old file
  fs.unlinkSync(oldPath)

  console.log(`Renamed and updated: ${filename} -> ${newFilename}`)
})
