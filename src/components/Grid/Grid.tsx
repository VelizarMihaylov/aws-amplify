import React from 'react'
import PropTypes from 'prop-types'

import styled from '@emotion/styled'

import { desktop } from 'mixin'

type GridProps = {
  children?: React.ReactNode
}

const StyledGrid = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-flow: column wrap;
  ${desktop(`
  flex-flow: row wrap;
  &:first-child {
      margin-left: 1.5rem;
  }
  &:last-child {
      margin-right: 1.5rem;
  }
  `)}
`

export const Grid: React.FC<GridProps> = ({ children }) => {
  return <StyledGrid>{children}</StyledGrid>
}

Grid.propTypes = {
  children: PropTypes.node
}
