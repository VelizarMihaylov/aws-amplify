import React from 'react'
import store from 'state'
import { ListLocations } from 'components'
import { Provider } from 'react-redux'
import { BaseStyles } from 'components/base-styles'
import { ApolloProvider } from '@apollo/react-hooks'
import { client } from 'graph-ql'
import { withKnobs, select } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'

const ListLocationsStory = (): React.ReactElement => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BaseStyles />
      <ListLocations
        city={select(
          'City',
          ['Manchester', 'London', 'Birmingham'],
          'Manchester'
        )}
      />
    </ApolloProvider>
  </Provider>
)

storiesOf('List Locations', module).add(
  'List Locations Story',
  ListLocationsStory,
  {
    decorators: [withKnobs],
    info: {
      inline: false,
      propTables: [ListLocations],
      text: `
          description or documentation about the ListLocations component:

          ~~~js
          <ListLocations city={city} />
          ~~~
        `
    }
  }
)
