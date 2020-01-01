import { configure, addDecorator, addParameters } from "@storybook/react"
import { withInfo } from "@storybook/addon-info"
import { themes } from '@storybook/theming'

// Add custom view ports 
// const newViewports = {
//   kindleFire2: {
//     name: 'Kindle Fire 2',
//     styles: {
//       width: '600px',
//       height: '963px',
//     },
//   },
//   kindleFireHD: {
//     name: 'Kindle Fire HD',
//     styles: {
//       width: '533px',
//       height: '801px',
//     },
//   },
// };

function loadStories() {
  const allExports = []
  const req = require.context('../src/components', true, /\.stories\.tsx$/)
  req.keys().forEach(fileName => allExports.push(req(fileName)))
  return allExports
}

addDecorator(withInfo({
  source: false
}))
addParameters({
  options: {
    theme: themes.light
  },
  info: {
    inline: true
  }
  // Custom View Ports Addon Settings
  // viewport: {
  //   name: 'Desktop',
  //   viewports: newViewports, // newViewports would be an ViewportMap. (see below for examples)
  //   defaultViewport: 'kindleFire2',
  // },
})

configure(loadStories, module)