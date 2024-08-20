import { Container } from "react-bootstrap";
import AddForm from "./AddForm";

function Database() {
  return (
    <Container className="centerC w-100 blackOutline">
      <h2>Database</h2>
      <p>Add/Change or delete something from the database</p>
      {/** Form to add/change something to database */}
      <AddForm />
      {/** list of all entrys with button to delete this entry from the database */}
    </Container>
  );
}

export default Database;
