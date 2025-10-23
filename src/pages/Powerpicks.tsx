import { useEffect, useState } from "react";
import "../styles/Powerpicks.css";
import { PowerpickService, Pick } from "../service/PowerpickService";
import Login from "../components/stream/powerpick/Login";
import Powerpick from "../components/stream/powerpick/Powerpick";
import PowerpickSelect from "../components/stream/powerpick/PowerpickSelect";
import Winner from "../components/stream/powerpick/Winner";

let powerpickService: PowerpickService;
const CLIENTID = "9sn9vl8js2noz4sx61ikt7xdiyulib";

function Powerpicks() {
  document.body.className = "noOBS";
  const [token, setToken] = useState<string>("");
  const [picks, setPicks] = useState<Pick[]>([]);
  const [voteTime, setVoteTime] = useState<boolean>(false);
  const [winner, setWinner] = useState<string>("deadofarceus");

  const handleSelect = (champion: string) => {
    setPicks((prevPicks) => [...prevPicks, { champion, votes: 0, voters: [] }]);
  };

  const handleUnSelect = (champion: string) => {
    if (champion === "ALLCHAMPS") {
      setPicks([]);
    } else {
      setPicks((prevPicks) => prevPicks.filter((pick) => pick.champion !== champion));
    }
  };

  const handleVote = (powerpicks: Pick[]) => {
    setPicks(Array.from(powerpicks));
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = new URLSearchParams(hash.substring(1)).get("access_token");
      if (token) {
        window.location.hash = "";

        powerpickService = new PowerpickService(CLIENTID, token, handleVote);
        // console.log(powerpickService);

        setToken(token);
      } else {
        console.log("NO TOKEN");
      }
    } else {
      console.log("NO HASH");
    }
  }, []);

  if (token === "") {
    return <Login clientID={CLIENTID} />;
  }

  return (
    <div className="powerpicks-container">
      {winner !== "" && <Winner winner={winner} handleClose={() => setWinner("")} />}
      <h1>intel - Powerpicks</h1>
      <div className="powerpicks-selected">
        {picks.length !== 0 && (
          <div className="powerpicks-vote-controls">
            <div>
              <button
                className={
                  "powerpick-button " +
                  (voteTime ? "powerpick-voteStop-button" : "powerpick-vote-button")
                }
                onClick={() => {
                  powerpickService.startVoting(picks);
                  setVoteTime((prev) => !prev);
                }}
              >
                {voteTime ? "Stop Voting" : "Start Voting"}
              </button>
              {!voteTime && picks.some((p) => p.votes > 0) && (
                <button
                  className="powerpick-button"
                  onClick={() => setWinner(powerpickService.chooseWinner())}
                  // onClick={() => setWinner("GEWINNER_0815")}
                >
                  Roll Winner
                </button>
              )}
            </div>
            <h2>Selected Champions:</h2>
          </div>
        )}
        <div className="powerpicks-selected-list">
          {picks.map((champion, index) => (
            <Powerpick key={index} pick={champion} voting={voteTime} />
          ))}
        </div>
      </div>
      <PowerpickSelect
        selectedChampions={picks}
        handleSelect={handleSelect}
        handleUnSelect={handleUnSelect}
      />
    </div>
  );
}

export default Powerpicks;
