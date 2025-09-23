import { useEffect } from 'react';
import { setHeaderData } from '@store/headerSlice';
import { useAppDispatch } from '@store/hooks';

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
    return (
        <div>Favorites</div>
    )
}

export default Favorites