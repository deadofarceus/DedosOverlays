import { Combination } from "../../../types/gameshows/AICombine";

interface AICombinationProps {
  combination: Combination;
}

function AICombination({ combination }: AICombinationProps) {
  const admin = location.pathname.toLowerCase().indexOf("admin") > -1;
  const visibleLeft = admin || combination.leftShown;
  const visibleRight = admin || combination.rightShown;
  const imageLeft = admin || visibleLeft ? combination.left : "AIHidden";
  const imageRight = admin || visibleRight ? combination.right : "AIHidden";
  const combinedAlt = `${combination.combined} combination result`;
  const leftAlt = visibleLeft ? `${combination.left} ingredient` : "Hidden ingredient placeholder";
  const rightAlt = visibleRight
    ? `${combination.right} ingredient`
    : "Hidden ingredient placeholder";

  return (
    <div className="AIcCombinationDiv">
      <div className="AIcCombImgDiv ACICOMB">
        <img
          src={"../../AICombine/" + combination.combined + ".png"}
          alt={combinedAlt}
          className="AIcCombinedImage"
        />
        {admin && <div className="AIcIMGName blackOutline">{combination.combined}</div>}
      </div>
      <div className="AIcCombImgDiv ACILEFT" style={!admin ? { left: "-350px", top: "150px" } : {}}>
        <img
          src={"../../AICombine/" + imageLeft + ".png"}
          alt={leftAlt}
          className={"AIcCombinationImage " + (!combination.leftShown && admin ? " AIcHidden" : "")}
        />
        {admin && <div className="AIcIMGName blackOutline">{imageLeft}</div>}
      </div>
      <div
        className="AIcCombImgDiv ACIRIGHT"
        style={!admin ? { right: "-350px", top: "150px" } : {}}
      >
        <img
          src={"../../AICombine/" + imageRight + ".png"}
          alt={rightAlt}
          className={
            "AIcCombinationImage " + (!combination.rightShown && admin ? " AIcHidden" : "")
          }
        />
        {admin && <div className="AIcIMGName blackOutline">{imageRight}</div>}
      </div>
    </div>
  );
}

export default AICombination;
