import React from 'react'
import store from 'state'
import { LocationCard } from 'components/location-card/LocationCard'
import { Provider } from 'react-redux'
import { BaseStyles } from 'components/base-styles'
import { storiesOf } from '@storybook/react'

const measurements = [
  {
    parameter: 'pm25',
    value: 10,
    unit: 'µg/m³'
  },
  {
    parameter: 'so2',
    value: 11,
    unit: 'µg/m³'
  },
  {
    parameter: 'no2',
    value: 22,
    unit: 'µg/m³'
  },
  {
    parameter: 'o3',
    value: 17,
    unit: 'µg/m³'
  }
]

const LocationCardStory = (): React.ReactElement => (
  <Provider store={store}>
    <BaseStyles />
    <LocationCard
      city="Manchester"
      location="Manchester Piccadilly"
      measurements={measurements}
      lastUpdated="2019-12-28T08:00:00.000Z"
    />
  </Provider>
)
storiesOf('Location Card', module).add(
  'Location Card Story',
  LocationCardStory,
  {
    info: {
      inline: false,
      propTables: [LocationCard],
      text: `
          description or documentation about the LocationCard component:

          ~~~js
          <LocationCard
            city={city}
            location={city}
            measurements={measurements}
            lastUpdated={lastUpdated}
          />
          ~~~
        `
    }
  }
)
