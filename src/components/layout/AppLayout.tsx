import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import PageHeading from '@components/common/PageHeading/PageHeading';

const AppLayout = () => {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <PageHeading />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout