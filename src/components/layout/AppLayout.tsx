import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import ProgressBar from '@components/common/ProgressBar/ProgressBar';
import PageHeading from '@components/common/PageHeading/PageHeading';
import { useAppSelector } from '@store/hooks';

const AppLayout = () => {
  const headerTitle = useAppSelector((state) => state.header.title);
  document.title = `Meowbase | ${headerTitle}`;

  return (
    <div className="app-layout">
      <ProgressBar />
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