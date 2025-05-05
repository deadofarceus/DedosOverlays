import { Container } from "react-bootstrap";
import "../styles/TeamElo.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Account } from "../types/LeagueTypes";
import { GLOBALADDRESS } from "../types/WebsocketTypes";
import Member, { MemberProps } from "../components/league/TeamElo/Member";

const LoLProsIcons = new Map<string, string>([
  // puuid -> icon
  [
    "7DRQQCX8ZrHCQ8yaTZuynsrB_YTmycTHsHNlBrz_-jCT4MXZfqMwlGTmyi5CSLFu1NgZ-Vv4wbb5jw",
    "Pride",
  ],
  [
    "3r7bHpDlTFV94uQPdvEHQYGkSZKaXCQ03g5bGYT4zEDt76zcCTkor6o64HkxwFVKlFk6GPZx3DoD7g",
    "Santorin",
  ],
  [
    "fwH10FImq6GWqr4AoH64g6ndA_6cJkt9L17WDB1Ld7qRcIST4UrixZV-TjUcCsunC9ffSfuhTGXsTQ",
    "PowerOfEvil",
  ],
  [
    "44mx3kKkVnD_UnqwbgIbJB0b3SiWBuqBVASmxakQp051njT1cEtCYPegbsH-M_g0ABKBCDHG-i8HzA",
    "Broeki",
  ],
  [
    "9D_hYKnClvoNHCPpP4_wEvXX8oeBGpdOEOmmGPoscOxV7i3PfnCaG1dTeSN4mbUN9b6jtl2CHHKz_w",
    "LiLipp",
  ],
]);

function TeamElo() {
  const [members, setMembers] = useState<MemberProps[]>([]);
  const iconMap = new Map<string, string>();
  const { team } = useParams();

  const fetchAllPlayers = async () => {
    try {
      const response = await fetch(
        "https://" + GLOBALADDRESS + "/lol/TeamElo/" + team
      );
      const data = await response.json();

      console.log(data);

      data.members.sort(
        (a: any, b: any) =>
          b.leagueEntrys[0].combinedLP - a.leagueEntrys[0].combinedLP
      );

      const membersData: MemberProps[] = data.members.map(
        (member: Account, index: number) => ({
          streamer: member.name,
          elo: {
            rank: member.leagueEntrys[0].rank,
            tier: member.leagueEntrys[0].tier,
            lp: member.leagueEntrys[0].leaguePoints,
          },
          today:
            member.leagueEntrys[0].combinedLP - member.leagueEntrys[0].lpStart,
          matchhistory: member.leagueEntrys[0].lastMatches
            .map((game) => game.win)
            .slice(-5),
          icon: `../teams/${team}/${LoLProsIcons.get(member.puuid)}.png`,
          place: index + 1,
        })
      );

      setMembers(membersData);
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

  const ownClimber = members.find(
    (c) => iconMap.get(c.streamer!) === streamer
  )!;
  const ownIndex = members.findIndex(
    (c) => iconMap.get(c.streamer!) === streamer
  );

  console.log("ALL members", members);

  members.splice(5);
  if (ownIndex > 4) {
    members.push(ownClimber);
  }

  return (
    <Container className="GC-container">
      {members.map((data, index) => (
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
export default TeamElo;
