import redirect from '../redirect'
import checkLoggedIn from '../checkLoggedIn'

const redirectIfSignedIn = (Page, to = '/') => {
  return class extends React.Component {
    static async getInitialProps(context) {
      //if(Page.getInitialProps)
      //    return Page.getInitialProps(ctx);
      const { loggedInUser } = await checkLoggedIn(context.apolloClient)
  
      if (loggedInUser.user) {
        // Already signed in? No need to continue.
        // Throw them back to the main page
        redirect(context, to)
      }
  
      return {}
    }
    render() {
      return <Page {...this.props}/>
    }
  }
}

export default redirectIfSignedIn