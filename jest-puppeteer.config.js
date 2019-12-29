module.exports = {
  server: {
    command: `REACT_APP_PUPPETEER=true BROWSER=none PORT=3999 yarn start`,
    port: 3999,
    launchTimeout: 10000,
    debug: true
  },
  launch: {
    args: ['--disable-web-security'],
    headless: true,
    devtools: true
  }
}
