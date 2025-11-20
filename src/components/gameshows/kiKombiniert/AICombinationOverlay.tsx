import { Combination } from "../../../types/gameshows/AICombine";

interface AICombinationProps {
  combination: Combination;
}

function AICombinationOverlay({ combination }: AICombinationProps) {
  const admin = location.pathname.toLowerCase().indexOf("admin") > -1;
  const visibleLeft = admin || combination.leftShown;
  const visibleRight = admin || combination.rightShown;
  const imageLeft = admin || visibleLeft ? combination.left : "AIHidden";
  const imageRight = admin || visibleRight ? combination.right : "AIHidden";
  const leftAlt = visibleLeft ? `${combination.left} ingredient` : "Hidden ingredient placeholder";
  const combinedAlt = `${combination.combined} combination result`;
  const rightAlt = visibleRight
    ? `${combination.right} ingredient`
    : "Hidden ingredient placeholder";

  return (
    <div className="AIcTNCon">
      <div className="AIcTNimgDiv">
        <img
          src={"../../AICombine/" + imageLeft + ".png"}
          alt={leftAlt}
          className={
            "AIcCombinationImage AIcTNimg " + (!combination.leftShown && admin ? " AIcHidden" : "")
          }
        />
      </div>
      <div className="AIcTNimgDiv AIcTNimgDivCombined">
        <img
          src={"../../AICombine/" + combination.combined + ".png"}
          alt={combinedAlt}
          className="AIcTNimgCombined"
        />
      </div>
      <div className="AIcTNimgDiv">
        <img
          src={"../../AICombine/" + imageRight + ".png"}
          alt={rightAlt}
          className={
            "AIcCombinationImage AIcTNimg " + (!combination.rightShown && admin ? " AIcHidden" : "")
          }
        />
      </div>
    </div>
  );
}

export default AICombinationOverlay;
