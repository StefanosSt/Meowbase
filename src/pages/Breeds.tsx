import { useEffect } from 'react';
import { setHeaderData } from '@store/headerSlice';
import { useAppDispatch } from '@store/hooks';
import { useBreeds } from '@api/hooks';
import BreedCard from '@/components/ui/BreedCard/BreedCard';
import GridLayout from '@/components/ui/GridLayout/GridLayout';
import type { Breed } from '@types';

const Breeds = () => {
    const dispatch = useAppDispatch();

    const {
        data: breedsData,
        error,
    } = useBreeds();

    const breeds = (breedsData ?? []) as Breed[];

    useEffect(() => {
        dispatch(
            setHeaderData({
                title: 'Breeds',
                description: 'Discover the wonderful world of cat breeds'
            })
        );
    }, [dispatch]);

    if (error) {
        return (
            <div className="error-message">
                <p>Error loading breeds: {error.message}</p>
            </div>
        );
    }

    return (
        <div>
            <GridLayout columns={4} gap="1.5rem" className="grid">
                {breeds.map((breed: Breed) => (
                    <BreedCard
                        key={breed.id}
                        id={breed.id}
                        name={breed.name}
                        description={breed.description}
                        temperament={breed.temperament}
                        origin={breed.origin}
                        lifeSpan={breed.life_span}
                        image={breed.image}
                        onClick={() => console.log('Breed clicked from list:', breed.id)}
                    />
                ))}
            </GridLayout>
        </div>
    )
}

export default Breeds