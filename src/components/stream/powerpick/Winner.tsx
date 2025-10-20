import { Button } from "react-bootstrap";

interface WinnerProps {
  winner: string;
  handleClose: () => void;
}

function Winner({ winner, handleClose }: WinnerProps) {
  return (
    <div className="powerpicks-winner-con">
      <div className="powerpicks-winner">
        <h3>Herzlichen Glückwunsch!</h3>
        <h1>{winner}</h1>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
      </div>
    </div>
  );
}

export default Winner;
