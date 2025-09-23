import Rating from '@components/common/Rating/Rating';
import styles from './BreedDetails.module.scss';
import type { BreedData, ModalDetails } from '@types';


interface BreedDetailsProps {
  breed: BreedData | ModalDetails;
}

const BreedDetails = ({ breed }: BreedDetailsProps) => {
  const temperamentTraits = breed.temperament?.split(', ') || [];

  return (
    <div className={styles.breedDetails}>
      <div className={styles.breedDetails__header}>
        <h3 className={styles.breedDetails__name}>{breed.name}</h3>
        <div className={styles.breedDetails__origin}>
          <span className={styles.breedDetails__country}>{breed.origin}</span>
          {breed.country_code && <span className={styles.breedDetails__code}>({breed.country_code})</span>}
        </div>
      </div>

      <div className={styles.breedDetails__description}>
        <p>{breed.description}</p>
      </div>

      <div className={styles.breedDetails__info}>
        <div className={styles.breedDetails__infoItem}>
          <span className={styles.breedDetails__label}>Life Span:</span>
          <span className={styles.breedDetails__value}>{breed.life_span} years</span>
        </div>
        {breed.weight && (
          <div className={styles.breedDetails__infoItem}>
            <span className={styles.breedDetails__label}>Weight:</span>
            <span className={styles.breedDetails__value}>
              {breed.weight.metric} kg ({breed.weight.imperial} lbs)
            </span>
          </div>
        )}
      </div>

      <div className={styles.breedDetails__temperament}>
        <h4 className={styles.breedDetails__sectionTitle}>Temperament</h4>
        <div className={styles.breedDetails__traits}>
          {temperamentTraits.map((trait, index) => (
            <span key={index} className={styles.breedDetails__trait}>
              {trait.trim()}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.breedDetails__ratings}>
        <h4 className={styles.breedDetails__sectionTitle}>Characteristics</h4>
        <div className={styles.breedDetails__ratingsGrid}>
          <div className={styles.breedDetails__ratingItem}>
            <span className={styles.breedDetails__ratingLabel}>Adaptability</span>
            <Rating rating={breed.adaptability || 0} />
          </div>
          <div className={styles.breedDetails__ratingItem}>
            <span className={styles.breedDetails__ratingLabel}>Affection Level</span>
            <Rating rating={breed.affection_level || 0} />
          </div>
          <div className={styles.breedDetails__ratingItem}>
            <span className={styles.breedDetails__ratingLabel}>Child Friendly</span>
            <Rating rating={breed.child_friendly || 0} />
          </div>
          <div className={styles.breedDetails__ratingItem}>
            <span className={styles.breedDetails__ratingLabel}>Dog Friendly</span>
            <Rating rating={breed.dog_friendly || 0} />
          </div>
          <div className={styles.breedDetails__ratingItem}>
            <span className={styles.breedDetails__ratingLabel}>Energy Level</span>
            <Rating rating={breed.energy_level || 0} />
          </div>
          <div className={styles.breedDetails__ratingItem}>
            <span className={styles.breedDetails__ratingLabel}>Grooming</span>
            <Rating rating={breed.grooming || 0} />
          </div>
          <div className={styles.breedDetails__ratingItem}>
            <span className={styles.breedDetails__ratingLabel}>Health Issues</span>
            <Rating rating={breed.health_issues || 0} />
          </div>
          <div className={styles.breedDetails__ratingItem}>
            <span className={styles.breedDetails__ratingLabel}>Intelligence</span>
            <Rating rating={breed.intelligence || 0} />
          </div>
          <div className={styles.breedDetails__ratingItem}>
            <span className={styles.breedDetails__ratingLabel}>Shedding Level</span>
            <Rating rating={breed.shedding_level || 0} />
          </div>
          <div className={styles.breedDetails__ratingItem}>
            <span className={styles.breedDetails__ratingLabel}>Social Needs</span>
            <Rating rating={breed.social_needs || 0} />
          </div>
          <div className={styles.breedDetails__ratingItem}>
            <span className={styles.breedDetails__ratingLabel}>Stranger Friendly</span>
            <Rating rating={breed.stranger_friendly || 0} />
          </div>
          <div className={styles.breedDetails__ratingItem}>
            <span className={styles.breedDetails__ratingLabel}>Vocalisation</span>
            <Rating rating={breed.vocalisation || 0} />
          </div>
        </div>
      </div>

      <div className={styles.breedDetails__features}>
        <h4 className={styles.breedDetails__sectionTitle}>Special Features</h4>
        <div className={styles.breedDetails__featuresList}>
          {breed.indoor === 1 && (
            <span className={styles.breedDetails__feature}>Indoor Cat</span>
          )}
          {breed.lap === 1 && (
            <span className={styles.breedDetails__feature}>Lap Cat</span>
          )}
          {breed.hypoallergenic === 1 && (
            <span className={styles.breedDetails__feature}>Hypoallergenic</span>
          )}
          {breed.hairless === 1 && (
            <span className={styles.breedDetails__feature}>Hairless</span>
          )}
          {breed.rex === 1 && (
            <span className={styles.breedDetails__feature}>Rex Coat</span>
          )}
          {breed.natural === 1 && (
            <span className={styles.breedDetails__feature}>Natural Breed</span>
          )}
          {breed.rare === 1 && (
            <span className={styles.breedDetails__feature}>Rare Breed</span>
          )}
          {breed.experimental === 1 && (
            <span className={styles.breedDetails__feature}>Experimental</span>
          )}
          {breed.suppressed_tail === 1 && (
            <span className={styles.breedDetails__feature}>Suppressed Tail</span>
          )}
          {breed.short_legs === 1 && (
            <span className={styles.breedDetails__feature}>Short Legs</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreedDetails;
