import './index.css';

import { createHistoryRouter } from 'atomic-router';
import { createBrowserHistory } from 'history';
import { RouterProvider } from 'atomic-router-react';
import { Pages, routesMap } from '@lm-client/pages';

const router = createHistoryRouter({
  routes: routesMap,
});
const history = createBrowserHistory();

router.setHistory(history);

export const App = () => {
  return (
    <RouterProvider router={router}>
      <Pages />
    </RouterProvider>
  );
};
