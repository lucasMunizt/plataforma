import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import{createBrowserRouter,RouterProvider,Route} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import Login from './telas/Login.jsx'
import Calendario from './telas/Calendario.jsx'
import Garantia from './telas/Garantia.jsx'
import OrdemServico from './telas/OrdemServico.jsx'
import DadosGet from './telas/GetDados/DadosGet.jsx'



const router = createBrowserRouter([
  
  {
    path: '/',
    element: <App />, // Rota principal usando o componente App
    children: [
        {path:'login',element:<Login/>},
        {path:'home',element:<Calendario/>},
        {path:'garantia',element:<Garantia/>},
        {path:'ordemservico',element:<OrdemServico/>},
        {path:'dados',element:<DadosGet/>},


    ]
  }
])





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <RouterProvider router={router}/>
  </StrictMode>,
)
