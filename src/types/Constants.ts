getNewestPatch();
export let CHAMPIMG_URL = "https://ddragon.leagueoflegends.com/cdn/15.23.1/img/champion/";
function getNewestPatch() {
  fetch("https://ddragon.leagueoflegends.com/api/versions.json")
    .then((res) => res.json())
    .then(
      (data) => (CHAMPIMG_URL = `https://ddragon.leagueoflegends.com/cdn/${data[0]}/img/champion/`)
    );
}
