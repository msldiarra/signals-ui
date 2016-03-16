import React from 'react';
import Relay from 'react-relay';
import Header from './Header';
import AuthService from './AuthService';

class AuthenticatedApp extends React.Component {

    constructor() {
        super();
        this.state = { user: JSON.parse(localStorage.getItem('user')) };
    }

    render() {
        return (
            <div>
                <Header user={this.state.user} onLogout={this.logout} />
                <div className="content">
                    <div className="container">
                        {this.props.children}
                    </div>
                </div>
            </div>);
    }

    logout(e) {
        e.preventDefault();
        AuthService.logout();
    }
}

export default Relay.createContainer(AuthenticatedApp, {
    fragments: {
        viewer: () => Relay.QL`
      fragment on User {
        tanksInAlert(first: 10) {
          edges {
            node {
              id,
              tank,
            },
          },
        },
      }
    `,
    },
});
