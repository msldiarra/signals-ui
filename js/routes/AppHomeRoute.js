import Relay from 'react-relay';
import React from 'react';
import { IndexRoute, Route } from 'react-router';
import AuthenticatedApp from '../components/AuthenticatedApp';
import Dashboard from '../components/Dashboard';
import Monitoring from '../components/Monitoring';
import Stations from '../components/Stations';
import StationTanks from '../components/StationTanks';
import Login from '../components/Login';

class RouteHome extends Relay.Route {
    static queries = {
        viewer: () => Relay.QL`
          query {
            viewer(userID: $userID)
          }
        `
    };

    static paramDefinitions = {
        userID: {required: true},
    };

    static routeName = 'AppHomeRoute';
}

function requireAuth(nextState, replace) {
    if(!JSON.parse(localStorage.getItem('user'))) {
        replace({
            pathname: '/login',
            state: { nextPathname: nextState.location.pathname }
        })
    }
}

function getParams(params, route){
    return {
        ...params,
        userID: JSON.parse(localStorage.getItem('user')).id
    }
}

export default  <Route>
                    <Route path="/" component={AuthenticatedApp} queries={RouteHome.queries} prepareParams={getParams} >
                        <Route path="Monitoring" component={Monitoring} queries={RouteHome.queries} prepareParams={getParams} onEnter={requireAuth} />
                        <Route path="Stations" component={Stations} queries={RouteHome.queries} prepareParams={getParams} onEnter={requireAuth} />
                        <Route path="Station" component={Stations} queries={RouteHome.queries} prepareParams={getParams} onEnter={requireAuth} />
                        <IndexRoute component={Dashboard} queries={RouteHome.queries} prepareParams={getParams} onEnter={requireAuth} />
                    </Route>
                    <Route path="login" component={Login}  />
                </Route>
