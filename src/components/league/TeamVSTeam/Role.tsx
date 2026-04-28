import { MemberProps } from "../TeamElo/Member";

interface RoleProps {
  role: string;
  zweiMember: MemberProps;
  nnoMember: MemberProps;
}

function Role({ role, zweiMember, nnoMember }: RoleProps) {
  const zLp = zweiMember?.elo?.lp;
  const nLp = nnoMember?.elo?.lp;

  const hasLp = typeof zLp === "number" && typeof nLp === "number";
  const zState = !hasLp ? "neutral" : zLp > nLp ? "win" : zLp < nLp ? "lose" : "neutral";
  const nState = !hasLp ? "neutral" : nLp > zLp ? "win" : nLp < zLp ? "lose" : "neutral";

  const roleIconSrc = `/lol_icons/${role}.png`;

  return (
    <div className="tvt-roleRow">
      <div className="tvt-side tvt-side--left">
        <div className="tvt-lp">{typeof zLp === "number" ? `${zLp} LP` : "--"}</div>
        <div className={`tvt-avatar tvt-avatar--${zState}`}>
          <img
            className="tvt-avatarImg"
            src={zweiMember.icon}
            alt={zweiMember.streamer ?? "ZWEI"}
          />
        </div>
      </div>

      <div className="tvt-roleIconWrap">
        <img className="tvt-roleIcon" src={roleIconSrc} alt={role} />
      </div>

      <div className="tvt-side tvt-side--right">
        <div className={`tvt-avatar tvt-avatar--${nState}`}>
          <img className="tvt-avatarImg" src={nnoMember.icon} alt={nnoMember.streamer ?? "NNO"} />
        </div>
        <div className="tvt-lp">{typeof nLp === "number" ? `${nLp} LP` : "--"}</div>
      </div>
    </div>
  );
}

export default Role;
