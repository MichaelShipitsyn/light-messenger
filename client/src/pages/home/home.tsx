import { createRouteView, Link } from 'atomic-router-react';
import { chainAuthorized, routes } from '@lm-client/shared/routes';
import { Header } from '@lm-client/widgets/header';

export const authorizedHome = chainAuthorized(routes.home);

export const HomePage = createRouteView({
  route: authorizedHome,
  view() {
    return (
      <>
        <Header />
        <Link to={routes.signIn} className="text-14 text-blue hover:underline">
          Auth page
        </Link>
      </>
    );
  },
  otherwise() {
    return <div>Loading...</div>;
  },
});
