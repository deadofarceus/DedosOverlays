import { TVTMemberProps } from "../../../pages/TeamVSTeam";

interface RoleProps {
  role: string;
  zweiMember: TVTMemberProps;
  nnoMember: TVTMemberProps;
}

function Role({ role, zweiMember, nnoMember }: RoleProps) {
  const zRealLP = zweiMember?.elo?.lp;
  const nRealLP = nnoMember?.elo?.lp;

  const zLp = zweiMember?.combinedLP;
  const nLp = nnoMember?.combinedLP;

  const hasLp = typeof zLp === "number" && typeof nLp === "number";
  const zState = !hasLp ? "neutral" : zLp > nLp ? "win" : zLp < nLp ? "lose" : "neutral";
  const nState = !hasLp ? "neutral" : nLp > zLp ? "win" : nLp < zLp ? "lose" : "neutral";

  const roleIconSrc = `/lol_icons/${role}.png`;

  return (
    <div className="tvt-roleRow">
      <div className="tvt-side tvt-side--left">
        <div className="tvt-lp">{typeof nRealLP === "number" ? `${zRealLP} LP` : "--"}</div>
        <div className={`tvt-avatar tvt-avatar--${zState}`}>
          <img
            className="tvt-avatarImg"
            src={zweiMember.icon}
            alt={zweiMember.streamer ?? "ZWEI"}
          />
          {/* <img className="tvt-TierImg" src={`../../${zweiMember.elo.tier}.png`} alt="" /> */}
        </div>
      </div>

      <div className="tvt-roleIconWrap">
        <img className="tvt-roleIcon" src={roleIconSrc} alt={role} />
      </div>

      <div className="tvt-side tvt-side--right">
        <div className={`tvt-avatar tvt-avatar--${nState}`}>
          <img className="tvt-avatarImg" src={nnoMember.icon} alt={nnoMember.streamer ?? "NNO"} />
          {/* <img className="tvt-TierImg" src={`../../${nnoMember.elo.tier}.png`} alt="" /> */}
        </div>
        <div className="tvt-lp">{typeof nRealLP === "number" ? `${nRealLP} LP` : "--"}</div>
      </div>
    </div>
  );
}

export default Role;
