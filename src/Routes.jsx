import React from 'react';
import {
  Route,
  Redirect,
  IndexRoute,
} from 'react-router';

import Master from './components/Master';
import Dashboard from './components/Dashboard/page';

const AppRoutes = (
  <Route path="/" component={Master}>
    <IndexRoute component={Dashboard}/>
  </Route>
);

export default AppRoutes;