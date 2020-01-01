import React from 'react'
import PropTypes from 'prop-types'

import styled from '@emotion/styled'

import { gridWeight } from 'mixins'

type GridColumnProps = {
  children?: React.ReactNode
  gridWeight?: number
}

const StyledGridColumn = styled.div<GridColumnProps>`
  ${(props: GridColumnProps): string => gridWeight(props.gridWeight)}
`

export const GridColumn: React.FC<GridColumnProps> = ({
  children,
  gridWeight
}) => {
  return <StyledGridColumn gridWeight={gridWeight}>{children}</StyledGridColumn>
}

GridColumn.defaultProps = {
  gridWeight: 1
}

GridColumn.defaultProps = {
  gridWeight: 1
}

GridColumn.propTypes = {
  children: PropTypes.node,
  gridWeight: PropTypes.number.isRequired
}
