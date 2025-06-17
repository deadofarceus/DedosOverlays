import { Button, Container } from "react-bootstrap";
import { Route, Trainer } from "../../../types/Pokemon";
import { useState } from "react";

interface NewRouteInputProps {
  onAddRoute: (route: Route) => void;
  onReset: () => void;
  trainers: Trainer[];
}

function NewRouteInput({ onAddRoute, onReset, trainers }: NewRouteInputProps) {
  const [routeName, setRouteName] = useState("");

  const handleAddRoute = () => {
    if (routeName === "") return;
    const newRoute = new Route(routeName, trainers);
    onAddRoute(newRoute);
    setRouteName("");
  };

  const handleReset = () => {
    if (confirm("Are you sure you want a full reset of the nuzlock?")) {
      onReset();
    }
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
      <Button variant="danger" onClick={handleReset} className="nuzlockResetButton">
        FULL RESET
      </Button>
      <div className="soullinkInstructions">
        <h3>Special Instructions</h3>
        <p>
          1. Click on the player-names and change them, press Enter and they are saved
          <br />
          2. Click on the pokemon-names and change them, press Enter and they are saved
        </p>
      </div>
    </Container>
  );
}

export default NewRouteInput;
