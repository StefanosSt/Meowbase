import { useEffect } from 'react';
import { useToast } from '@hooks/useToast';
import styles from './Toast.module.scss';

const Toast = () => {
  const { toastData, hideToast } = useToast();

  useEffect(() => {
    if (toastData.show) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toastData.show, hideToast]);

  if (!toastData.show) return null;

  return (
    <div className={`${styles.toast} ${styles[`toast--${toastData.color}`]}`}>
      <span className={styles.toast__message}>{toastData.message}</span>
    </div>
  );
};

export default Toast;
