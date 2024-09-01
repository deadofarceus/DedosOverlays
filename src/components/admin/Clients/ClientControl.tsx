import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useQuery } from "../../../types/UsefulFunctions";
import Client from "./Client";
import { WSClient } from "../../../types/AdminTypes";

function ClientControl() {
  const [clients, setClients] = useState<WSClient[]>([]);
  const query = useQuery();
  const adminKey = query.get("adminKey");
  useEffect(() => {
    document.title = "Admin Control";
    fetch(
      `https://dedosserver.deno.dev/admin/websocket/clients?adminKey=${adminKey}`
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.log(res);
          //   window.location.href = "/";
        }
      })
      .then((data) => {
        console.log("DATA", data);

        if (data) {
          setClients(data);
        }
      })
      .catch((error) => {
        console.log(error);
        // window.location.href = "/";
      });
  }, [adminKey]);
  return (
    <Container className="centerC w-100 blackOutline clientControl">
      <h1>Client Control</h1>
      <span>Number of Clients connected: {clients.length}</span>
      {clients.map((client, index) => (
        <Client key={index} client={client} />
      ))}
    </Container>
  );
}

export default ClientControl;
