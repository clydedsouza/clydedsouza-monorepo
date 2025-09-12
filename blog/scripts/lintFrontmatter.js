/**
 * This script will format the frontmatter using a library called gray-matter
 */

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const POSTS_DIR = path.join(__dirname, '..', 'data', 'posts') // Adjust as needed
console.log(`Parent directory: ${POSTS_DIR}`)

fs.readdirSync(POSTS_DIR)
  .filter((f) => f.endsWith('.mdx'))
  .forEach((filename) => {
    const filePath = path.join(POSTS_DIR, filename)
    const raw = fs.readFileSync(filePath, 'utf8')
    const parsed = matter(raw)
    const newContent = matter.stringify(parsed.content, parsed.data)
    fs.writeFileSync(filePath, newContent, 'utf8')
    console.log(`Updated: ${filename}`)
  })

console.log('Done!')
