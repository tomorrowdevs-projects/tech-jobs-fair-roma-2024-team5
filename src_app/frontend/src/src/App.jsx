import React from "react";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import PasswordReset from "./components/Auth/resetPassword";
import Auth from "./pages/Auth";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CreateHabit from "./pages/CreateHabit";
import NotificationsPage from "./pages/NotificationsPage";
import BaseLayout from "./layouts/BaseLayout/BaseLayout";

const homeRouter = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Home />
  // },
  {
element: <BaseLayout></BaseLayout>,
    children: [{
      path: "/auth",
      element: <Auth />,
      children: [
        {
          path: "/auth/login",
          element: <Login />,
        },
        {
          path: "/auth/register",
          element: <Register />,
        },
        {
          path: "/auth/reset-password",
          element: <PasswordReset />,
        }
      ],
    },
    {
      element: <ProtectedRoute></ProtectedRoute>,
      children: [
        {
          path: "/",
          element: <Dashboard></Dashboard>,
        },
        {
          path: "/home",
          element: <Home></Home>,
        },
        {
          path: "/habits/create",
          element: <CreateHabit></CreateHabit>,
        },
        {
          path: "/notifications/",
          element: <NotificationsPage></NotificationsPage>,
        },
      ],
    },]
  }

  // {
  //   path: "/dashboard",
  //   element: <Dashboard />
  // },
]);

// --open /auth/login
function App() {
  return (
    <>
      <RouterProvider router={homeRouter} />
    </>
  );
}

export default App;
