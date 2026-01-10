import { useEffect, useState } from "react";
import { BroadcastWebsocket } from "../types/WebsocketTypes";
import { useParams } from "react-router-dom";
import "../styles/FillToMaster.css";

interface FTMAccount {
  name: string;
  positions: Position[];
}

interface Position {
  name: string;
  played: number;
  wins: number;
  losses: number;
  lpGained: number;
}

let ws: BroadcastWebsocket<FTMAccount>;

const StandardPositions: Position[] = [
  { name: "TOP", played: 0, wins: 0, losses: 0, lpGained: 0 },
  { name: "JUNGLE", played: 0, wins: 0, losses: 0, lpGained: 0 },
  { name: "MIDDLE", played: 0, wins: 0, losses: 0, lpGained: 0 },
  { name: "BOTTOM", played: 0, wins: 0, losses: 0, lpGained: 0 },
  { name: "UTILITY", played: 0, wins: 0, losses: 0, lpGained: 0 },
];
const DefaultAccount: FTMAccount = {
  name: "default",
  positions: StandardPositions,
};

function FillToMaster() {
  const [account, setAccount] = useState<FTMAccount>(DefaultAccount);

  const { accountName } = useParams();
  useEffect(() => {
    if (!ws && accountName) {
      ws = new BroadcastWebsocket(accountName, setAccount);
    }
  }, [accountName]);

  const getIconPath = (positionName: string): string => {
    return `../../lol_icons/${positionName}.png`;
  };

  return (
    <div className="fillToMaster-container">
      <div className="fillToMaster-positions">
        {account.positions.map((position) => {
          const totalLP = position.lpGained;
          const lpDisplay = totalLP >= 0 ? `+${totalLP}LP` : `${totalLP}LP`;

          return (
            <div key={position.name} className="fillToMaster-position">
              <img
                src={getIconPath(position.name)}
                alt={position.name}
                className="fillToMaster-icon"
              />
              <div className="fillToMaster-info blackOutline">
                <div className="fillToMaster-WL">{`${position.wins}W/${position.losses}L`}</div>
                <div
                  className="fillToMaster-LP"
                  style={{ color: totalLP >= 0 ? "#6eff57" : "#FF6565" }}
                >
                  {lpDisplay}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FillToMaster;
