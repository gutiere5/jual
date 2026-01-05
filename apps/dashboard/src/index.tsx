import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import ContentContainer, { contentItemsLoader } from './routes/ContentContainer.tsx';
import ErrorPage from './routes/ErrorPage.tsx';
import App from './App.tsx';
import ItemDetails, { itemLoader } from './routes/items/ItemDetails.tsx';
import EditItem, { editItemAction } from './routes/items/EditItem.tsx';

const router = createBrowserRouter([
  {
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: ContentContainer, loader: contentItemsLoader },
      // { path: 'personal', Component: PersonalComponent }, // Add these
      // { path: 'security', Component: SecurityComponent },
      {
        path: 'items/:itemId',
        Component: ItemDetails,
        loader: itemLoader,
      },
      {
        path: 'items/:itemId/edit',
        Component: EditItem,
        loader: itemLoader,
        action: editItemAction,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
