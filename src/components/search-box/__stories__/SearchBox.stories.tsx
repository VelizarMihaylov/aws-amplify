import React from 'react'
import store from 'state'
import { SearchBox } from 'components'
import { Provider } from 'react-redux'
import { BaseStyles } from 'components/base-styles'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from 'graph-ql'
import { storiesOf } from '@storybook/react'

const SearchBoxStory = (): React.ReactElement => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BaseStyles />
      <SearchBox />
    </ApolloProvider>
  </Provider>
)

storiesOf('SearchBox', module).add('Search Box Story', SearchBoxStory, {
  info: {
    inline: false,
    propTables: [SearchBox],
    text: `
          description or documentation about the SearchBox component:

          ~~~js
          <SearchBox />
          ~~~
        `
  }
})
