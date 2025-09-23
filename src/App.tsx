import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/routes';
import Toast from '@components/ui/Toast/Toast';
import '@styles/index.scss';

function App() {
  return (
    <>
      <Toast />
      <RouterProvider router={router} />
    </>
  )
}

export default App
