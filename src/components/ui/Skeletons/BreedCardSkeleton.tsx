import ContentLoader from 'react-content-loader';
import styles from './Skeletons.module.scss';

export const BreedCardSkeleton = () => (
  <div className={styles.breedCardSkeleton}>
    <ContentLoader
      speed={2}
      width="100%"
      height={350}
      backgroundColor="#c6c9ccff"
      foregroundColor="#8a8787ff"
    >
      {/* Image area */}
      <rect x="0" y="0" rx="8" ry="8" width="100%" height="200" />
      
      {/* Title */}
      <rect x="0" y="220" rx="4" ry="4" width="70%" height="20" />
      
      {/* Origin */}
      <rect x="0" y="250" rx="4" ry="4" width="50%" height="14" />
      
      {/* Temperament */}
      <rect x="0" y="275" rx="4" ry="4" width="80%" height="14" />
      
      {/* Life Span */}
      <rect x="0" y="300" rx="4" ry="4" width="40%" height="14" />
      
      {/* Description lines */}
      <rect x="0" y="325" rx="4" ry="4" width="100%" height="12" />
    </ContentLoader>
  </div>
);

