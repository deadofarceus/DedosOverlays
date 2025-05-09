import { Container } from "react-bootstrap";
import "../styles/AdminControl.css";
import Database from "../components/admin/database/Database";
import { useEffect } from "react";
import { useQuery } from "../types/UsefulFunctions";
import ClientControl from "../components/admin/Clients/ClientControl";
import { GLOBALADDRESS } from "../types/WebsocketTypes";

function AdminControl() {
  document.body.className = "noOBS";
  const query = useQuery();
  const adminKey = query.get("adminKey");
  useEffect(() => {
    document.title = "Admin Control";
    fetch(`https://${GLOBALADDRESS}/admin/grantAccess?adminKey=${adminKey}`)
      .then((res) => {
        if (res.status === 200) {
          console.log("Access Granted");
        } else {
          console.log(res);

          //   window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error);
        // window.location.href = "/";
      });
  }, [adminKey]);
  return (
    <Container className="AdminControl centerC w-100">
      <h1>ControlPanel</h1>
      <ClientControl />
      <Database />
    </Container>
  );
}

export default AdminControl;
