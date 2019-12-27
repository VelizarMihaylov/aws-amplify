module.exports = {
  server: {
    command: `BROWSER=none PORT=3999 yarn start`,
    port: 3999,
    launchTimeout: 10000,
    debug: true
  },
  launch: {
    headless: true,
    devtools: true
  }
}
