import GridLayout from '@components/ui/GridLayout/GridLayout';
import { CatCardSkeleton } from './CatCardSkeleton';
import { BreedCardSkeleton } from './BreedCardSkeleton';
import styles from './Skeletons.module.scss';
import type { GridSkeletonProps } from '@types';

export const GridSkeleton = ({ 
  type = 'cat',
  count = 8, 
  columns = 5, 
  gap = '1rem',
  className = 'grid'
}: GridSkeletonProps) => {
  const SkeletonComponent = type === 'breed' ? BreedCardSkeleton : CatCardSkeleton;
  
  return (
    <div className={styles.gridSkeleton}>
      <GridLayout columns={columns} gap={gap} className={className}>
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className={styles.skeletonItem}>
            <SkeletonComponent />
          </div>
        ))}
      </GridLayout>
    </div>
  );
};
