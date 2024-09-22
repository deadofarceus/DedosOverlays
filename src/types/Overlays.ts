export interface Overlay {
  game: string;
  imageURL: string;
  hoverImageURL: string;
  description: string;
  url: string;
}

export const OVERLAYS: Overlay[] = [
  {
    game: "League of Legends",
    imageURL: "/LoL.png",
    hoverImageURL: "/LoLHover.png",
    description:
      "Elo Overlay that displays the last 5 games and LP gains today. And gives you flames if you have performed well! legacy Mode with old tier symbols included.",
    url: "EloOverlay",
  },
  {
    game: "Mapcover for League of Legends",
    imageURL: "/Mapcover.png",
    hoverImageURL: "/MapcoverHover.png",
    description:
      "Mapcover for League of Legends. It will always fit your ingame minimap size. Hides the minimap in multiple varriants and if you want add an Challenger screensaver ontop to distract your viewers.",
    url: "Mapcover",
  },
  {
    game: "Screensaver to distract your viewers",
    imageURL: "/Screensaver.png",
    hoverImageURL: "/Screensaver.gif",
    description:
      "Your costum screensaver for OBS. You can choose your own custom image or gif and watch it hit the edges of your screen. ",
    url: "ScreensaverTutorial",
  },
  {
    game: "Elden Ring/other Soulslike",
    imageURL: "/EldenRing.png",
    hoverImageURL: "/EldenRingHover.png",
    description:
      "Shows total and boss death with an nice little progress graph! Its not an overlay for the game (not a mod) but for your stream/when working with OBS. ",
    url: "Deathcounter",
  },
];
