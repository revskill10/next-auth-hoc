# Authentication HOCs for Next.js

This library provides simple high order components (HOC) to work with JWT Authentication universally.

You'll need a GraphQL Server to work with.

## Install

```
yarn add next-auth-hoc
```

## API


- `withSignout` : Provide `signout` function for a component to signout
- `redirect` : Provide `redirect` function to redirect to another route
- `withApollo` : Provide `apolloClient` to work with GraphQL Query
- `requireSignedIn` : Require authentication before rendering
- `redirectIfSignedIn` : Redirect if a user is already signed in


Your `pages/_app.js` should provide component like this:


```js
import App, { Container } from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { withApollo } from 'next-auth-hoc'

class MyApp extends App {
  render () {
    const { Component, pageProps, apolloClient } = this.props
    return <Container>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Container>
  }
}

export default withApollo(MyApp)

```

## Example

`signin.js`

```js
import React from 'react'
import Link from 'next/link'
import SigninBox from '../components/SigninBox'
import { redirectIfSignedIn } from 'next-auth-hoc'

const Signin = () => 
  <React.Fragment>
    <SigninBox />
    <hr />
    New? <Link prefetch href='/create-account'><a>Create account</a></Link>
  </React.Fragment>

export default redirectIfSignedIn(Signin)
```

# License

MIT
