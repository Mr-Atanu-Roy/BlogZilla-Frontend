import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './styles.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { Toaster } from "@/components/ui/toaster"

import App from './App'
import AuthApp from './AuthApp'
import {
  Home,
  Dashboard,
  ListBlogs,
  WriteBlogs, ReadBlog, EditBlog,
  PageNotFound,
  ResetPassword, ResetPasswordRedirect,
  EmailVerify, EmailVerifyRedirect,
  AuthorProfile,
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
            path: ":uuid",
            element: <ReadBlog />,
          },
          {
            path: "write",
            element: <WriteBlogs />,
          },
          {
            path: "edit/:uuid",
            element: <EditBlog />,
          },
          {
            path: "latest",
            element: <ListBlogs type="latest" />,
          },
          {
            path: "tags/:tag",
            element: <ListBlogs type="tags" />,
          },
        ]
      },
      {
        path: "author/",
        errorElement: <PageNotFound />,
        children: [
          {
            path: ":uuid",
            element: <AuthorProfile />,
          },
          {
            path: "country/:country",
            element: <h1>Author Country</h1>,
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
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
      <Toaster />
    </Provider>,
  {/* </React.StrictMode>, */}
)
