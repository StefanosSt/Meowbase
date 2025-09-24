import { useEffect, useState } from 'react';
import { setHeaderData } from '@store/headerSlice';
import { useAppDispatch } from '@store/hooks';
import { setSharedUrl, clearSharedUrl } from '@/store/sharedUrlSlice';
import { useFavorites } from '@api/hooks';
import { useSearchParams, NavLink } from 'react-router-dom'
import GridLayout from '@components/ui/GridLayout/GridLayout';
import CatCard from '@components/ui/CatCard/CatCard';
import type { FavoriteItem, Cat } from '@types';
import { GridSkeleton } from '@/components/ui/Skeletons/Skeletons';
import { Modal } from '@/components/ui/Modal/Modal';
import ModalContent from '@/components/ui/Modal/ModalContent';

const Favorites = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCat, setSelectedCat] = useState<Cat | null>(null);

    const {
        data: favorites,
        isLoading,
    } = useFavorites({
        sub_id: 'user-gwi'
    });

    useEffect(() => {
        const headerDescription = (!favorites || !Array.isArray(favorites) || favorites.length === 0)
            ? 'No favorite cats yet. Start exploring and add some favorites!'
            : 'Keep track of your favorite cats here.';

        dispatch(
            setHeaderData({
                title: 'Favorites',
                description: headerDescription
            })
        );
    }, [dispatch, favorites]);

    const handleCatClick = (cat: Cat) => {
        setSelectedCat(cat)
        const newParams = new URLSearchParams(searchParams);
        newParams.set('cat_id', cat.id);
        setSearchParams(newParams);
        setIsModalOpen(true);
        dispatch(setSharedUrl(`?cat_id=${cat.id}`));
    }

    const handleModalClose = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('cat_id');
        setSearchParams(newParams);
        setIsModalOpen(false);
        dispatch(clearSharedUrl())
    }


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
                <p>Do you want to explore and add some favorites?</p>
                <div className="catlist__load-more" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
                    <NavLink
                        to="/"
                        className='btn btn-primary'
                    >
                        Explore Cats
                    </NavLink>
                    <NavLink
                        to="/breeds"
                        className='btn btn-primary'
                    >
                        Explore Breeds
                    </NavLink>
                </div>
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
                            openModal={() => handleCatClick(catData)}
                        />
                    );
                })}
            </GridLayout>
            {selectedCat && (
                <Modal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    onClose={handleModalClose}
                    title={`Cat ${selectedCat.id}`}
                    orientation={selectedCat.width > selectedCat.height ? 'Landscape' : 'Portrait'}
                >
                    <ModalContent content={selectedCat} />
                </Modal>
            )}
        </div>
    )
}

export default Favorites