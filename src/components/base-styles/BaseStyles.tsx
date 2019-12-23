import React from 'react'
import PropTypes from 'prop-types'

import { Global, css } from '@emotion/core'

type BaseStylesProps = {
  styles?: string
}

export const BaseStyles: React.FC<BaseStylesProps> = ({
  styles
}): React.ReactElement => (
  <Global
    styles={css`
      ${styles}
    `}
  />
)

BaseStyles.propTypes = {
  styles: PropTypes.string
}
