import { Button, Col, Container, Row } from "react-bootstrap";
import { ClientD } from "../../../types/AdminTypes";

function Client({ client }: ClientD) {
  return (
    <Container className="centerC w-100 blackOutline">
      <Row className="client w-75">
        <Col>
          <h4>{client.uuid}</h4>
          <h5>{client.id}</h5>
          <p>
            KEY: {client.key}
            <br />
            Summonername: {client.summonerName}
            <br />
            Tagline: {client.tagline}
            <br />
            QueueID: {client.queueId}
            <br />
            Region: {client.region}
            <br />
          </p>
        </Col>
        <Col>
          <Button size="lg" variant="success" className=" m-1">
            Reload
          </Button>
          <Button size="lg" variant="danger">
            Disconnect
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Client;
