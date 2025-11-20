import { useEffect, useState } from "react";
import { CHAMPIMG_URL } from "../../../types/Constants";
import { Pick } from "../../../service/PowerpickService";

interface PowerpickSelectProps {
  handleSelect: (champion: string) => void;
  handleUnSelect: (champion: string) => void;
  selectedChampions: Pick[];
}

interface Champion {
  id: string;
  name: string;
}

function PowerpickSelect({
  handleSelect,
  handleUnSelect,
  selectedChampions,
}: PowerpickSelectProps) {
  const [allChampions, setAllChampions] = useState<Champion[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const loadChamps = () => {
      fetch("https://ddragon.leagueoflegends.com/cdn/15.20.1/data/en_US/champion.json")
        .then((res) => res.json())
        .then((data) => {
          let champs = [];
          for (const champ in data.data) {
            champs.push(data.data[champ]);
          }
          console.log("LOADED", champs);
          setAllChampions(champs);
        });
    };
    loadChamps();
  }, []);

  const filteredChampions = allChampions.filter((champion) => {
    return (
      champion.id.toLowerCase().includes(filter.toLowerCase()) ||
      champion.name.toLowerCase().includes(filter.toLowerCase())
    );
  });

  const handleClick = (championid: string) => {
    if (selectedChampions.some((pick) => pick.champion === championid)) {
      handleUnSelect(championid);
    } else {
      handleSelect(championid);
    }
  };

  return (
    <div className="powerpick-select">
      <div className="powerpick-select-controls">
        <input
          type="text"
          placeholder="Filter Champions..."
          id="filterChampsPowerpick"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="powerpick-select-filter"
        />
        <button className="powerpick-button" onClick={() => handleUnSelect("ALLCHAMPS")}>
          unselect all
        </button>
      </div>

      <div className="powerpick-select-list">
        {filteredChampions.map((champion, index) => (
          <div
            key={index}
            className={
              "powerpick-select-item " +
              (selectedChampions.some((pick) => pick.champion === champion.id)
                ? "powerpick-selected"
                : "")
            }
            onClick={() => handleClick(champion.id)}
          >
            <img
              className="powerpick-select-item-img"
              src={CHAMPIMG_URL + champion.id + ".png"}
              alt={`${champion.name ?? champion.id} portrait`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PowerpickSelect;
