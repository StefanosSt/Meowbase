import { useAppSelector } from '@store/hooks';
import styles from './PageHeading.module.scss';

const PageHeading = () => {
      const { title, description } = useAppSelector(state => state.header);
    
  return (
      <div className={styles.headerContent}>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
  )
}

export default PageHeading