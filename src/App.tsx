import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes/routes';
import '@styles/index.scss';

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
