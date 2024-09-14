import React, { useEffect } from 'react';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Auth from './pages/Auth';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { trpc } from './lib/trpc';

const homeRouter = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Home />
  // },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth/login",
        element: <Login />
      },
      {
        path: "/auth/register",
        element: <Register />
      }
    ]
  },
  
  // {
  //   path: "/dashboard",
  //   element: <Dashboard />
  // },
]);
// --open /auth/login
function App() {
  
  useEffect(() => {
    (async() => {
      console.log(await trpc.habit.find.query({}))
    })();
  })

  return (

      <RouterProvider router={homeRouter} />

  );
}

export default App;
