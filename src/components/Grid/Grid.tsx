import React from 'react'
import PropTypes from 'prop-types'

import styled from '@emotion/styled'

import { desktop } from 'mixins'

const StyledGrid = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-flow: column wrap;
  ${desktop(`
  flex-flow: row wrap;
  `)}
`

type GridProps = {
  children?: React.ReactNode
}

export const Grid: React.FC<GridProps> = ({ children }) => {
  return <StyledGrid>{children}</StyledGrid>
}

Grid.propTypes = {
  children: PropTypes.node
}
