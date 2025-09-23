import { useRef} from "react";
import { useReactToPrint } from "react-to-print";
import { Share, Download, Print } from '@assets/icons/icons';
import BreedDetails from '@components/common/BreedDetails/BreedDetails';
import FavoriteBtn from '@components/common/FavoriteBtn/FavoriteBtn';
import { showGlobalToast } from '@hooks/useToast';
import styles from './Modal.module.scss';

import type { Cat, ModalDetails } from '@types';

const ModalContent = ({ content }: { content: Cat | ModalDetails }) => {
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: printRef,
    });

    const handleShareButton = () => {
        const fullUrl =  window.location.href;

        navigator.clipboard.writeText(fullUrl);
        showGlobalToast({
            message: 'Copied to clipboard',
            color: 'info'
        });
    };


    const orientation = content.width === content.height
        ? 'Square'
        : content.width > content.height
            ? 'Landscape'
            : 'Portrait';


    return (
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

            {content.breeds && content.breeds[0] ? (
                <BreedDetails breed={content.breeds[0]} />
            ) : (
                <div className={styles['modal__no-breed']}>
                    <p>Unfortunately there is not any breed information for this cat</p>
                </div>
            )}
        </>
    );
};

export default ModalContent;