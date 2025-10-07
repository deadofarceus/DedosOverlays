import { useEffect, useState } from "react";
import { BroadcastWebsocket } from "../../types/WebsocketTypes";
import "../../styles/newspaper.css";

let ws: BroadcastWebsocket<BreakingNews>;

interface BreakingNews {
  news: string;
}

function Newspaper() {
  const [news, setNews] = useState<BreakingNews>({ news: "" });

  useEffect(() => {
    if (!ws) {
      ws = new BroadcastWebsocket("breakingNews", setNews);
    }
  }, []);

  console.log(news);

  const loop = news.news.repeat(12);

  return (
    <div className="newspaper">
      <div className="news-content">{loop}</div>
    </div>
  );
}

export default Newspaper;
