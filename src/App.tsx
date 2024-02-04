import { Route, Routes } from "react-router-dom";
import "./App.css";
import EloOverlay from "./pages/EloOverlay";
import EloOverlayTutorial from "./pages/EloOverlayTutorial";
import Home from "./pages/Home";
import About from "./pages/About";
import ErrorPage from "./ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="errorpage" element={<ErrorPage />} />
        <Route path="about" element={<About />} />
      </Route>
      <Route path="/EloOverlay">
        <Route index element={<EloOverlayTutorial />} />
        <Route path=":queueType" element={<EloOverlay />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
