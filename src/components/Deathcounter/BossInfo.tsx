import { Card, Col } from "react-bootstrap";
import { PlayerD } from "../../types/DeathcounterTypes";

function BossInfo({ player }: PlayerD) {
  const current = player.bosses[player.currentBoss];
  let total = 0;
  player.bosses.forEach((b) => (total += b.deaths.length - 1));
  return (
    <Col xs={8} className="w-25">
      <Card className="BossCard">
        <Card.Body>
          <Card.Text>
            Total Deaths: {total}
            <br />
            {current.name} Deaths: {current.deaths.length - 1}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default BossInfo;
