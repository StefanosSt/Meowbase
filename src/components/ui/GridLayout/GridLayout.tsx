import styles from './GridLayout.module.scss';
import type { GridProps } from '@types';

const GridLayout = ({
  children,
  columns = 1,
  gap = '1rem',
  className,
}: GridProps) => {
  return (
    <div
      className={`${styles.grid} ${className}`}
      style={
        {
          '--grid-gap': gap,
          '--grid-columns': columns,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};

export default GridLayout;
