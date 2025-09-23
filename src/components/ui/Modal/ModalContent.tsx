import { useRef} from "react";
import { useReactToPrint } from "react-to-print";
import { Share, Download, Print } from '@assets/icons/icons';
import BreedDetails from '@components/common/BreedDetails/BreedDetails';
import FavoriteBtn from '@components/common/FavoriteBtn/FavoriteBtn';
import { showGlobalToast } from '@hooks/useToast';
import styles from './Modal.module.scss';

import type { ModalContentProps } from '@types';

const ModalContent = ({ content, isBreed = false, currentBreedCats }: ModalContentProps) => {
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
    });

    const handleShareButton = () => {
        const fullUrl = window.location.href;

        navigator.clipboard.writeText(fullUrl);
        showGlobalToast({
            message: 'Copied to clipboard',
            color: 'info'
        });
    };

    const orientation = content.width && content.height
        ? content.width === content.height
            ? 'Square'
            : content.width > content.height
                ? 'Landscape'
                : 'Portrait'
        : undefined;

    return (
        <>
            {currentBreedCats && currentBreedCats.length > 1 ? (
                <div className={styles['modal__breed-images']}>
                    <h3>Explore the {content.name || 'Breed'} cats</h3>
                    <div className={styles['modal__breed-gallery']}>
                        {currentBreedCats.map((imageUrl, index) => (
                            <div
                                key={index}
                                className={styles['modal__breed-circle']}
                                // onClick={() => handleBreedImageClick(cat)}
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
                            src={content.url}
                            alt={`Cat ${content.id}`}
                        />
                    </div>
                    <div className={styles['modal__details']}>
                        {!!content.width && (
                            <div className={styles['modal__details-info']}>
                                <p><strong>Dimensions:</strong> {content.width} × {content.height}px</p>
                                <p><strong>Orientation:</strong> {orientation}</p>
                            </div>
                        )}
                        <div className={styles['modal__details-actions']}>
                            <button title="Print" className="mobile-hidden" onClick={handlePrint}><Print /></button>
                            <button title="Share" onClick={handleShareButton}><Share /></button>
                            <button title="Download" className="mobile-hidden" onClick={() => window.open(content.url, "_blank")}><Download /></button>
                            <FavoriteBtn imageId={content.id} />
                        </div>
                    </div>
                </>
            )}

            {isBreed ? (
                <BreedDetails breed={content} />
            ) : (
                <div className={styles['modal__no-breed']}>
                    <p>Unfortunately there is not any breed information for this cat</p>
                </div>
            )}
        </>
    );
};

export default ModalContent;