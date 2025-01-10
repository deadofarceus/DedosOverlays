import { Container } from "react-bootstrap";
import "../styles/grindchallenge.css";
import Climber, {
  ClimberProps,
} from "../components/league/grindchallenge/Climber";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function GrindChallenge() {
  const [climbers, setClimbers] = useState<ClimberProps[]>([]);
  const iconMap = new Map<string, string>();
  iconMap.set(
    "Karni",
    "https://static-cdn.jtvnw.net/jtv_user_pictures/4fb151e7-be38-44c7-a31a-d00fd265fa0f-profile_image-300x300.png"
  );
  iconMap.set(
    "kutcherlol",
    "https://static-cdn.jtvnw.net/jtv_user_pictures/4fb151e7-be38-44c7-a31a-d00fd265fa0f-profile_image-300x300.png"
  );
  iconMap.set(
    "Sola",
    "https://static-cdn.jtvnw.net/jtv_user_pictures/4fb151e7-be38-44c7-a31a-d00fd265fa0f-profile_image-300x300.png"
  );
  iconMap.set(
    "Obsess3",
    "https://static-cdn.jtvnw.net/jtv_user_pictures/4fb151e7-be38-44c7-a31a-d00fd265fa0f-profile_image-300x300.png"
  );
  iconMap.set(
    "RevalLoL",
    "https://static-cdn.jtvnw.net/jtv_user_pictures/4fb151e7-be38-44c7-a31a-d00fd265fa0f-profile_image-300x300.png"
  );
  iconMap.set(
    "Broeki",
    "https://static-cdn.jtvnw.net/jtv_user_pictures/4fb151e7-be38-44c7-a31a-d00fd265fa0f-profile_image-300x300.png"
  );
  iconMap.set(
    "SGAhri",
    "https://static-cdn.jtvnw.net/jtv_user_pictures/4fb151e7-be38-44c7-a31a-d00fd265fa0f-profile_image-300x300.png"
  );
  iconMap.set(
    "Thunny",
    "https://static-cdn.jtvnw.net/jtv_user_pictures/4fb151e7-be38-44c7-a31a-d00fd265fa0f-profile_image-300x300.png"
  );
  iconMap.set(
    "Autophil",
    "https://static-cdn.jtvnw.net/jtv_user_pictures/4fb151e7-be38-44c7-a31a-d00fd265fa0f-profile_image-300x300.png"
  );
  iconMap.set(
    "LPGjustJohnny",
    "https://static-cdn.jtvnw.net/jtv_user_pictures/4fb151e7-be38-44c7-a31a-d00fd265fa0f-profile_image-300x300.png"
  );
  iconMap.set(
    "TwoStoneLoL",
    "https://static-cdn.jtvnw.net/jtv_user_pictures/4fb151e7-be38-44c7-a31a-d00fd265fa0f-profile_image-300x300.png"
  );
  iconMap.set(
    "SirRaydus",
    "https://static-cdn.jtvnw.net/jtv_user_pictures/4fb151e7-be38-44c7-a31a-d00fd265fa0f-profile_image-300x300.png"
  );

  const fetchAllPlayers = async () => {
    try {
      const response = await fetch(
        "https://backend.grindchallenge.de/wp-json/challenge/v1/player-stats"
      );
      const data = await response.json();
      const climbersData: ClimberProps[] = data.map(
        (climber: any, index: number) => ({
          streamer: climber.streamer,
          elo: {
            rank: climber.tier,
            tier: climber.rank,
            lp: climber.lp,
          },
          today: climber.elo - climber.startelo,
          matchhistory: Array(5).fill(true),
          icon: `https://grindchallenge.de/avatar/${climber.streamer.toLowerCase()}.png`,
          place: index + 1,
        })
      );

      for (let i = 0; i < climbersData.length; i++) {
        const climber = climbersData[i];
        const response = await fetch(
          "https://backend.grindchallenge.de/wp-json/challenge/v1/player/" +
            climber.streamer
        );
        const data = await response.json();
        const matchhistory = data.games.map(
          (match: any) => match.didwin === "1"
        );
        matchhistory.reverse();
        climber.matchhistory = matchhistory;
      }

      setClimbers(climbersData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data from the API
    fetchAllPlayers();
    setInterval(fetchAllPlayers, 30000);
  }, []);

  const { streamer } = useParams();

  const ownClimber = climbers.find((c) => c.streamer === streamer)!;
  const ownIndex = climbers.findIndex((c) => c.streamer === streamer);

  climbers.splice(5);
  if (ownIndex > 4) {
    climbers.push(ownClimber);
  }

  return (
    <Container className="GC-container">
      {climbers.map((data, index) => (
        <Climber
          key={index}
          place={index + 1}
          streamer={data.streamer}
          matchhistory={data.matchhistory}
          icon={data.icon}
          elo={data.elo}
          today={data.today}
        />
      ))}
    </Container>
  );
}
export default GrindChallenge;
