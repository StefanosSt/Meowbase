import { useEffect } from 'react';
import { setHeaderData } from '@store/headerSlice';
import { useAppDispatch } from '@store/hooks';
import GridLayout from '@components/ui/GridLayout/GridLayout';
import CatCard from '@components/ui/CatCard/CatCard';

const DUMMY_CATS = [
    {
        "breeds": [],
        "categories": [
            {
                "id": 5,
                "name": "boxes"
            }
        ],
        "id": "g7",
        "url": "https://cdn2.thecatapi.com/images/g7.jpg",
        "width": 534,
        "height": 800
    },
    {
        "breeds": [],
        "id": "1t8",
        "url": "https://cdn2.thecatapi.com/images/1t8.jpg",
        "width": 500,
        "height": 370
    },
    {
        "breeds": [],
        "id": "3mm",
        "url": "https://cdn2.thecatapi.com/images/3mm.jpg",
        "width": 805,
        "height": 575
    },
    {
        "breeds": [],
        "id": "6m0",
        "url": "https://cdn2.thecatapi.com/images/6m0.jpg",
        "width": 499,
        "height": 440
    },
    {
        "breeds": [],
        "id": "7qr",
        "url": "https://cdn2.thecatapi.com/images/7qr.jpg",
        "width": 500,
        "height": 375
    },
    {
        "breeds": [],
        "id": "av8",
        "url": "https://cdn2.thecatapi.com/images/av8.jpg",
        "width": 400,
        "height": 600
    },
    {
        "breeds": [],
        "id": "bi0",
        "url": "https://cdn2.thecatapi.com/images/bi0.jpg",
        "width": 480,
        "height": 360
    },
    {
        "breeds": [],
        "id": "cd2",
        "url": "https://cdn2.thecatapi.com/images/cd2.jpg",
        "width": 400,
        "height": 470
    },
    {
        "breeds": [],
        "id": "cg3",
        "url": "https://cdn2.thecatapi.com/images/cg3.jpg",
        "width": 500,
        "height": 500
    },
    {
        "breeds": [],
        "id": "cgt",
        "url": "https://cdn2.thecatapi.com/images/cgt.jpg",
        "width": 500,
        "height": 333
    }
]

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
    <div>
      <GridLayout columns={5} gap="1rem" className="grid">
                    {DUMMY_CATS.map(cat => (
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
    </div>
  )
}

export default Catlist