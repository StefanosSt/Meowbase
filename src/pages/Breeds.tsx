import { useEffect } from 'react';
import { setHeaderData } from '@store/headerSlice';
import { useAppDispatch } from '@store/hooks';

const Breeds = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            setHeaderData({
                title: 'Breeds',
                description: 'Discover the wonderful world of cat breeds'
            })
        );
    }, [dispatch]);
    return (
        <div>Breeds</div>
    )
}

export default Breeds