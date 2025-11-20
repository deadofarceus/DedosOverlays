import { Route } from "react-router-dom";
import { lazy } from "react";

const RandomCharGen = lazy(() => import("../pages/RandomCharGen"));
const VTuber = lazy(() => import("../pages/VTuber"));
const Powerpicks = lazy(() => import("../pages/Powerpicks"));

export function streamRoutes() {
  return (
    <Route path="stream">
      <Route path="randomchar" element={<RandomCharGen />} />
      <Route path="vtuber" element={<VTuber />} />
      <Route path="powerpicks" element={<Powerpicks />} />
    </Route>
  );
}
