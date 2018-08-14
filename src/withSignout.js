import redirect from './redirect'
import cookie from 'cookie'

const signout = (apolloClient, to = '/signin') => () => {
  document.cookie = cookie.serialize('token', '', {
    maxAge: -1 // Expire the cookie immediately
  })

  // Force a reload of all the current queries now that the user is
  // logged in, so we don't accidentally leave any state around.
  apolloClient.cache.reset().then(() => {
    // Redirect to a more useful page when signed out
    redirect({}, to)
  })
}

const withSignout = signout => Page => {
  return class extends React.Component {
    static async getInitialProps(ctx) {
      return {
        ...(Page.getInitialProps ? await Page.getInitialProps(ctx) : null)
      }
    }
    render() {
      return <Page {...this.props} signout={signout}/>
    }
  }
}

export default withSignout(signout)