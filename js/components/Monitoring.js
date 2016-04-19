import React from 'react';
import Relay from 'react-relay';
import moment from 'moment';

moment.locale('fr');

class Monitoring extends React.Component {

    render() {

        var {monitoring} = this.props.viewer;

        return (
            <div>
                <div className="page-header">
                    <h2>Monitoring cuve en démo</h2>
                </div>
                <div>
                    <h2><small>Total des alertes envoyées : </small> {monitoring.measurecount}</h2>
                    <h2><small>Dernière alerte reçue: </small> {monitoring.latestmeasurelevel} cm <small>({moment(monitoring.latestmeasuretime).fromNow()})</small></h2>
                </div>
            </div>
        );

    }
}

export default Relay.createContainer(Monitoring, {

    fragments: {
        viewer: () => Relay.QL`
          fragment on User {
               id
               monitoring {
                 id
                 measurecount
                 latestmeasuretime
                 latestmeasurelevel
               }
          }
    `,
    }

});