import { Route } from "react-router-dom";
import { lazy } from "react";
import Deathcounter from "../pages/Deathcounter";

const DeathcounterMod = lazy(() => import("../components/Deathcounter/DeathcounterMod"));
const DeathOverlay = lazy(() => import("../components/Deathcounter/overlay/DeathOverlay"));
const PercentageOverlay = lazy(
  () => import("../components/Deathcounter/overlay/PercentageOverlay")
);

export function deathcounterRoutes() {
  return (
    <Route path="deathcounter">
      <Route index element={<Deathcounter />} />
      <Route path="mod" element={<DeathcounterMod />} />
      <Route path="overlay" element={<DeathOverlay />} />
      <Route path="hpoverlay" element={<PercentageOverlay />} />
    </Route>
  );
}
