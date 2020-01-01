import { gridLineHeight, mobileBreakpointInPx } from './baseline-grid'
import { colours } from './colours'

// Perfect fourth scale http://www.modularscale.com/?1&em&1.333
type fontSizeToScale = {
  [key: string]: number
}

const fontSizeToScale: fontSizeToScale = {
  '-1': 0.75,
  '0': 1,
  '1': 1.777,
  '2': 1.333
}

export const fontStack = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

export const fontSizeForScale = (scale: number): number =>
  fontSizeToScale[scale.toString()] || fontSizeToScale[0]

export const fitToBaselineGrid = (scale: number): string => {
  const fontSize = fontSizeForScale(scale)
  return `
    font-size: ${fontSize}rem;
    line-height:${gridLineHeight}em;
    margin: 0 0 ${gridLineHeight}rem 0;
  `
}

export const bold = 600
export const regular = 400

export const baseTypography = `
  html {
    font-size: 75%;
    @media (min-width: ${mobileBreakpointInPx}px) {
        font-size: 100%;
      }
  }

  body {
    color: ${colours.blue};
    ${fontStack}
    ${fitToBaselineGrid(0)}
    margin-bottom: 0px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    font-kerning: normal;
    hyphens: manual;
    -moz-font-feature-settings: "kern", "liga", "clig", "calt";
    -ms-font-feature-settings: "kern", "liga", "clig", "calt";
    -webkit-font-feature-settings: "kern", "liga", "clig", "calt";
    font-feature-settings: "kern", "liga", "clig", "calt";  
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${colours.blue};
    ${fontStack}
    text-rendering: optimizeLegibility;
    font-weight: unset;
  }

  h1 {
    ${fitToBaselineGrid(1)}    
  }

  h2 {
    ${fitToBaselineGrid(2)}    
  }

  ul, ol {
    padding-left: 0;
    margin: 0;
  }

  a {
    color: ${colours.purple};    
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }
`
