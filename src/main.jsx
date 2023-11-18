import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Toaster } from "@/components/ui/toaster"

import App from './App'
import AuthApp from './AuthApp'
import {
  Home,
  Dashboard,
  WriteBlogs,
  PageNotFound,
  ResetPassword, ResetPasswordRedirect,
  EmailVerify, EmailVerifyRedirect
} from "./pages/index"


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "post/",
        errorElement: <PageNotFound />,
        children: [
          {
            path: "write",
            element: <WriteBlogs />,
          },
        ]
      },
      
    ],
  },
  {
    path: "/auth/",
    element: <AuthApp />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "reset-password/",
        element: <ResetPassword />,
      },
      {
        path: "reset-password/:uuid/:token",
        element: <ResetPasswordRedirect />,
      },
      {
        path: "verify-email/",
        element: <EmailVerify />,
      },
      {
        path: "verify-email/:uuid/:token",
        element: <EmailVerifyRedirect />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
      <Toaster />
    </Provider>
  </React.StrictMode>,
)
