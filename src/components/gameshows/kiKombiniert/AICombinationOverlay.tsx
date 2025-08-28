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

  return (
    <div className="AIcTNCon">
      <div className="AIcTNimgDiv">
        <img
          src={"../../AICombine/" + imageLeft + ".png"}
          alt=""
          className={
            "AIcCombinationImage AIcTNimg " + (!combination.leftShown && admin ? " AIcHidden" : "")
          }
        />
      </div>
      <div className="AIcTNimgDiv AIcTNimgDivCombined">
        <img
          src={"../../AICombine/" + combination.combined + ".png"}
          alt=""
          className="AIcTNimgCombined"
        />
      </div>
      <div className="AIcTNimgDiv">
        <img
          src={"../../AICombine/" + imageRight + ".png"}
          alt=""
          className={
            "AIcCombinationImage AIcTNimg " + (!combination.rightShown && admin ? " AIcHidden" : "")
          }
        />
      </div>
    </div>
  );
}

export default AICombinationOverlay;
