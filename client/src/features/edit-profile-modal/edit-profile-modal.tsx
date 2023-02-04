import { useUnit } from 'effector-react';
import { Avatar, Button, Heading, Modal } from '@lm-client/shared/ui';
import * as viewerModel from '@lm-client/entities/viewer';
import * as editProfileModalModel from './model';
import { routes } from '@lm-client/shared/routes';

export const EditProfileModal = () => {
  const [
    viewer,
    profileBio,
    handleChangeProfileBio,
    handleSaveProfileBio,
    handleCloseModal,
    isOpenModal,
  ] = useUnit([
    viewerModel.$viewer,
    editProfileModalModel.$profileBio,
    editProfileModalModel.profileBioChanged,
    editProfileModalModel.profileBioSaved,
    editProfileModalModel.editModalClosed,
    routes.app.profile.$isOpened,
  ]);

  if (!viewer) {
    return null;
  }

  return (
    <Modal open={isOpenModal} onClose={handleCloseModal}>
      <Modal.Header className="text-center">
        <div className="flex justify-end">
          <button onClick={handleCloseModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-24 w-24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <Heading size="lg">Profile</Heading>
      </Modal.Header>
      <Modal.Body className="flex flex-col items-center gap-30">
        <Avatar username={viewer.username} size="lg" className="flex-grow" />
        <div className="flex w-full flex-col gap-8 self-start">
          <label htmlFor="bio" className="text-14">
            Bio:
          </label>
          <textarea
            value={profileBio}
            onChange={(e) => handleChangeProfileBio(e.target.value)}
            onBlur={handleSaveProfileBio}
            className="h-75 resize-none overflow-auto rounded-3 border border-black p-5 outline-none focus:border-blue focus:outline-1 focus:outline-offset-1 focus:outline-blue"
          />
        </div>
      </Modal.Body>
      <Modal.Actions>
        <Button
          onClick={handleCloseModal}
          variant="ghost"
          color="red"
          size="md"
        >
          Close
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
