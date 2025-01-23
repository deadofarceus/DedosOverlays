import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./styles/util.css";
import "./styles/PrideStyles.css";
import EloOverlay from "./pages/EloOverlay";
import EloOverlayTutorial from "./pages/EloOverlayTutorial";
import Home from "./pages/Home";
import ErrorPage from "./ErrorPage";
import FiveVFiveOverlay from "./pages/FiveVFiveOverlay";
import FiveVFiveMod from "./pages/FiveVFiveMod";
import AbisZOverlay from "./pages/AbisZOverlay";
import Help from "./pages/Help";
import PCTurnier from "./pages/PCTurnier";
import GamingTierlist from "./pages/GamingTierlist";
import RandomCharGen from "./pages/RandomCharGen";
import Deathcounter from "./pages/Deathcounter";
import DeathOverlay from "./components/Deathcounter/overlay/DeathOverlay";
import DeathcounterMod from "./components/Deathcounter/DeathcounterMod";
import PercentageOverlay from "./components/Deathcounter/overlay/PercentageOverlay";
import AdminControl from "./pages/AdminControl";
import Impressum from "./pages/Impressum";
import Mapcover from "./pages/Mapcover";
import MapcoverTutorial from "./pages/MapcoverTutorial";
import GlobalScreensaver from "./pages/GlobalScreensaver";
import ScreensaverTutorial from "./pages/ScreensaverTutorial";
import WorldsCoCast from "./pages/WorldsCoCast";
import WorldsCoCastMod from "./pages/WorldsCoCastMod";
import GuessTheSub from "./pages/GuessTheSub";
import ChatBravery from "./pages/ChatBravery";
import OTPRace from "./pages/OTPRace";
import VTuber from "./pages/VTuber";
import GrindChallenge from "./pages/GrindChallenge";
import NoDeathRun from "./pages/NoDeathRun";

function App() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="errorpage" element={<ErrorPage />} />
        {/* <Route path="about" element={<About />} /> */}
        <Route path="help" element={<Help />} />
        <Route path="imprint" element={<Impressum />} />
        <Route path="AdminControl" element={<AdminControl />} />
        <Route path="Screensaver" element={<GlobalScreensaver />} />
        <Route path="ScreensaverTutorial" element={<ScreensaverTutorial />} />
        <Route path="5v5">
          <Route path="Mod" element={<FiveVFiveMod />} />
          <Route path="Overlay" element={<FiveVFiveOverlay />} />
        </Route>
        <Route path="DeathCounter">
          <Route index element={<Deathcounter />} />
          <Route path="mod" element={<DeathcounterMod />} />
          <Route path="overlay" element={<DeathOverlay />} />
          <Route path="hpoverlay" element={<PercentageOverlay />} />
        </Route>
        <Route path="EloOverlay">
          <Route index element={<EloOverlayTutorial />} />
          <Route path=":queueType" element={<EloOverlay />} />
        </Route>
        <Route path="AbisZ">
          <Route path=":accountName" element={<AbisZOverlay />} />
        </Route>
        <Route path="OTPRace">
          <Route path=":accountName" element={<OTPRace />} />
        </Route>
        <Route path="Grindchallenge">
          <Route path=":streamer" element={<GrindChallenge />} />
        </Route>
        <Route path="mapcover">
          <Route index element={<MapcoverTutorial />} />
          <Route path=":game" element={<Mapcover />} />
        </Route>
        <Route path="PCTurnier">
          <Route path=":mod" element={<PCTurnier />} />
        </Route>
        <Route path="GuessTheSub" element={<GuessTheSub />} />
        <Route path="ChatBravery" element={<ChatBravery />} />
        <Route path="NoDeathRun" element={<NoDeathRun />} />
        <Route path="WorldsCoCast">
          <Route index element={<WorldsCoCast />} />
          <Route path="mod" element={<WorldsCoCastMod />} />
        </Route>
        <Route path="Stream">
          <Route path="randomChar" element={<RandomCharGen />} />
          <Route path="VTuber" element={<VTuber />} />
          <Route path="GamingTierlist">
            <Route path=":streamer" element={<GamingTierlist />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
