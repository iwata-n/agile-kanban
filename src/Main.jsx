import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import AppRoutes from './Routes';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

ReactDOM.render(
  <Router history={appHistory} onUpdate={() => window.scrollTo(0, 0)}>
    {AppRoutes}
  </Router>
, document.getElementById('main'));