import clsx from 'clsx';
import { Portal } from '../portal';
import { Actions } from './modal-actions';
import { Body } from './modal-body';
import { Header } from './modal-header';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

export const Modal = ({ open, onClose, children, className }: ModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <Portal>
      <div
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={onClose}
        className="fixed top-0 left-0 z-10 h-screen w-screen bg-black-500 opacity-60"
      />
      <div
        className={clsx(
          'absolute left-2/4 top-2/4 z-20 flex w-500 max-w-full -translate-x-2/4 -translate-y-2/4 flex-col gap-20 rounded-8 bg-white p-10 shadow-modal',
          className
        )}
      >
        {children}
      </div>
    </Portal>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Actions = Actions;
