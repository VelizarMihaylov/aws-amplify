import React from 'react'
import PropTypes from 'prop-types'

import { Global, css } from '@emotion/core'
import { normalize, baseTypography } from 'mixins'

type BaseStylesProps = {
  styles?: string
}

export const BaseStyles: React.FC<BaseStylesProps> = ({
  styles
}): React.ReactElement => (
  <Global
    styles={css`
    ${normalize}
    ${baseTypography}
    ${styles || ''}
    `}
  />
)

BaseStyles.propTypes = {
  styles: PropTypes.string
}
