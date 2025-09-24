import Rating from '@components/common/Rating/Rating';
import styles from './BreedDetails.module.scss';
import type { BreedData, ModalDetails } from '@types';


interface BreedDetailsProps {
  breed: BreedData | ModalDetails;
}

const BreedDetails = ({ breed }: BreedDetailsProps) => {
  const temperamentTraits = breed.temperament?.split(', ') || [];

  // Helper for safe dynamic property access
  function getBreedNumberProp<T extends object>(obj: T, key: string): number {
    const value = (obj as Record<string, unknown>)[key];
    return typeof value === 'number' ? value : 0;
  }

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
          {(() => {
            const ratingFields: { [key: string]: string } = {
               adaptability: 'Adaptability' ,
               affection_level: 'Affection Level' ,
               child_friendly: 'Child Friendly' ,
               dog_friendly: 'Dog Friendly' ,
               energy_level: 'Energy Level' ,
               grooming: 'Grooming' ,
               health_issues: 'Health Issues' ,
               intelligence: 'Intelligence' ,
               shedding_level: 'Shedding Level' ,
               social_needs: 'Social Needs' ,
               stranger_friendly: 'Stranger Friendly' ,
               vocalisation: 'Vocalisation' };
            return Object.entries(ratingFields).map(([key, label]) => (
              <div key={key} className={styles.breedDetails__ratingItem}>
                <span className={styles.breedDetails__ratingLabel}>{label}</span>
                <Rating rating={getBreedNumberProp(breed, key)} />
              </div>
            ));
          })()}
        </div>
      </div>

      {(() => {
        const specialFeatures: { [key: string]: string } = {
          indoor: 'Indoor Cat',
          lap: 'Lap Cat',
          hypoallergenic: 'Hypoallergenic',
          hairless: 'Hairless',
          rex: 'Rex Coat',
          natural: 'Natural Breed',
          rare: 'Rare Breed',
          experimental: 'Experimental',
          suppressed_tail: 'Suppressed Tail',
          short_legs: 'Short Legs',
        };
        const enabledFeatures = Object.entries(specialFeatures)
          .filter(([key]) => getBreedNumberProp(breed, key) === 1)
          .map(([key, label]) => (
            <span key={key} className={styles.breedDetails__feature}>{label}</span>
          ));
        return (
          <div className={styles.breedDetails__features}>
            <h4 className={styles.breedDetails__sectionTitle}>Special Features</h4>
            <div className={styles.breedDetails__featuresList}>
              {enabledFeatures.length > 0 ? enabledFeatures : <span className={styles.breedDetails__feature}>None</span>}
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default BreedDetails;
