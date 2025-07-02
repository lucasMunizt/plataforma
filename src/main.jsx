import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';
import App from './App.jsx';
import Login from './telas/Login.jsx';
import Calendario from './telas/Calendario.jsx';
import Garantia from './telas/Garantia.jsx';
import OrdemServico from './telas/OrdemServico.jsx';
import DadosGet from './telas/getDados/DadosGet.jsx';
import PrivateRoute from './PrivateRoute.jsx'; // importar aqui

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Login /> },
      { path: 'login', element: <Login /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: 'home', element: <Calendario /> },
          { path: 'garantia', element: <Garantia /> },
          { path: 'ordemservico', element: <OrdemServico /> },
          { path: 'dados', element: <DadosGet /> }
        ]
      }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
