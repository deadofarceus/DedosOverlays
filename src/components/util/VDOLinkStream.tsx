interface VDOLinkProps {
  link: string;
}

function VDOLink({ link }: VDOLinkProps) {
  const streamLink = link === "" ? "https://vdo.ninja/?view=blank" : link + "?autostart=true";

  return <iframe className="AIcVDOLinkStream" src={streamLink} />;
}

export default VDOLink;
