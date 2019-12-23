import React from 'react'

import { normalize, baseTypography } from 'mixins'
import { BaseStyles } from 'components'
import { AirQuality } from 'pages'

const App: React.FC = () => {
  return (
    <>
      <BaseStyles
        styles={`
      ${normalize}
      ${baseTypography}
    `}
      />
      <AirQuality />
    </>
  )
}

export default App
