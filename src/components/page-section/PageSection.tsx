import React from 'react'
import PropTypes from 'prop-types'

import styled from '@emotion/styled'

import { ContentWrapper } from 'components/content-wrapper'
import { gridUnits } from 'mixins'

type PageSectionProps = {
  children?: React.ReactNode
}

const StyledPageSection = styled.section`
  margin-bottom: ${gridUnits(1.5)}rem;
`

export const PageSection: React.FC<PageSectionProps> = ({ children }) => {
  return (
    <StyledPageSection>
      <ContentWrapper>{children}</ContentWrapper>
    </StyledPageSection>
  )
}

PageSection.propTypes = {
  children: PropTypes.node
}
