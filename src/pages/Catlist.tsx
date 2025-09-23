import { useState, useEffect } from 'react';
import { setHeaderData } from '@store/headerSlice';
import { useAppDispatch } from '@store/hooks';
import GridLayout from '@components/ui/GridLayout/GridLayout';
import CatCard from '@components/ui/CatCard/CatCard';
import Filters from '@components/ui/Filters/Filters';
import { useLocalStorage } from '@hooks';
import { useDynamicInfiniteCats } from '@/api/hooks';
import type { Cat } from '@types';
import { GridSkeleton } from '@/components/ui/Skeletons/Skeletons';
import { useSearchParams } from 'react-router-dom';
import { Modal } from '@/components/ui/Modal/Modal';
import ModalContent from '@/components/ui/Modal/ModalContent';


const Catlist = () => {
  const limit = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);

  const [hasBreeds, setHasBreeds] = useLocalStorage('cat-breed-filter', 1);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      setHeaderData({
        title: 'Cats',
        description: 'Discover amazing cats and their breeds!'
      })
    );
  }, [dispatch]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useDynamicInfiniteCats({ has_breeds: hasBreeds }, limit);

  const allCatImages = (data?.pages.flat() || []) as Cat[];

  const handleCatClick = (cat: Cat) => {
    setSelectedCat(cat)
    const newParams = new URLSearchParams(searchParams);
    newParams.set('cat_id', cat.id);
    setSearchParams(newParams);
    setIsModalOpen(true);
  }

  const handleModalClose = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('cat_id');
    setSearchParams(newParams);
    setIsModalOpen(false);
  }

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <>
        <Filters hasBreeds={hasBreeds} onChange={setHasBreeds} />
        <GridSkeleton type="cat" count={20} columns={5} gap="1rem" />
      </>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>Error loading cats. Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <Filters hasBreeds={hasBreeds} onChange={setHasBreeds} />
      <GridLayout columns={5} gap="1rem" className="grid">
        {allCatImages.map(cat => (
          <CatCard
            key={cat.id}
            id={cat.id}
            imageUrl={cat.url}
            alt={`Cat ${cat.id}`}
            width={cat.width}
            height={cat.height}
            openModal={() => handleCatClick(cat)}
          />
        ))}
      </GridLayout>

      {hasNextPage && (
        <div className="catlist__load-more">
          <button
            onClick={handleLoadMore}
            className={`btn ${isFetchingNextPage ? 'btn-disabled btn-loading' : 'btn-primary'}`}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More Cats'}
          </button>
        </div>
      )}

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

export default Catlist