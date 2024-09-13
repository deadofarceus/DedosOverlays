import { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useQuery } from "../../../types/UsefulFunctions";

function AddForm() {
  const [group, setGroup] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const query = useQuery();
  const adminKey = query.get("adminKey");

  const handleSubmit = () => {
    fetch(
      `https://dedosserver.deno.dev/database/add/${group}/${key}?adminKey=${adminKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value }),
      }
    )
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setResponse(data);
      });
  };

  return (
    <Container className="centerC w-100">
      <h3>Add to Database</h3>
      <Form className="w-100">
        <Row className="centerR w-100" md={3}>
          <Form.Group className="centerC">
            <Form.Label className="blackOutline">Group:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Group"
              value={group}
              id="databaseGroup"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setGroup(e.target.value)
              }
            />
          </Form.Group>
          <Form.Group className="centerC">
            <Form.Label className="blackOutline">Key:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter key"
              value={key}
              id="databaseKey"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setKey(e.target.value)
              }
            />
          </Form.Group>
          <Form.Group className="centerC">
            <Form.Label className="blackOutline">Value:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Value"
              value={value}
              id="databaseValue"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
            />
          </Form.Group>
        </Row>
      </Form>
      <h3 className="blackOutline">Generated Entry</h3>
      <Form.Control
        type="text"
        value={`[${group}, ${key}] = ${value}`}
        readOnly
        aria-describedby="basic-addon2"
        className="link"
      />
      <p>{response}</p>
      <Button
        size="lg"
        variant="success"
        className="blackOutline m-4"
        onClick={handleSubmit}
      >
        Add Entry
      </Button>
    </Container>
  );
}

export default AddForm;
