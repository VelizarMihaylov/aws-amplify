describe('Google', () => {
  beforeAll(async () => {
    await page.goto('http://localhost:3000/')
  })
  it('should be titled "Google"', async () => {
    await expect(page.title()).resolves.toMatch('React App')
    await page.waitForSelector('[data-puppet="magnifying-glass-icon"]')
  })

  it('should fill in the input', async () => {
    await page.waitForSelector('[data-puppet="magnifying-glass-icon"]', {
      visible: true
    })
    const element = await page.$('[data-puppet="search-box-input"]')
    await element.type('London', { delay: 100 })
  })
})
