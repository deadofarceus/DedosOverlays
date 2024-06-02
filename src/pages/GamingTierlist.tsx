import { Button, Container } from "react-bootstrap";
import RadarGraph from "../components/GamingTierlist/RadarGraph";
import Profile from "../components/GamingTierlist/Profile";
import { useNavigate, useParams } from "react-router-dom";
import { STREAMER } from "../types/GamingTierlistTypes";
import { useEffect, useState } from "react";
import "../styles/GamingTierlist.css";

function GamingTierlist() {
  document.body.className = "noOBS";
  const nav = useNavigate();
  const { streamer } = useParams();
  const index = getStreamer(streamer!);
  const [values, setValues] = useState([1, 1, 1, 1, 1, 1]);

  useEffect(() => {
    const savedStats = localStorage.getItem(
      "gamingtierlist" + STREAMER[index].id
    );
    console.log("yooooo", savedStats);

    if (savedStats) {
      const startStats: number[] = JSON.parse(savedStats);
      setValues(startStats);
    } else {
      setValues([1, 1, 1, 1, 1, 1]);
    }
  }, [index, streamer]);

  return (
    <Container className="centerR w-100 tierlistC">
      <Profile
        name={STREAMER[index].name}
        id={STREAMER[index].id}
        values={values}
        callback={setValues}
      />
      <RadarGraph values={values} />
      <Button
        size="lg"
        className="nextStreamer"
        onClick={() =>
          nav(
            "/Stream/GamingTierlist/" +
              STREAMER[(index + 1) % STREAMER.length].name
          )
        }
      >
        Nächster Streamer
      </Button>
    </Container>
  );
}

function getStreamer(s: string) {
  let found = STREAMER[0];
  const search = STREAMER.find((st) => st.name === s);
  if (search) {
    found = search;
  }
  return STREAMER.indexOf(found);
}

export default GamingTierlist;
