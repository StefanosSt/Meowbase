import { useEffect } from 'react';
import { setHeaderData } from '@store/headerSlice';
import { useAppDispatch } from '@store/hooks';

const Catlist = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(
           setHeaderData({
                title: 'Cats',
                description: 'Discover amazing cats and their breeds!'
            })
        );
    }, [dispatch]);

  return (
    <div>Catlist</div>
  )
}

export default Catlist