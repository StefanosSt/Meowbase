import { memo } from 'react';
import styles from './Filters.module.scss';
import type { FiltersProps } from '@types'


const Filters = memo(({ hasBreeds, onChange }: FiltersProps) => {
    return (
        <div className={styles.filters}>
            <div className={styles.radioGroup}>
                <label>
                    <input
                        type="radio"
                        name="breedFilter"
                        checked={hasBreeds === 1}
                        onChange={() => onChange(1)}
                    />
                    Show Breeds
                </label>
                <label>
                    <input
                        type="radio"
                        name="breedFilter"
                        checked={hasBreeds === 0}
                        onChange={() => onChange(0)}
                    />
                    Random Cats
                </label>
            </div>
        </div>
    );
});

export default Filters;
