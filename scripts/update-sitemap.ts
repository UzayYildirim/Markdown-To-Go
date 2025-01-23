import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml')
const currentDate = new Date().toISOString().split('T')[0]

let sitemap = readFileSync(sitemapPath, 'utf-8')
sitemap = sitemap.replace(/<lastmod>.*?<\/lastmod>/g, `<lastmod>${currentDate}</lastmod>`)

writeFileSync(sitemapPath, sitemap)
console.log(`Updated sitemap lastmod dates to ${currentDate}`) 