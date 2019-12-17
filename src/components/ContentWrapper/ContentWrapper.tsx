import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import { layoutWidth } from 'mixin'

type ContentWrapperProps = {
  children?: React.ReactNode
}

const StyledContentWrapper = styled.div`
  margin: 0 auto;
  max-width: ${layoutWidth}rem;
`

export const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  return <StyledContentWrapper>{children}</StyledContentWrapper>
}

ContentWrapper.propTypes = {
  children: PropTypes.node
}
