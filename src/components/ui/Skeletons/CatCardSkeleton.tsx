import ContentLoader from 'react-content-loader';
import styles from './Skeletons.module.scss';

export const CatCardSkeleton = () => (
  <div className={styles.catCardSkeleton}>
    <ContentLoader
      speed={2}
      width="100%"
      height={250}
      backgroundColor="#c6c9ccff"
      foregroundColor="#8a8787ff"
    >
      <rect x="0" y="0" rx="0" ry="0" width="100%" height="250" />
    </ContentLoader>
  </div>
);
