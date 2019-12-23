export const pixelsPerRem = 16
export const gridLineHeight = 1.5
export const baseUnitSize = 1

export const gridUnits = (factor: number): number => factor * baseUnitSize

const columns = 12
const gridUnitsPerColumn = 4.5
const columnWidthInGridUnits = baseUnitSize * gridUnitsPerColumn

export const layoutWidth =
  columns * columnWidthInGridUnits + (columns + 1) * gridLineHeight

const tabletBreakpointInPx = 769

export const mobileBreakpointInPx = 415

export const mobile = (props: {}): {} => ({
  [`@media(min-width: ${mobileBreakpointInPx / pixelsPerRem}rem)`]: props
})

export const desktop = (desktopStyles: string): string => `
  @media(min-width: ${tabletBreakpointInPx / pixelsPerRem}rem) {
    ${desktopStyles}
  }
`

export const maxWidthAndUp = (props: {}): {} => ({
  [`@media(min-width: ${layoutWidth}rem)`]: props
})

export const contentContainer = {
  maxWidth: `${layoutWidth}rem`,
  ...desktop
}

export const gridWeight = (weight = 1): string => `
  flex: ${weight} 1 0;
`
