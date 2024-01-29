import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import League from './league/League';

const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
    {
        path: "/league",
        element: <League />,
    },
  ]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
