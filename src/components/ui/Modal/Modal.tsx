import { useRef, useEffect } from 'react';
import { useLockBodyScroll, useEscapeKey } from '@hooks';
import styles from './Modal.module.scss';
import type { ModalProps } from '@types';

export const Modal = ({ isOpen, setIsOpen, onClose, children, title, orientation, catId }: ModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useLockBodyScroll(isOpen);
  useEscapeKey(() => setIsOpen(false), isOpen);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen, catId]);

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