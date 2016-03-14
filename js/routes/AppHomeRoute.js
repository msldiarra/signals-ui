import Relay from 'react-relay';
import React from 'react';
import { IndexRoute, Route } from 'react-router';
import AuthenticatedApp from '../components/AuthenticatedApp';
import Widgets from '../components/Widgets';
import Login from '../components/Login';

class RouteHome extends Relay.Route {
    static queries = {
        viewer: () => Relay.QL`
      query {
        viewer
      }
    `,
    };
    static routeName = 'AppHomeRoute';
}

export default  <Route path="/" component={AuthenticatedApp} queries={RouteHome.queries}>
                    <IndexRoute component={Widgets} queries={RouteHome.queries} />
                    <Route path="login" component={Login}  />
                </Route>