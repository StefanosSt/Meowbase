import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Share, Download, Print } from '@assets/icons/icons';
import BreedDetails from '@components/common/BreedDetails/BreedDetails';
import FavoriteBtn from '@components/common/FavoriteBtn/FavoriteBtn';
import { setBreedContent, setCatContent } from '@store/modalContentSlice';
import { setSharedUrl } from '@store/sharedUrlSlice';
import { showGlobalToast } from '@hooks/useToast';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useCatById } from '@api/hooks';
import styles from './Modal.module.scss';

import type { ModalDetails, ModalContentProps } from '@types';

const ModalContent = ({ content, hasBreedDetails = false, currentBreedCats }: ModalContentProps) => {
    const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
    const { currentView, catContent } = useAppSelector(state => state.modalContent);
    const { currentUrl } = useAppSelector(state => state.sharedUrl);

    const printRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    const { data: catDetails } = useCatById(
        selectedImageId || '',
        { enabled: !!selectedImageId }
    ) as { data: ModalDetails | undefined };

    useEffect(() => {
        if (currentBreedCats && currentBreedCats.length > 0) {
            dispatch(setBreedContent({
                currentBreedCats,
                breedData: content.breeds?.[0],

            }));
        }
    }, [currentBreedCats, content.breeds, dispatch]);

    useEffect(() => {
        if (catDetails && selectedImageId) {
            dispatch(setCatContent({
                catDetails: {
                    id: catDetails.id,
                    url: catDetails.url,
                    width: catDetails.width,
                    height: catDetails.height,
                    breeds: catDetails.breeds
                }
            }));

            setSelectedImageId(null);
            dispatch(setSharedUrl(`?cat_id=${selectedImageId}`));
        }
    }, [catDetails, selectedImageId, dispatch, setSelectedImageId]);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
    });

    const handleShareButton = () => {
        const baseUrl = window.location.origin;
        const fullUrl = currentUrl ? `${baseUrl}${currentUrl}` : window.location.href;

        navigator.clipboard.writeText(fullUrl);
        showGlobalToast({
            message: 'Copied to clipboard',
            color: 'info'
        });
    };

    const extractImageIdFromUrl = (imageUrl: string): string => {
        const urlParts = imageUrl.split('/');
        const filename = urlParts[urlParts.length - 1];
        return filename.split('.')[0];
    };

     const handleBreedImageClick = (imageUrl: string) => {
        const imageId = extractImageIdFromUrl(imageUrl);
        setSelectedImageId(imageId);
    };

    const displayDetails = currentView === 'cat' && catContent ? catContent.catDetails : content;
    const breedInfo = content.breeds && content.breeds.length > 0 ? content.breeds[0] : content;

    const orientation = displayDetails.width && displayDetails.height
        ? displayDetails.width === displayDetails.height
            ? 'Square'
            : displayDetails.width > displayDetails.height
                ? 'Landscape'
                : 'Portrait'
        : '';

    return (
        <>
            {currentBreedCats && currentBreedCats.length > 0  && currentView === 'breed' ? (
                <div className={styles['modal__breed-images']}>
                    <h3>Explore the {content.name || 'Breed'} cats</h3>
                    <div className={styles['modal__breed-gallery']}>
                        {currentBreedCats.map((imageUrl, index) => (
                            <div
                                key={index}
                                className={styles['modal__breed-circle']}
                                onClick={() => handleBreedImageClick(imageUrl)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img
                                    src={imageUrl}
                                    alt={`${content.name || 'Breed'} cat ${index + 1}`}
                                    className={styles['modal__breed-image']}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <div ref={printRef}>
                        <img
                            src={displayDetails.url}
                            alt={`Cat ${displayDetails.id}`}
                        />
                    </div>
                    <div className={styles['modal__details']}>
                        {!!displayDetails.width && (
                            <div className={styles['modal__details-info']}>
                                <p><strong>Dimensions:</strong> {displayDetails.width} × {displayDetails.height}px</p>
                                <p><strong>Orientation:</strong> {orientation}</p>
                            </div>
                        )}
                        <div className={styles['modal__details-actions']}>
                            <button title="Print" className="mobile-hidden" onClick={handlePrint}><Print /></button>
                            <button title="Share" onClick={handleShareButton}><Share /></button>
                            <button title="Download" className="mobile-hidden" onClick={() => window.open(displayDetails.url, "_blank")}><Download /></button>
                            <FavoriteBtn imageId={displayDetails.id} />
                        </div>
                    </div>
                </>
            )}

            {hasBreedDetails ? (
                <BreedDetails breed={breedInfo} />
            ) : (
                <div className={styles['modal__no-breed']}>
                    <p>Unfortunately there is not any breed information for this cat</p>
                </div>
            )}
        </>
    );
};

export default ModalContent;