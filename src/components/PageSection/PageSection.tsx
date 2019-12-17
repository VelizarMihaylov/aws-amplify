import React from 'react'
import PropTypes from 'prop-types'

import styled from '@emotion/styled'

import { ContentWrapper } from 'components/ContentWrapper'
import { gridUnits } from 'mixin'

type ContentWrapperProps = {
  children?: React.ReactNode
}

const StyledPageSection = styled.section`
  margin-bottom: ${gridUnits(1.5)}rem;
`

export const PageSection: React.FC<ContentWrapperProps> = ({ children }) => {
  return (
    <StyledPageSection>
      <ContentWrapper>{children}</ContentWrapper>
    </StyledPageSection>
  )
}

PageSection.propTypes = {
  children: PropTypes.node
}
