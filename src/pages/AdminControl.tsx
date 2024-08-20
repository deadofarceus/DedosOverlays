import { Container } from "react-bootstrap";
import "../styles/AdminControl.css";
import Database from "../components/admin/database/Database";
import { useEffect } from "react";
import { useQuery } from "../types/UsefulFunctions";

function AdminControl() {
  document.body.className = "noOBS";
  const query = useQuery();
  const adminKey = query.get("adminKey");
  useEffect(() => {
    document.title = "Admin Control";
    fetch(`https://dedosserver.deno.dev/admin/grantAccess?adminKey=${adminKey}`)
      .then((res) => {
        if (res.status === 200) {
          console.log("Access Granted");
        } else {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error);
        window.location.href = "/";
      });
  }, [adminKey]);
  return (
    <Container className="AdminControl centerC w-100">
      <h1>ControlPanel</h1>
      <Database />
    </Container>
  );
}

export default AdminControl;
