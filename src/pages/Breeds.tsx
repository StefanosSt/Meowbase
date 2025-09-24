import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { setHeaderData } from '@store/headerSlice';
import { useAppDispatch } from '@store/hooks';
import { useBreeds, useCatsByBreed } from '@api/hooks';
import { GridSkeleton } from '@/components/ui/Skeletons/Skeletons';
import BreedCard from '@/components/ui/BreedCard/BreedCard';
import GridLayout from '@/components/ui/GridLayout/GridLayout';
import { Modal } from '@/components/ui/Modal/Modal';
import ModalContent from '@/components/ui/Modal/ModalContent';
import type { Breed } from '@types';
import { showGlobalToast } from '@/hooks/useToast';
import { switchToCatView } from '@/store/modalContentSlice';
import { clearSharedUrl } from '@/store/sharedUrlSlice';

const Breeds = () => {
    const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
    const [currentBreedCats, setCurrentBreedCats] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [shouldOpenModal, setShouldOpenModal] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            setHeaderData({
                title: 'Breeds',
                description: 'Discover the wonderful world of cat breeds'
            })
        );
    }, [dispatch]);

    const {
        data: breedsData,
        isLoading,
        error,
    } = useBreeds();

    const { data: catsForBreed } = useCatsByBreed(
        selectedBreed?.id || '',
        10,
        { enabled: !!selectedBreed }
    ) as { data: Breed[] | undefined };

    useEffect(() => {
        if (selectedBreed?.id && catsForBreed !== undefined && shouldOpenModal) {
            if (catsForBreed.length > 0) {
                const images = catsForBreed.map(cat => cat.url);
                setCurrentBreedCats(images);
                setIsModalOpen(true);
                setShouldOpenModal(false);
            } else {
                setCurrentBreedCats([])
                showGlobalToast({
                    message: `Unfortunately all the cats ran away!!`,
                    color: 'error'
                });
                const newParams = new URLSearchParams(searchParams);
                newParams.delete('breed_id');
                setSearchParams(newParams);
                setShouldOpenModal(false);
            }
        }
    }, [selectedBreed?.id, catsForBreed, shouldOpenModal, searchParams, setSearchParams]);

    const breeds = (breedsData ?? []) as Breed[];

    const handleBreedClick = (breed: Breed) => {
        setSelectedBreed(breed);
        setShouldOpenModal(true);
        const newParams = new URLSearchParams(searchParams);
        newParams.set('breed_id', breed.id);
        setSearchParams(newParams);
    };

    const handleModalClose = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('breed_id');
    setSearchParams(newParams);
    setIsModalOpen(false);
    dispatch(switchToCatView(null));
    dispatch(clearSharedUrl())
  }

    if (isLoading) {
        return <GridSkeleton type="breed" count={8} columns={4} gap="1.5rem" />;
    }

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
                        onClick={() => handleBreedClick(breed)}
                    />
                ))}
            </GridLayout>

            {selectedBreed && (
                <Modal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    onClose={handleModalClose}
                    title={`${selectedBreed.name || 'Breed'} Cat`}
                >
                    <ModalContent content={selectedBreed} hasBreedDetails={true} currentBreedCats={currentBreedCats} />
                </Modal>
            )}
        </div>
    )
}

export default Breeds