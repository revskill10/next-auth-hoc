import redirect from '../redirect'
import checkLoggedIn from '../checkLoggedIn'

const requireSignedIn = (Page, to = '/signin') => {
  return class extends React.Component {
    static async getInitialProps (context, apolloClient) {
      const { loggedInUser } = await checkLoggedIn(context.apolloClient)
  
      if (!loggedInUser.user) {
        // If not signed in, send them somewhere more useful
        redirect(context, to)
      }
  
      return { loggedInUser }
    }

    render() {
      return <Page {...this.props}/>
    }
  }
}

export default requireSignedIn