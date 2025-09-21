import { Card, Col } from "react-bootstrap";
import { Player } from "../../types/DeathcounterTypes";

interface BossInfoProps {
  player: Player;
}

function BossInfo({ player }: BossInfoProps) {
  const current = player.bosses[player.currentBoss];
  let total = 0;
  player.bosses.forEach((b) => {
    total += b.deaths.length - 1;
    if (b.deaths.includes(0) && b.deaths.length - 1 > 0 && b.name !== "Other Monsters or Heights") {
      total--;
    }
  });
  let bossDeaths = current.deaths.length - 1;
  if (
    current.deaths.includes(0) &&
    bossDeaths > 0 &&
    current.name !== "Other Monsters or Heights"
  ) {
    bossDeaths--;
  }
  return (
    <Col xs={8} className="w-25">
      <Card className="BossCard">
        <Card.Body>
          <Card.Text>
            Total Deaths: {total}
            <br />
            {current.name} Deaths: {bossDeaths}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default BossInfo;
