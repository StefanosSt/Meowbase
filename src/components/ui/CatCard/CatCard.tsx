import FavoriteBtn from '@components/common/FavoriteBtn/FavoriteBtn';
import styles from './CatCard.module.scss';
import type { CatCardProps } from '@types';

const CatCard = ({
  id,
  imageUrl,
  alt = 'Cat image',
  width,
  height,
  openModal
}: CatCardProps) => {
  const isLandscape = width && height && width > height;

  return (
    <div
      className={`${styles.card} ${isLandscape ? styles.landscape : ''} card`}
      onClick={openModal}
      role="button"
      tabIndex={0}
    >
      <FavoriteBtn className={styles.cardFavoriteBtn} imageId={id} />
      <div className={styles.imageContainer}>
        <img src={imageUrl} alt={alt} className={styles.image} loading="lazy" />
      </div>
    </div>
  );
};

export default CatCard;