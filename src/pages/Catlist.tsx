import { useEffect } from 'react';
import { setHeaderData } from '@store/headerSlice';
import { useAppDispatch } from '@store/hooks';
import GridLayout from '@components/ui/GridLayout/GridLayout';
import CatCard from '@components/ui/CatCard/CatCard';
import Filters from '@components/ui/Filters/Filters';
import { useLocalStorage } from '@hooks';
import { useDynamicInfiniteCats } from '@/api/hooks';
import type { Cat } from '@types';


const Catlist = () => {
  const limit = 10;
  const [hasBreeds, setHasBreeds] = useLocalStorage('cat-breed-filter', 1);

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
    error,
  } = useDynamicInfiniteCats({ has_breeds: hasBreeds }, limit);

  const allCatImages = (data?.pages.flat() || []) as Cat[];

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div>
      <Filters hasBreeds={hasBreeds} onChange={setHasBreeds} />

      {error && (
        <div className="error-message">
          <p>Error loading cats. Please try again later.</p>
        </div>
      )}

      <GridLayout columns={5} gap="1rem" className="grid">
        {allCatImages.map(cat => (
          <CatCard
            key={cat.id}
            id={cat.id}
            imageUrl={cat.url}
            alt={`Cat ${cat.id}`}
            width={cat.width}
            height={cat.height}
            onClick={() => console.log('Cat clicked from list:', cat.id)}
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
    </div>
  )
}

export default Catlist