import { useRef, useEffect } from 'react';
import { useLockBodyScroll, useEscapeKey } from '@hooks';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { switchToBreedView } from '@store/modalContentSlice';
import styles from './Modal.module.scss';
import { Arrow } from '@assets/icons/icons';
import type { ModalProps } from '@types';

export const Modal = ({ isOpen, setIsOpen, onClose, children, title, orientation, catId }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useLockBodyScroll(isOpen);
  useEscapeKey(() => setIsOpen(false), isOpen);
  const dispatch = useAppDispatch();

  const { currentView } = useAppSelector(state => state.modalContent);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen, catId]);

  const handleBackClick = () => {
    dispatch(switchToBreedView());
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.modal} ${orientation}`}
      onClick={handleBackdropClick}
      onClose={onClose}
    >
      <div className={styles.modalContent}>
        <header className={styles.modalHeader}>
            {currentView === 'cat' && (
            <button
              className={styles.backButton}
              onClick={handleBackClick}
              type="button"
              aria-label="Go back"
            >
              <Arrow/>
            </button>
          )}
          {title && <h2 className={styles.modalTitle}>{title}</h2>}
          <button
            className={styles.closeButton}
            onClick={onClose}
            type="button"
            aria-label="Close modal"
          >
            ×
          </button>
        </header>
        <section className={styles.modalBody}>
          {children}
        </section>
      </div>
    </dialog>
  );
};