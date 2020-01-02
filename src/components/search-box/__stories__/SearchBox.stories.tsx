import React from 'react'
import store from 'state'
import { SearchBox } from 'components'
import { Provider } from 'react-redux'
import { BaseStyles } from 'components/base-styles'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from 'graph-ql'
import { storiesOf } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'

const SearchBoxStory = (): React.ReactElement => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BaseStyles />
      <SearchBox />
    </ApolloProvider>
  </Provider>
)

storiesOf('SearchBox', module).add('Search Box Story', SearchBoxStory, {
  decorators: [withA11y],
  info: {
    inline: false,
    text: `
          description or documentation about the SearchBox component:

          ~~~js
          <SearchBox />
          ~~~
        `
  }
})
