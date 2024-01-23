import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Main from './components/Layout/Main/Main.jsx';
import Home from './components/Pages/Home/Home.jsx';
import Registration from './components/Pages/Home/Registration.jsx';
import Login from './components/Pages/Login/Login.jsx';
import Owner from './components/Layout/Owner/Owner.jsx';
import OwnDashboard from './components/Pages/OwnDashboard/OwnDashboard.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
     children: [
      {
        path: '/',
        element: <Home></Home>,
       
      },{
        path : '/login',
        element : <Login></Login>
      },{
        path : '/registration',
        element : <Registration></Registration>
      }
    ],
  },
  {
    path : "/House_Owner/dashboard",
    element : <Owner></Owner>,
    children : [
      {
        path : '/House_Owner/dashboard',
        element : <OwnDashboard></OwnDashboard>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
