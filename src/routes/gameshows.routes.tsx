import { Route } from "react-router-dom";
import { lazy } from "react";

const DDFController = lazy(() => import("../components/gameshows/ddf/DDFController"));
const DDFOverlay = lazy(() => import("../components/gameshows/ddf/DDFOverlay"));

const AIcController = lazy(() => import("../components/gameshows/kiKombiniert/AIcController"));
const AIcTeilnehmer = lazy(() => import("../components/gameshows/kiKombiniert/AIcTeilnehmer"));
const AIcOverlay = lazy(() => import("../components/gameshows/kiKombiniert/AIcOverlay"));

const JepoardyController = lazy(
  () => import("../components/gameshows/jepoardy/JepoardyController")
);
const JepoardyTeilnehmer = lazy(
  () => import("../components/gameshows/jepoardy/JepoardyTeilnehmer")
);
const JepoardyOverlay = lazy(() => import("../components/gameshows/jepoardy/JepoardyOverlay"));

const BuzzerController = lazy(() => import("../components/gameshows/buzzer/BuzzerController"));
const BuzzerTeilnehmer = lazy(() => import("../components/gameshows/buzzer/BuzzerTeilnehmer"));

export function gameshowRoutes() {
  return (
    <Route path="gameshows">
      <Route path="ddf">
        <Route path="admin" element={<DDFController />} />
        <Route path="overlay" element={<DDFOverlay />} />
      </Route>

      <Route path="aicombine">
        <Route path="admin" element={<AIcController />} />
        <Route path="teilnehmer" element={<AIcTeilnehmer />} />
        <Route path="overlay" element={<AIcOverlay />} />
      </Route>
      <Route path="jepoardy">
        <Route path="admin" element={<JepoardyController />} />
        <Route path="teilnehmer" element={<JepoardyTeilnehmer />} />
        <Route path="overlay" element={<JepoardyOverlay />} />
      </Route>
      <Route path="buzzer">
        <Route path="admin" element={<BuzzerController />} />
        <Route path="teilnehmer" element={<BuzzerTeilnehmer />} />
      </Route>
    </Route>
  );
}
