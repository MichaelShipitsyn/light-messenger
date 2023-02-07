import { list } from '@effector/reflect';
import { createRoutesView, createRouteView, Link } from 'atomic-router-react';
import { routes } from '@lm-client/shared/routes';
import { Header } from '@lm-client/widgets/header';
import { DialogCard } from '@lm-client/entities/dialog';
import { UserCard } from '@lm-client/entities/user';
import { Dialog, User } from '@lm-client/shared/types';
import { ProfilePage } from './profile';
import { DialogPage } from './dialog';
import { SearchUser } from '@lm-client/features/search-user';
import * as dialogsModel from '@lm-client/entities/dialog';
import * as viewerModel from '@lm-client/entities/viewer';
import * as userModel from '@lm-client/entities/user';
import { CreateDialog } from '@lm-client/features/create-dialog';

export const RootPage = createRouteView({
  route: viewerModel.viewerLoadedRoute,
  view() {
    return (
      <>
        <Header />
        <div className="grid grid-flow-row grid-cols-7">
          <div className="col-span-2 border-r-2 border-r-blue">
            <SearchUser />
            <ul className="h-[calc(100vh-2rem-5rem-3.6rem)] overflow-auto py-15">
              <UsersList />
              <DialogList />
            </ul>
          </div>
          <div className="col-span-5">
            <RootPageRoutes />
          </div>
        </div>
      </>
    );
  },
  otherwise() {
    return <div>Loading...</div>;
  },
});

const RootPageRoutes = createRoutesView({
  routes: [
    {
      route: routes.app.profile,
      view: ProfilePage,
    },
    {
      route: routes.app.createDialog,
      view: CreateDialog,
    },
    {
      route: routes.app.dialog,
      view: DialogPage,
    },
  ],
});

const DialogList = list<
  Dialog,
  Pick<Dialog, 'id' | 'lastMessage' | 'participants'> & {
    currentViewerId: number;
  }
>({
  view: ({ id, lastMessage, currentViewerId, participants }) => (
    <li>
      <Link
        to={routes.app.dialog}
        params={{ dialogId: id.toString() }}
        className="block px-15 py-10 transition-colors hover:bg-blue"
      >
        <DialogCard
          lastMessage={lastMessage}
          currentViewerId={currentViewerId}
          participants={participants}
        />
      </Link>
    </li>
  ),
  source: dialogsModel.$dialogs,
  bind: {
    currentViewerId: viewerModel.$viewer.map((user) => user?.id ?? 0),
  },
  mapItem: {
    id: (dialog) => dialog.id,
    lastMessage: (dialog) => dialog.lastMessage,
    participants: (dialog) => dialog.participants,
  },
  getKey: (dialog) => dialog.id.toString(),
});

const UsersList = list<User, Pick<User, 'id' | 'username'>>({
  view: ({ id, username }) => (
    <li>
      <Link
        to={routes.app.createDialog}
        className="block px-15 py-10 transition-colors hover:bg-blue"
      >
        <UserCard id={id} username={username} />
      </Link>
    </li>
  ),
  source: userModel.$users,
  mapItem: {
    id: (user) => user.id,
    username: (user) => user.username,
  },
  getKey: (user) => user.id.toString(),
});
