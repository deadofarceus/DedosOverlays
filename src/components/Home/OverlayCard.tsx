import { useNavigate } from "react-router-dom";
import { Overlay } from "../../types/Overlays";

function OverlayCard({
  game,
  imageURL,
  hoverImageURL,
  description,
  url,
}: Overlay) {
  const nav = useNavigate();

  return (
    <div onClick={() => nav("/" + url)} className="article-wrapper">
      <div className="image-container">
        <img src={imageURL} alt="" className="article-image default-image" />
        <img src={hoverImageURL} alt="" className="article-image hover-image" />
      </div>
      <div className="article-body">
        <h2 className="article-title">{game}</h2>
        <p className="article-description">{description}</p>
      </div>
    </div>
  );
}

export default OverlayCard;
