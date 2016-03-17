import React from 'react';
import Relay from 'react-relay';
import AlertBar from './AlertBar'

class TanksInAlert extends React.Component {

    render() {
        var bars = this.props.tanks.tanksInAlert.edges.map(function(edge){
            return <AlertBar key={edge.node.id} tank={edge.node} />

        })

        return (
            <div className="padding-25">
                {bars}
            </div>
        );
    }
}

export default Relay.createContainer(TanksInAlert, {
    fragments: {
        tanks: () => Relay.QL`
          fragment on User {
            tanksInAlert(first: 10) {
              edges {
                node {
                  id,
                  tank,
                  fillingRate,
                  station,
                  liquidType
                },
              },
            },
          }
    `,
    },
});