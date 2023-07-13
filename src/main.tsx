import React from 'react'
import ReactDOM from 'react-dom/client'
import ErrorPage from './ErrorPage'
import './index.css'

import Contact, {
  loader as contactLoader,
  action as contactAction,
} from './routes/contact'
import Root, { loader as rootLoader, action as rootAction } from './routes/root'
import Edit, { loader as editLoader, action as editAction } from './routes/edit'
import { action as destroyAction } from './routes/destroy'
import Index from './routes'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: 'contacts/:id',
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
            children: [
              {
                path: 'edit',
                element: <Edit />,
                loader: editLoader,
                action: editAction,
              },
              {
                path: 'destroy',
                action: destroyAction,
                errorElement: <div>Something went wrong</div>,
              },
            ],
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
