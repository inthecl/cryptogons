import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink, createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import App from './App'

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql'
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  const refreshToken = localStorage.getItem('refreshToken')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      token: token ? `Bearer ${token}` : '',
      refreshToken: refreshToken ? `Bearer ${refreshToken}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
