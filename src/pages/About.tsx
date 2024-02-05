import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const nav = useNavigate();

  useEffect(() => {
    nav("/EloOverlay");
  }, [nav]);

  return <h1> HALLOOOOO About</h1>;
}

export default About;
