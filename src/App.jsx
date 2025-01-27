import './App.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import BuscaminasPage from './pages/BuscaminasPage';
import Perfil from './pages/Perfil';
import JuegosList from './components/Home/JuegosList';
import Layout from './pages/Layout';
import Home from './components/Home/Home';
import PrivateLayout from './pages/PrivateLayout';
import LoginInput from './components/Home/LoginInput';
import NotFoundPage from './pages/NotFoundPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginInput />,
      },
      {
        path: "/logout",
        element: <Home />,
      },
      {
        path: "/",
        element: <PrivateLayout />,
        children: [
          {
            path: "/perfil",
            element: <Perfil />,
          },
          {
            path: "/juegos",
            element: <JuegosList />,
          },
          {
            path: "/juegos/buscaminas",
            element: <BuscaminasPage />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App
