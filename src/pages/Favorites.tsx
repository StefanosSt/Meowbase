import { useEffect } from 'react';
import { setHeaderData } from '@store/headerSlice';
import { useAppDispatch } from '@store/hooks';
import { useFavorites } from '@api/hooks';

import GridLayout from '@components/ui/GridLayout/GridLayout';
import CatCard from '@components/ui/CatCard/CatCard';
import type { FavoriteItem, Cat } from '@types';
import { GridSkeleton } from '@/components/ui/Skeletons/Skeletons';

const Favorites = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            setHeaderData({
                title: 'Favorites',
                description: 'Keep track of your favorite cats here.'
            })
        );
    }, [dispatch]);

    const {
        data: favorites,
        isLoading,
    } = useFavorites({
        sub_id: 'user-gwi'
    });

    if (isLoading) {
        return (
            <>
                <GridSkeleton type="cat" count={20} columns={5} gap="1rem" />
            </>
        );
    }

    if (!favorites || !Array.isArray(favorites) || favorites.length === 0) {
        return (
            <div className="error-message">
                <p>No favorite cats yet. Start exploring and add some favorites!</p>
            </div>
        );
    }

    return (
        <div>
            <GridLayout columns={5} gap="1rem" className="grid">
                {favorites.map((favorite: FavoriteItem) => {
                    const catData: Cat = {
                        id: favorite.image_id,
                        url: favorite.image?.url || '',
                        width: favorite.image?.width || 0,
                        height: favorite.image?.height || 0,
                        breeds: []
                    };

                    return (
                        <CatCard
                            key={favorite.id}
                            id={favorite.image_id}
                            imageUrl={favorite.image?.url || ''}
                            alt={`Favorite Cat ${favorite.image_id}`}
                            width={favorite.image?.width}
                            height={favorite.image?.height}
                            onClick={() => console.log(catData)}
                        />
                    );
                })}
            </GridLayout>
        </div>
    )
}

export default Favorites