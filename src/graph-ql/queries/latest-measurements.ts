import gql from 'graphql-tag'

export const LATEST_MEASUREMENTS = gql`
  query Location($city: String!) {
    latestMeasurements(country: "gb", city: $city) {
      location
      lastUpdated
      measurements {
        parameter
        value
        unit
      }
    }
  }
`
