import { Pick } from "../../../service/PowerpickService";
import { CHAMPIMG_URL } from "../../../types/Constants";

interface PowerpickProps {
  pick: Pick;
  voting: boolean;
}

function Powerpick({ pick, voting }: PowerpickProps) {
  return (
    <div className="powerpick">
      <img src={CHAMPIMG_URL + pick.champion + ".png"} alt="" />
      <h2 className="blackOutline">{pick.champion}</h2>
      <h4>{"Votes: " + (voting ? "XXX" : pick.votes)}</h4>
    </div>
  );
}

export default Powerpick;
