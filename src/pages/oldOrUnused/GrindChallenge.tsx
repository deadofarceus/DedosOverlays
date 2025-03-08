import { Container } from "react-bootstrap";
import "../../styles/oldOrUnused/grindchallenge.css";
import Member, { MemberProps } from "../../components/league/TeamElo/Member";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GLOBALADDRESS } from "../../types/WebsocketTypes";
import { Account } from "../../types/LeagueTypes";

function GrindChallenge() {
  const [climbers, setClimbers] = useState<MemberProps[]>([]);
  const iconMap = new Map<string, string>();
  iconMap.set("Karni", "karni");
  iconMap.set("Philly Westside", "kutcherlol");
  iconMap.set("Sola", "sola");
  iconMap.set("Obsess", "obsess3");
  iconMap.set("Reval", "revallol");
  iconMap.set("Broeki", "broeki");
  iconMap.set("SGAhri", "sgahri");
  iconMap.set("Thunny", "thunny");
  iconMap.set("Ichbinbesserals", "autophil");
  iconMap.set("Midlane Opa", "lpgjustjohnny");
  iconMap.set("TwoStone", "twostonelol");
  iconMap.set("Pusteblume", "sirraydus");

  const fetchAllPlayers = async () => {
    try {
      const response = await fetch(
        "https://" + GLOBALADDRESS + "/grindchallenge/requestUpdate"
      );
      const data: Account[] = await response.json();

      data.sort(
        (a, b) => b.leagueEntrys[0].combinedLP - a.leagueEntrys[0].combinedLP
      );

      const climbersData: MemberProps[] = data.map(
        (climber: Account, index: number) => ({
          streamer: climber.name,
          elo: {
            rank: climber.leagueEntrys[0].rank,
            tier: climber.leagueEntrys[0].tier,
            lp: climber.leagueEntrys[0].leaguePoints,
          },
          today:
            climber.leagueEntrys[0].combinedLP -
            climber.leagueEntrys[0].lpStart,
          matchhistory: climber.leagueEntrys[0].lastMatches
            .map((game) => game.win)
            .slice(-5),
          icon: `https://grindchallenge.de/avatar/${iconMap.get(
            climber.name
          )}.png`,
          place: index + 1,
        })
      );

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

  const ownClimber = climbers.find(
    (c) => iconMap.get(c.streamer!) === streamer
  )!;
  const ownIndex = climbers.findIndex(
    (c) => iconMap.get(c.streamer!) === streamer
  );

  console.log("ALL CLIMBERS", climbers);

  climbers.splice(5);
  if (ownIndex > 4) {
    climbers.push(ownClimber);
  }

  return (
    <Container className="GC-container">
      {climbers.map((data, index) => (
        <Member
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
