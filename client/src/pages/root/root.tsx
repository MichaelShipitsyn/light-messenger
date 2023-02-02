import { combine } from 'effector';
import { list, variant } from '@effector/reflect';
import { createRoutesView, createRouteView, Link } from 'atomic-router-react';
import { authorizedRoot, routes } from '@lm-client/shared/routes';
import { Header } from '@lm-client/widgets/header';
import { DialogCard } from '@lm-client/entities/dialog';
import { Dialog } from '@lm-client/shared/types';
import * as dialogsModel from '@lm-client/entities/dialog';
import * as viewerModel from '@lm-client/entities/viewer';
import { useUnit } from 'effector-react';

// dialogsModel.$dialogs.watch(console.log);

export const RootPage = createRouteView({
  route: authorizedRoot,
  view() {
    return (
      <>
        <Header />
        <div className="grid grid-flow-row grid-cols-7">
          <div className="col-span-2 border-r-2 border-r-blue">
            {/* Add search bar and then change calc */}
            <ul className="h-[calc(100vh-2rem-5rem)] overflow-auto py-15">
              <RootPageContent />
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
      view: () => <p>Profile</p>,
    },
    {
      route: routes.app.dialog,
      view: () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { dialogId } = useUnit(routes.app.dialog.$params);
        return <p>Dialog {dialogId}</p>;
      },
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

const RootPageContent = variant({
  source: combine(
    {
      status: dialogsModel.$dialogsStatus,
      isEmpty: dialogsModel.$dialogs.map((dialogs) => dialogs.length === 0),
    },
    ({ status, isEmpty }) => {
      if (status === 'pending') return 'loading';
      if (isEmpty) return 'empty';
      return 'ready';
    }
  ),
  cases: {
    loading: () => <p>Loading...</p>,
    empty: () => <p>No dialogs....</p>,
    ready: DialogList,
  },
});