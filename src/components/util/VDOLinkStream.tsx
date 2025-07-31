interface VDOLinkProps {
  link: string;
  className: string;
  id: string;
}

function VDOLink({ link, className, id }: VDOLinkProps) {
  const streamLink = link === "" ? "https://vdo.ninja/?view=blank" : link + "?autostart=true";

  return <iframe className={className} src={streamLink} id={id} />;
}

export default VDOLink;
