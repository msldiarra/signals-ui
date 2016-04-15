import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { RelayRouter } from 'react-router-relay';
import { useRouterHistory } from 'react-router'
import { createHashHistory } from 'history'
import routes from './routes/AppHomeRoute'

//localStorage.setItem('user', JSON.stringify({login:'fake', company:'test company'}));

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

ReactDOM.render(<RelayRouter history={appHistory} routes={routes} />, document.getElementById('root'))