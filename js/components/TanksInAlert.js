import React from 'react';
import Relay from 'react-relay';
import AlertBar from './AlertBar'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class TanksInAlert extends React.Component {

    render() {
        var bars = this.props.tanks.tanksInAlert.edges.map(function(edge){
            return <AlertBar key={edge.node.id} tank={edge.node} />

        })

        return (
            <div className="padding-25">
                <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                    {bars}
                </ReactCSSTransitionGroup>
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
                  fillingrate,
                  station,
                  liquidtype
                },
              },
            },
          }
    `,
    },
});