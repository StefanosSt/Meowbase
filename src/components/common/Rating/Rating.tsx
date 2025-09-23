import { Star } from '@assets/icons/icons';
import styles from './Rating.module.scss';

interface RatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
}

const Rating = ({ rating, maxRating = 5, className = '' }: RatingProps) => {
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    if (i <= rating) {
      // Filled star
      stars.push(
        <Star
          key={i}
          width={16}
          height={16}
          className={styles['rating__star--filled']}
        />
      );
    } else {
      // Empty star
      stars.push(
        <Star
          key={i}
          width={16}
          height={16}
          className={styles['rating__star--empty']}
        />
      );
    }
  }

  return (
    <div className={`${styles.rating} ${className}`}>
      {stars}
    </div>
  );
};

export default Rating;
