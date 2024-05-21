import { useParams } from "react-router-dom";
import ModAnsicht from "../components/PCTurnier/ModAnsicht";
import Overlay from "../components/PCTurnier/Overlay";
import "../styles/PCTurnier.css";

function PCTurnier() {
  const { mod } = useParams();
  if (mod === "mod") {
    return <ModAnsicht />;
  } else {
    return <Overlay />;
  }
}

export default PCTurnier;
