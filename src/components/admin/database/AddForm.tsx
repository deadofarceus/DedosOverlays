import { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { useQuery } from "../../../types/UsefulFunctions";
import { GLOBALADDRESS } from "../../../types/WebsocketTypes";

function AddForm() {
  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const query = useQuery();
  const adminKey = query.get("adminKey");

  const entry = {
    key: key,
    value: value,
  };

  const handleSubmit = () => {
    fetch(`https://${GLOBALADDRESS}/database/addKey`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        adminKey: adminKey || "",
      },
      body: JSON.stringify(entry),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setResponse(data);
      });
  };

  return (
    <Container className="centerC w-100">
      <h3>Add Key to Database</h3>
      <Form className="w-100">
        <Row className="centerR w-100" md={3}>
          <Form.Group className="centerC">
            <Row className="centerR w-100 m-1">
              <Form.Label className="blackOutline w-25">Key:</Form.Label>
              <Button
                className="w-25"
                onClick={() =>
                  setKey(
                    Math.random().toString(36).substring(2, 10) +
                      Math.random().toString(36).substring(2, 10)
                  )
                }
              >
                Randomize
              </Button>
            </Row>
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
            <Row className="centerR w-100 m-2">
              <Form.Label className="blackOutline">User:</Form.Label>
            </Row>
            <Form.Control
              type="text"
              placeholder="Enter User"
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
        value={`Key: ${key} User: ${value}`}
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
