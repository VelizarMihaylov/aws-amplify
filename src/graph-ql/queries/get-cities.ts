import gql from 'graphql-tag'

export const GET_CITIES = gql`
  {
    cities(country: "gb") {
      name
    }
  }
`
