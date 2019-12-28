import ApolloClient, { InMemoryCache } from 'apollo-boost'

export const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  cache: new InMemoryCache()
})
