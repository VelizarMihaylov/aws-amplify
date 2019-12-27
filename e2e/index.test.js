import { toMatchImageSnapshot } from 'jest-image-snapshot'

describe('Google', () => {
  beforeAll(async () => {
    await page.goto(`${process.env.INTEGRATION_TEST_URL}`)
    expect.extend({ toMatchImageSnapshot })
  })
  it('should load', async () => {
    await expect(page.title()).resolves.toMatch('React App')
  })

  it('should populate the input box with selected city ', async () => {
    await page.waitForSelector('[data-puppet="magnifying-glass-icon"]', {
      visible: true
    })
    const searchInput = await page.$('[data-puppet="search-box-input"]')
    await searchInput.type('lo', { delay: 100 })
    const searchListElements = await page.$$(
      '[data-puppet="search-box-list-element"]'
    )
    // Take screenshot
    const image = await page.screenshot()
    expect(image).toMatchImageSnapshot()
    // Continue
    await searchListElements[1].click()
    const value = await (await searchInput.getProperty('value')).jsonValue()
    expect(value).toBe('Lough Navar')
  })
})
