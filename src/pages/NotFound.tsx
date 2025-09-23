import catNotFound from '@assets/404.png';

const NotFound = () => {
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