/**
 * This script downloads images from the Medium CDN endpoint from each blog post
 */

const fs = require('fs')
const path = require('path')
const { https } = require('follow-redirects') // Use follow-redirects for 301/302
const POSTS_DIR = path.join(__dirname, 'data', 'posts')
const IMAGES_DIR = path.join(__dirname, 'images')

if (!fs.existsSync(IMAGES_DIR)) {
  fs.mkdirSync(IMAGES_DIR, { recursive: true })
}

// Resolutions available: 1200/800/400
const IMAGE_URL_REGEX = /https:\/\/cdn-images-1\.medium\.com\/max\/400\/([^\s'")\]\}]+)/g

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function downloadImage(url, dest, retries = 3, delay = 2000) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ImageDownloader/1.0)',
      },
    }
    https
      .get(url, options, (response) => {
        if (response.statusCode === 200) {
          response.pipe(file)
          file.on('finish', () => file.close(resolve))
        } else if (response.statusCode === 429 && retries > 0) {
          // Too many requests, wait and retry
          file.close()
          fs.unlink(dest, () => {})
          setTimeout(() => {
            downloadImage(url, dest, retries - 1, delay * 2)
              .then(resolve)
              .catch(reject)
          }, delay)
        } else {
          file.close()
          fs.unlink(dest, () => {})
          reject(new Error(`Failed to get '${url}' (${response.statusCode})`))
        }
      })
      .on('error', (err) => {
        file.close()
        fs.unlink(dest, () => {})
        reject(err)
      })
  })
}

async function processFiles() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'))
  const imageTasks = []

  for (const file of files) {
    const filePath = path.join(POSTS_DIR, file)
    let content = fs.readFileSync(filePath, 'utf8')
    let match

    while ((match = IMAGE_URL_REGEX.exec(content)) !== null) {
      const imageName = match[1]
      const newUrl = `https://cdn-images-1.medium.com/${imageName}`
      const safeImageName = imageName.replace(/[*?"<>|:/\\]/g, '_')
      const destPath = path.join(IMAGES_DIR, safeImageName)

      if (!fs.existsSync(destPath)) {
        imageTasks.push({ url: newUrl, dest: destPath, name: safeImageName })
      }
    }
  }

  // Sequential download with delay
  for (const task of imageTasks) {
    try {
      await downloadImage(task.url, task.dest)
      console.log(`Downloaded: ${task.name}`)
    } catch (err) {
      console.error(`Failed: ${task.name} (${task.url})`, err.message)
    }
    await sleep(2000) // 2 seconds delay between downloads
  }

  console.log('All done!')
}

processFiles()
