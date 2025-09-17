/**
 * This script slugifies the tags and reading list values for each post frontmatter
 * This will also format the frontmatter using a library called gray-matter
 */

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const POSTS_DIR = path.join(__dirname, 'data', 'posts') // Adjust as needed
const UPDATE_READING_LIST = true // Set to true to process readingList

function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, '-')
}

fs.readdirSync(POSTS_DIR)
  .filter((f) => f.endsWith('.mdx'))
  .forEach((filename) => {
    const filePath = path.join(POSTS_DIR, filename)
    const raw = fs.readFileSync(filePath, 'utf8')
    const parsed = matter(raw)

    let changed = false

    // Process tags
    if (Array.isArray(parsed.data.tags)) {
      const newTags = parsed.data.tags.map((tag) => slugify(tag))
      if (JSON.stringify(newTags) !== JSON.stringify(parsed.data.tags)) {
        parsed.data.tags = newTags
        changed = true
      }
    }

    // Process readingList if enabled
    if (UPDATE_READING_LIST && Array.isArray(parsed.data.readingList)) {
      const newList = parsed.data.readingList.map((item) => slugify(item))
      if (JSON.stringify(newList) !== JSON.stringify(parsed.data.readingList)) {
        parsed.data.readingList = newList
        changed = true
      }
    }

    if (changed) {
      const newContent = matter.stringify(parsed.content, parsed.data)
      fs.writeFileSync(filePath, newContent, 'utf8')
      console.log(`Updated: ${filename}`)
    }
  })

console.log('Done!')
