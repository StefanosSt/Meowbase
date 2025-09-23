import { useEffect } from 'react';
import { useAppDispatch } from '@store/hooks';
import { setHeaderData } from '@store/headerSlice';
import catNotFound from '@assets/404.png';

const NotFound = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
            setHeaderData({
                title: 'Meow! Page Not Found',
                description: 'Oops! This page seems to have wandered off like a curious cat.'
            })
        );
    }, [dispatch]);

   return (
        <img
            src={catNotFound}
            className="pnf-image"
            alt={'Page Not Found'}
            loading="lazy"
        />
    );
}

export default NotFound