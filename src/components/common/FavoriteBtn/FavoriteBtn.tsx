import { Heart } from '@assets/icons/icons';
import styles from './FavoriteBtn.module.scss';
import { useAddToFavorites, useRemoveFromFavorites, useFavorites } from '@api/hooks';
import type { FavoriteBtnProps, FavoriteItem } from '@types';


const FavoriteBtn = ({
    imageId,
    className = '',
    title,
    disabled = false
}: FavoriteBtnProps) => {
    const addToFavoritesMutation = useAddToFavorites();
    const removeFromFavoritesMutation = useRemoveFromFavorites();
    const { data: favorites } = useFavorites({
        sub_id: 'user-gwi'
    });

    const isFavorited = Array.isArray(favorites) ?
        favorites.some((fav: FavoriteItem) => fav.image_id === imageId) : false;

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (disabled) return;

        if (isFavorited && Array.isArray(favorites)) {
            const favoriteItem = favorites.find((fav: FavoriteItem) => fav.image_id === imageId);
            if (favoriteItem) {
                removeFromFavoritesMutation.mutate(favoriteItem.id);
            }
        } else {
            addToFavoritesMutation.mutate({
                imageId: imageId,
                subId: 'user-gwi'
            });
        }
    };

    const isLoading = addToFavoritesMutation.isPending || removeFromFavoritesMutation.isPending;
    
    return (
        <button
            title={title || (isFavorited ? "Remove from Favorites" : "Add to Favorites")}
            onClick={handleFavoriteClick}
            disabled={disabled || isLoading}
            className={className}
        >
            <Heart className={`${styles.heartIcon} ${isFavorited ? styles.favorited : ''}`} />
        </button>
    );
};

export default FavoriteBtn;
