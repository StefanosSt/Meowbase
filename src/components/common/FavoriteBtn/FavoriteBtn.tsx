import { Heart } from '@assets/icons/icons';
import styles from './FavoriteBtn.module.scss';
import type { FavoriteBtnProps } from '@types';

const FavoriteBtn = ({ 
    imageId, 
    className = '', 
}: FavoriteBtnProps) => {

    return (
        <button 
            title="Add to Favorites"
            onClick={() => console.log('Add/Remove to/from Favorites', imageId)}
            className={className}
        >
            <Heart className={styles.heartIcon} />
        </button>
    );
};

export default FavoriteBtn;
