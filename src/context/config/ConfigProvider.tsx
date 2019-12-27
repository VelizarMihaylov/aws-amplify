import React from 'react'
import PropTypes from 'prop-types'

type ContextProps = {
  openAQUrl: string
}

export const ConfigContext = React.createContext<Partial<ContextProps>>({})

type ConfigProviderProps<P> = {
  children?: React.ReactNode
  config?: P
}

export const ConfigProvider: React.FC<ConfigProviderProps<{}>> = ({
  children,
  config
}): React.ReactElement => (
  <ConfigContext.Provider
    value={{
      openAQUrl: process.env.REACT_APP_OPENAQ_API_END_POINT,
      ...config
    }}
  >
    {children}
  </ConfigContext.Provider>
)

ConfigProvider.propTypes = {
  children: PropTypes.node,
  config: PropTypes.object
}
