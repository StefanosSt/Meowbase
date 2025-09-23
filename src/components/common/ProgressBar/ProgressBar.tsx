import { useLoading } from '@store/hooks';
import styles from './ProgressBar.module.scss';

const ProgressBar = () => {
  const isLoading = useLoading();

  return (
    <div className={`${styles.progressContainer} ${isLoading ? styles.visible : styles.hidden}`}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default ProgressBar;
