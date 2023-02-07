import { createRoutesView } from 'atomic-router-react';
import { routes } from '@lm-client/shared/routes';
import { SignInPage, SignUpPage } from './auth';
import { RootPage } from './root';
import { AuthLayout, MainLayout } from '@lm-client/shared/ui';

export const routesMap = [
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
    route: [routes.app.root, routes.app.profile],
  },
  {
    path: '/create-dialog',
    route: [routes.app.root, routes.app.createDialog],
  },
  {
    path: '/:dialogId',
    route: [routes.app.root, routes.app.dialog],
  },
  {
    path: '/',
    route: routes.app.root,
  },
];

export const Pages = createRoutesView({
  routes: [
    { route: routes.signIn, view: SignInPage, layout: AuthLayout },
    { route: routes.signUp, view: SignUpPage, layout: AuthLayout },
    { route: routes.app.root, view: RootPage, layout: MainLayout },
  ],
});
