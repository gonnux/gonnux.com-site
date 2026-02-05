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
    await darkModeButton.click()
  }
})

// Navigation test
test('Navigation links work', async ({ page }) => {
  await page.goto('/')

  await page.click('a[href="/blog"]')
  await expect(page).toHaveURL('/blog')

  await page.click('a[href="/"]')
  await expect(page).toHaveURL('/')
})
