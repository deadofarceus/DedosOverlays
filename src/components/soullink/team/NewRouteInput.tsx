import { Button, Container } from "react-bootstrap";
import { Route, Trainer } from "../../../types/Pokemon";
import { useState } from "react";

interface NewRouteInputProps {
  onAddRoute: (route: Route) => void;
  trainers: Trainer[];
}

function NewRouteInput({ onAddRoute, trainers }: NewRouteInputProps) {
  const [routeName, setRouteName] = useState("");

  const handleAddRoute = () => {
    if (routeName === "") return;
    const newRoute = new Route(routeName, trainers);
    onAddRoute(newRoute);
    setRouteName("");
  };

  return (
    <Container className="new-route-input">
      <input
        type="text"
        placeholder="Route Name"
        value={routeName}
        onChange={(e) => setRouteName(e.target.value)}
        // on enter taste selbe wie auf den buttons
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddRoute();
          }
        }}
      />
      <Button variant="success" onClick={handleAddRoute}>
        ADD NEW ROUTE
      </Button>
    </Container>
  );
}

export default NewRouteInput;
