import { Combination } from "../../../types/gameshows/AICombine";

interface AICombinationProps {
  combination: Combination;
}

function AICombination({ combination }: AICombinationProps) {
  const admin = location.pathname.toLowerCase().indexOf("admin") > -1;
  const visibleLeft = admin || combination.leftShown;
  const visibleRight = admin || combination.rightShown;
  const imageLeft = admin || visibleLeft ? combination.left : "unknown";
  const imageRight = admin || visibleRight ? combination.right : "unknown";

  return (
    <div className="AIcCombinationDiv">
      <img
        src={"../../AICombine/" + imageLeft + ".png"}
        alt=""
        className={"AIcCombinationImage ACILEFT" + (!combination.leftShown ? " AIcHidden" : "")}
      />
      <img
        src={"../../AICombine/" + imageRight + ".png"}
        alt=""
        className={"AIcCombinationImage ACIRIGHT" + (!combination.rightShown ? " AIcHidden" : "")}
      />
      <img
        src={"../../AICombine/" + combination.combined + ".png"}
        alt=""
        className="AIcCombinedImage"
      />
    </div>
  );
}

export default AICombination;
