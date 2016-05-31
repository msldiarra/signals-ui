import React from 'react';
import Relay from 'react-relay';
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import StationTanks from './StationTanks';


class Stations extends React.Component {

    render() {

        var stations = this.props.viewer.stations.edges.map(function(edge) {
            return <StationTanks key={edge.node.id} tanks={edge.node.tanks} name={edge.node.name} reference={edge.node.reference} />
        }.bind(this));

        return (
            <div className="padding-25">
                <ReactCSSTransitionGroup transitionName="example" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={0} transitionLeaveTimeout={0}>
                    {stations}
                </ReactCSSTransitionGroup>
            </div>
        );

    }

}

export default Relay.createContainer(Stations, {

    fragments: {
        viewer: () => Relay.QL`
          fragment on User {
               id
               stations(first: 10) {
                  edges {
                     node {
                       id
                       name
                       reference
                       customer
                       tanks(first: 10) {
                       edges {
                     node {
                          id
                          tank
                          fillingrate
                          station
                          liquidtype}}
                       }
                     }
                  }
               }
          }
    `
    }
});
