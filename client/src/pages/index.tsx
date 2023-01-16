import { createRoutesView } from 'atomic-router-react';
import { routes } from '@lm-client/shared/routes';
import { SignInPage, SignUpPage } from './auth';
import { HomePage } from './home';
import { AuthLayout, MainLayout } from '@lm-client/shared/ui';

export const routesMap = [
  {
    path: '/',
    route: routes.home,
  },
  {
    path: '/auth/sign-up',
    route: routes.signUp,
  },
  {
    path: '/auth/sign-in',
    route: routes.signIn,
  },
  {
    path: '/profile',
    route: routes.profile,
  },
];

export const Pages = createRoutesView({
  routes: [
    { route: routes.signIn, view: SignInPage, layout: AuthLayout },
    { route: routes.signUp, view: SignUpPage, layout: AuthLayout },
    { route: routes.home, view: HomePage, layout: MainLayout },
    {
      route: routes.profile,
      view: () => <div>Profile</div>,
      layout: MainLayout,
    },
  ],
});
