import React from 'react';
import Relay from 'react-relay';
import AuthenticatedComponent from './AuthenticatedComponent';
import TanksInAlert  from './TanksInAlert'

class Dashboard extends React.Component {

    render() {
        return (
            <div>
                <div className="page-header">
                    <h2>Cuves en alerte</h2>
                </div>
                <TanksInAlert tanks={this.props.viewer} />
            </div>
        );
    }
}

export default Relay.createContainer(Dashboard, {

    fragments: {
        viewer: () => Relay.QL`
          fragment on User {
               id
               ${TanksInAlert.getFragment('tanks')}
          }
    `,
    }

});