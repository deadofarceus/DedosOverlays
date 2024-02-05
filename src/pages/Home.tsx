import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const nav = useNavigate();
  useEffect(() => {
    nav("/EloOverlay");
  }, [nav]);

  return <h1> HALLOOOOO HOME </h1>;
}

export default Home;
