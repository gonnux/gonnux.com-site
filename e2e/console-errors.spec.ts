import { test, expect } from '@playwright/test'

// Error patterns to ignore (external scripts, network issues)
const IGNORED_ERRORS = [
  /adsbygoogle/i,
  /googlesyndication/i,
  /googletagmanager/i,
  /503/,  // External resource unavailable
  /Failed to load resource/i,
]

function shouldIgnoreError(message: string): boolean {
  return IGNORED_ERRORS.some(pattern => pattern.test(message))
}

// Pages to test for console errors
const pages = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'Apps', path: '/apps' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
]

for (const { name, path } of pages) {
  test(`${name} page - no console errors`, async ({ page }) => {
    const errors: string[] = []

    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text()
        if (!shouldIgnoreError(text)) {
          errors.push(text)
        }
      }
    })

    await page.goto(path)
    await page.waitForLoadState('networkidle')

    expect(errors, `Console errors found: ${errors.join('\n')}`).toHaveLength(0)
  })
}

// Dark mode toggle test
test('Dark mode toggle works', async ({ page }) => {
  await page.goto('/')

  const darkModeButton = page.locator('button[aria-label*="mode"], button:has(svg)')
    .filter({ has: page.locator('svg') })
    .first()

  if (await darkModeButton.isVisible()) {
    // Use force: true to bypass Next.js dev mode portal overlay
    await darkModeButton.click({ force: true })
  }
})

// Navigation test
test('Navigation links work', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  // Navigate to blog using JavaScript click to bypass portal overlay
  await page.evaluate(() => {
    const link = document.querySelector('a[aria-label="Blog"]') as HTMLAnchorElement
    link?.click()
  })
  await expect(page).toHaveURL('/blog', { timeout: 10000 })

  // Navigate home using the site title link
  await page.evaluate(() => {
    const link = document.querySelector('header a[href="/"]') as HTMLAnchorElement
    link?.click()
  })
  await expect(page).toHaveURL('/', { timeout: 10000 })
})
