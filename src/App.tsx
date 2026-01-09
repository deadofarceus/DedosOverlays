import "./App.css";
import "./styles/util.css";
import "./styles/PrideStyles.css";
import "./styles/Help.css";

import "bootstrap/dist/css/bootstrap-grid.css";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import { deathcounterRoutes } from "./routes/deathcounter.routes";
import { pokemonRoutes } from "./routes/pokemon.routes";
import { gameshowRoutes } from "./routes/gameshows.routes";
import { streamRoutes } from "./routes/stream.routes";
import FillToMaster from "./pages/FillToMaster";

const Home = lazy(() => import("./pages/Home"));
const ErrorPage = lazy(() => import("./ErrorPage"));
const Help = lazy(() => import("./pages/Help"));
const Impressum = lazy(() => import("./pages/Impressum"));
const AdminControl = lazy(() => import("./pages/AdminControl"));

const GlobalScreensaver = lazy(() => import("./pages/GlobalScreensaver"));
const ScreensaverTutorial = lazy(() => import("./pages/ScreensaverTutorial"));

const Mapcover = lazy(() => import("./pages/Mapcover"));
const MapcoverTutorial = lazy(() => import("./pages/MapcoverTutorial"));

const AbisZOverlay = lazy(() => import("./pages/AbisZOverlay"));
const NoDeathRun = lazy(() => import("./pages/NoDeathRun"));
const GuessTheSub = lazy(() => import("./pages/GuessTheSub"));
const TeamElo = lazy(() => import("./pages/TeamElo"));

const EloOverlay = lazy(() => import("./pages/EloOverlay"));
const EloOverlayTutorial = lazy(() => import("./pages/EloOverlayTutorial"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />

          <Route path="help" element={<Help />} />
          <Route path="imprint" element={<Impressum />} />
          <Route path="admincontrol" element={<AdminControl />} />

          <Route path="screensaver" element={<GlobalScreensaver />} />
          <Route path="screensaver/tutorial" element={<ScreensaverTutorial />} />

          {gameshowRoutes()}
          {pokemonRoutes()}
          {deathcounterRoutes()}
          {streamRoutes()}

          <Route path="filltomaster/:accountName" element={<FillToMaster />} />
          <Route path="abisz/:accountName" element={<AbisZOverlay />} />
          <Route path="teamelo/:team" element={<TeamElo />} />

          <Route path="elooverlay">
            <Route index element={<EloOverlayTutorial />} />
            <Route path=":queuetype" element={<EloOverlay />} />
          </Route>

          <Route path="mapcover">
            <Route index element={<MapcoverTutorial />} />
            <Route path=":game" element={<Mapcover />} />
          </Route>

          <Route path="guessthesub" element={<GuessTheSub />} />
          <Route path="nodeathrun" element={<NoDeathRun />} />
        </Route>

        <Route path="/errorpage" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
