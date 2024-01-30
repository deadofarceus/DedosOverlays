import { RouterProvider, createBrowserRouter } from "react-router-dom";
import League from "./components/league/League";
import "./App.css";
import ErrorPage from "./ErrorPage";
import EloOverlay from "./pages/EloOverlay";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!TEST</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/league",
    element: <League />,
  },
  {
    path: "/EloOverlay*",
    element: <EloOverlay />,
  },
  {
    path: "/errorpage",
    element: <ErrorPage />,
  },
  {
    path: "/league*",
    element: <League />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
