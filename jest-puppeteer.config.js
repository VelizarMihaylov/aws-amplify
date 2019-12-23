module.exports = {
  server: {
    command: `BROWSER=none yarn start`,
    port: 3000,
    launchTimeout: 10000,
    debug: true
  },
  launch: {
    headless: false
  }
}
