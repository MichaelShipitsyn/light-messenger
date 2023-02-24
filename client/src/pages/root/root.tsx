import { list } from '@effector/reflect';
import { createRoutesView, createRouteView, Link } from 'atomic-router-react';
import { routes } from '@lm-client/shared/routes';
import { Header } from '@lm-client/widgets/header';
import { DialogCard } from '@lm-client/entities/dialog';
import { UserCard } from '@lm-client/entities/user';
import { Dialog, User } from '@lm-client/shared/types';
import { ProfilePage } from './profile';
import { DialogPage } from './dialog';
import { CreateDialogPage } from './create-dialog';
import { SearchUser } from '@lm-client/features/search-user';
import * as dialogsModel from '@lm-client/entities/dialog';
import * as viewerModel from '@lm-client/entities/viewer';
import * as userModel from '@lm-client/entities/user';
import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { $io } from '@lm-client/shared/api';

export const RootPage = createRouteView({
  route: viewerModel.viewerLoadedRoute,
  view() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [socket, createDialog, createMessage] = useUnit([
      $io,
      dialogsModel.dialogCreated,
      dialogsModel.newMessageSended,
    ]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const createDialogListener = (data: string) => {
        createDialog(JSON.parse(data));
      };
      const createMessageListener = (data: string) => {
        createMessage(JSON.parse(data));
      };

      socket?.on('SERVER:CREATE_DIALOG', createDialogListener);
      socket?.on('SERVER:CREATE_MESSAGE', createMessageListener);
      return () => {
        socket?.removeListener('SERVER:CREATE_DIALOG', createDialogListener);
        socket?.removeListener('SERVER:CREATE_MESSAGE', createMessageListener);
      };
    }, [socket, createDialog, createMessage]);

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
      view: CreateDialogPage,
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
        query={{ recipientId: id }}
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
