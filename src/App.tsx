import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./styles/util.css";
import "./styles/PrideStyles.css";
import EloOverlay from "./pages/EloOverlay";
import EloOverlayTutorial from "./pages/EloOverlayTutorial";
import Home from "./pages/Home";
import ErrorPage from "./ErrorPage";
import AbisZOverlay from "./pages/AbisZOverlay";
import Help from "./pages/Help";
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
import GuessTheSub from "./pages/GuessTheSub";
import ChatBravery from "./pages/ChatBravery";
import OTPRace from "./pages/OTPRace";
import VTuber from "./pages/VTuber";
import NoDeathRun from "./pages/NoDeathRun";
import TeamElo from "./pages/TeamElo";
import Soullink from "./components/soullink/Soullink";
import SoullinkLogin from "./components/soullink/SoullinkLogin";
import SoullinkOverlay from "./components/soullink/SoullinkOverlay";
import SoullinkTeam from "./components/soullink/team/SoullinkTeam";
import SoullinkTutorial from "./components/soullink/team/SoullinkTutorial";

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
        <Route path="Pokemon">
          <Route path="Soullink">
            <Route index element={<Soullink />} />
            <Route path="login" element={<SoullinkLogin />} />
            <Route path="overlay" element={<SoullinkOverlay />} />
            <Route path="Team">
              <Route index element={<SoullinkTeam />} />
              <Route path="Tutorial" element={<SoullinkTutorial />} />
            </Route>
          </Route>
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
        <Route path="TeamElo">
          <Route path=":team" element={<TeamElo />} />
        </Route>
        <Route path="mapcover">
          <Route index element={<MapcoverTutorial />} />
          <Route path=":game" element={<Mapcover />} />
        </Route>
        <Route path="GuessTheSub" element={<GuessTheSub />} />
        <Route path="ChatBravery" element={<ChatBravery />} />
        <Route path="NoDeathRun" element={<NoDeathRun />} />
        <Route path="Stream">
          <Route path="randomChar" element={<RandomCharGen />} />
          <Route path="VTuber" element={<VTuber />} />
        </Route>
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
