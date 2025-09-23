import styles from './BreedCard.module.scss';
import type { BreedCardProps } from '@types';
import catPlaceholder from '@assets/cat.png';

const BreedCard = ({
    id,
    name,
    description,
    temperament,
    origin,
    lifeSpan,
    image,
    onClick,
}: BreedCardProps) => {
    return (
        <div key={id} className={`${styles.card} card`} onClick={onClick} role="button" tabIndex={0}>
            <div className={styles.imageContainer}>
                <img
                    src={image?.url || catPlaceholder}
                    alt={name}
                    className={styles.image}
                    loading="lazy"
                />
            </div>
            <h3 className={styles.title}>
                {name}
            </h3>
            {origin && (
                <p className={styles.origin}>
                    Origin: {origin}
                </p>
            )}
            {temperament && (
                <p className={styles.temperament}>
                    Temperament: {temperament}
                </p>
            )}
            {lifeSpan && (
                <p className={styles.lifeSpan}>
                    Life Span: {lifeSpan} years
                </p>
            )}
            {description && (
                <p className={styles.description}>
                    {description.length > 120
                        ? `${description.substring(0, 120)}...`
                        : description
                    }
                </p>
            )}
        </div>
    );
};

export default BreedCard;
