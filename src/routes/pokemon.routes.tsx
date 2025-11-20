import { Route } from "react-router-dom";
import { lazy } from "react";

const Soullink = lazy(() => import("../components/soullink/Soullink"));
const SoullinkLogin = lazy(() => import("../components/soullink/SoullinkLogin"));
const SoullinkOverlay = lazy(() => import("../components/soullink/SoullinkOverlay"));
const SoullinkTeam = lazy(() => import("../components/soullink/team/SoullinkTeam"));
const SoullinkTutorial = lazy(() => import("../components/soullink/team/SoullinkTutorial"));

export function pokemonRoutes() {
  return (
    <Route path="pokemon">
      <Route path="soullink">
        <Route index element={<Soullink />} />
        <Route path="login" element={<SoullinkLogin />} />
        <Route path="overlay" element={<SoullinkOverlay />} />
        <Route path="team">
          <Route index element={<SoullinkTeam />} />
          <Route path="tutorial" element={<SoullinkTutorial />} />
        </Route>
      </Route>
    </Route>
  );
}
