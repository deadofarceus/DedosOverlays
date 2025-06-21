import { useState } from "react";
import { Route, Trainer } from "../../../types/Pokemon";
import { Button } from "react-bootstrap";

interface RouteManagerProps {
  trainers: Trainer[];
  onAddRoute: (route: Route) => void;
  setFilterWord: (word: string) => void;
}

function RouteManager({ trainers, onAddRoute, setFilterWord }: RouteManagerProps) {
  const [routeName, setRouteName] = useState("");
  const [filter, setFilter] = useState("");

  const handleAddRoute = () => {
    if (routeName === "") return;
    const newRoute = new Route(routeName, trainers);
    onAddRoute(newRoute);
    setRouteName("");
  };

  const handleFilter = (filterW: string) => {
    setFilterWord(filterW);
    setFilter(filterW);
  };

  return (
    <div className="route-Manager">
      <input
        type="text"
        placeholder="Route Name"
        value={routeName}
        onChange={(e) => setRouteName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddRoute();
          }
        }}
      />

      <Button variant="success" onClick={handleAddRoute} className="m-3">
        ADD
      </Button>
      <div>Filter by route/name/nickname:</div>
      <input
        type="text"
        placeholder="filter..."
        value={filter}
        onChange={(e) => handleFilter(e.target.value)}
      />
    </div>
  );
}

export default RouteManager;
