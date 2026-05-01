import { useState, useEffect } from "react";
import "../styles/TeamVSTeam.css";
import { Account } from "../types/LeagueTypes";
import { GLOBALADDRESS } from "../types/WebsocketTypes";
import Role from "../components/league/TeamVSTeam/Role";

const ROLES = ["GMJgl", "GMMid", "GMBot", "GMSupp"];

interface Elo {
  rank: string;
  tier: string;
  lp: number;
}

export interface TVTMemberProps {
  elo: Elo;
  today: number;
  icon: string;
  matchhistory: boolean[];
  place: number;
  streamer: string;
  combinedLP: number;
}

function TeamVSTeam() {
  const [zwei, setZwei] = useState<TVTMemberProps[]>([]);
  const [nno, setNNO] = useState<TVTMemberProps[]>([]);

  const fetchTeam = async (team: string): Promise<TVTMemberProps[]> => {
    try {
      const response = await fetch("https://" + GLOBALADDRESS + "/lol/TeamElo/" + team);
      const data = await response.json();

      console.log(data);

      const membersData: TVTMemberProps[] = data.members.map((member: Account, index: number) => ({
        streamer: member.name,
        elo: {
          rank: member.leagueEntrys[0].rank,
          tier: member.leagueEntrys[0].tier,
          lp: member.leagueEntrys[0].leaguePoints,
        },
        combinedLP: member.leagueEntrys[0].combinedLP,
        today: member.leagueEntrys[0].combinedLP - member.leagueEntrys[0].lpStart,
        matchhistory: member.leagueEntrys[0].lastMatches.map((game) => game.win).slice(-5),
        icon: `../teams/${team}/${member.name}.png`,
        place: index + 1,
      }));

      return membersData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return [];
  };

  const fetchAllPlayers = async () => {
    setZwei(await fetchTeam("ZWEI"));
    setNNO(await fetchTeam("NNO"));
  };

  useEffect(() => {
    fetchAllPlayers();
    setInterval(fetchAllPlayers, 30000);
  }, []);

  const roleWins = ROLES.reduce(
    (acc, _role, index) => {
      const z = zwei[index]?.elo?.lp;
      const n = nno[index]?.elo?.lp;
      if (typeof z !== "number" || typeof n !== "number") return acc;
      if (z > n) acc.zwei += 1;
      else if (n > z) acc.nno += 1;
      return acc;
    },
    { zwei: 0, nno: 0 }
  );

  const leadingTeam =
    roleWins.zwei === roleWins.nno ? "TIE" : roleWins.zwei > roleWins.nno ? "ZWEI" : "NNO";

  if (zwei.length === 0 || nno.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tvt-capsule">
      <div className="tvt-container">
        <div className="tvt-head">
          <div className="tvt-headTeam tvt-headTeam--left">
            <div className="tvt-teamBadge">
              <img className="tvt-teamLogo" src="../teams/ZWEI/ZWEI_Logo.png" alt="ZWEI" />
            </div>
            {leadingTeam === "ZWEI" && (
              <img
                className="tvt-crown"
                aria-label="ZWEI leads"
                src="../../crown.png"
                alt="Crown"
              />
            )}
          </div>

          <div className="tvt-vs">VS</div>

          <div className="tvt-headTeam tvt-headTeam--right">
            {leadingTeam === "NNO" && (
              <img
                className="tvt-crown"
                aria-label="ZWEI leads"
                src="../../crown.png"
                alt="Crown"
              />
            )}
            <div className="tvt-teamBadge">
              <img className="tvt-teamLogo" src="../teams/NNO/NNO_Logo.png" alt="NNO" />
            </div>
          </div>
        </div>
        <div className="tvt-body">
          <div className="tvt-role">
            {ROLES.map((data, index) => (
              <Role key={index} role={data} zweiMember={zwei[index]} nnoMember={nno[index]} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamVSTeam;
