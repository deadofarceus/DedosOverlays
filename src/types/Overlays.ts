export interface Overlay {
    game: string;
    imageURL: string;
    hoverImageURL: string;
    description: string;
    url: string;
}

export const OVERLAYS: Overlay[] = [
    {
        game: "Elden Ring/other Soulslike",
        imageURL: "/EldenRing.png",
        hoverImageURL: "/EldenRingHover.png",
        description: "Shows total and boss death with an nice little progress graph! Its not an overlay for the game (not a mod) but for your stream/when working with OBS. ",
        url: "Deathcounter"
    },
    {
        game: "League of Legends",
        imageURL: "/LoL.png",
        hoverImageURL: "/LoLHover.png",
        description: "Elo Overlay that displays the last 5 games and LP gains today. And gives you flames if you have performed well! legacy Mode with old tier symbols included.",
        url: "EloOverlay"
    },
]