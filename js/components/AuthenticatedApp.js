import React from 'react';
import Relay from 'react-relay';
import Header from './Header';
import AuthService from './AuthService';

class AuthenticatedApp extends React.Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor() {
        super();
        this.state = {user: JSON.parse(localStorage.getItem('user'))};
    }

    render() {

        return (
            <div>
                <Header user={this.state.user} onLogout={this.logout.bind(this)}/>
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
        this.context.router.replace('login')
    }

}

export default Relay.createContainer(AuthenticatedApp, {
    fragments: {
        viewer: () => Relay.QL`
            fragment on User {
                company
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
