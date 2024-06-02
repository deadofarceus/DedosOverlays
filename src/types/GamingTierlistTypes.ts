import { Dispatch, SetStateAction } from "react";

export interface Streamer {
    name: string;
    id: string;
    values: number[];
    callback: Dispatch<SetStateAction<number[]>>;
}

export const SKILLS = [
    "Shooter",
    "Jump 'n' Runs",
    "Beat 'em ups",
    "Strategiespiele",
    "Moba",
    "Soulslikes",
];

export const STREAMER = [
    {
        name: "Abugoku",
        id: "48bae456-63e7-47ba-8494-2aa025bc3a6c"
    },
    {
        name: "achNina",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/2bf0e796-707e-461b-a05a-2fed9da47cc2-profile_image-300x300.png"
    },
    {
        name: "Agurin",
        id: "3ca65c72-26bc-4fcb-878d-cc29d2f45bfe"
    },
    {
        name: "Amar",
        id: "a1f93c9d-7fb0-4af8-aba9-86f64f956d55"
    },
    {
        name: "Anna Gazanis",
        id: "6f2472c8-2f8c-4ae2-af1f-acd5de660ca8"
    },
    {
        name: "Aria Addams",
        id: "0cd8d252-6905-491c-b484-f2d11a7f9d37"
    },
    {
        name: "Baso",
        id: "669e243b-4e63-4be9-9d5c-a96b622c9b3f"
    },
    {
        name: "BastiGHG",
        id: "865826b7-35e7-47be-9bb8-aff3be1fa08f"
    },
    {
        name: "beedTV",
        id: "a62ace13-6cc1-4fc2-9f6e-c16e6cede91c"
    },
    {
        name: "Bart",
        id: "e9765d8b-92ce-4236-a494-465167f2c268"
    },
    {
        name: "Bonjwa",
        id: "a4bec7db-47b2-44f7-bb79-6de32e7bbca4"
    },
    {
        name: "Breitenberg",
        id: "202c8342-0952-458e-9a6c-34ab2138ed78"
    },
    {
        name: "Broeki",
        id: "01a88a47-692f-4e19-87e7-83d50e1ddee7"
    },
    {
        name: "byTobi",
        id: "aabd97de-b907-4e7b-9c59-61490336957e"
    },
    {
        name: "Chefstrobel",
        id: "cea26e66-4095-4c3e-8467-c4d46fd7aaf6"
    },
    {
        name: "CrunchyCupcake",
        id: "4ea75fce-e4c7-4518-b35c-98366e8ca68e"
    },
    {
        name: "Danergy",
        id: "4dd843cf-0196-40fd-9578-61631fc0f32c"
    },
    {
        name: "Dekarldent",
        id: "818c3923-194e-4a09-8314-9eb4b9984880"
    },
    {
        name: "Dennsen86",
        id: "ee849029-0bbe-4441-98d1-f1b04e5e64ce"
    },
    {
        name: "DerHauge",
        id: "75634a9d-27e8-4a83-8d19-f2eadfc2a5a4"
    },
    {
        name: "Dhalucard",
        id: "38de6498-aba3-45c5-8b99-646a0472d861"
    },
    {
        name: "DieDoni",
        id: "714eeb36-ea42-4a99-bb85-a35b873d9920"
    },
    {
        name: "Divi",
        id: "e267b172-8bc7-46ec-a2bc-94fe93590057"
    },
    {
        name: "Dilara",
        id: "b665e6b5-ade1-4edc-b9cc-f1911fe84bc8"
    },
    {
        name: "DoktorFroid",
        id: "b945c9e3-91d7-4cae-83d6-ae568b661388"
    },
    {
        name: "Donnie",
        id: "6addea8a-c057-4978-bfe3-ba02c2d9564d"
    },
    {
        name: "Dracon",
        id: "36309a46-7d79-4111-8c51-b9358912a3ce"
    },
    {
        name: "EdeLive",
        id: "ddbce00b-8084-4d56-be04-53727f56cc00"
    },
    {
        name: "EdizderBreite",
        id: "1eb723a4-0f53-461c-9fae-0375c53ee83e"
    },
    {
        name: "edopeh",
        id: "7b548304-a212-48cc-9d89-6035158da4d6"
    },
    {
        name: "einPapo",
        id: "25dfa20b-47a3-4e25-af69-6b39410c5b9a"
    },
    {
        name: "einSebastian",
        id: "1def2d40-4495-4f55-812c-04978231b6f2"
    },
    {
        name: "eliasn97",
        id: "4fb94c7a-b4c0-4ed1-9782-b630a59915d5"
    },
    {
        name: "ELoTRiX",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/elotrix-profile_image-68e89e930904b2e6-300x300.jpeg"
    },
    {
        name: "Fabo",
        id: "be564459-0caa-4e93-b922-40a292d3f604"
    },
    {
        name: "Farbenfuchs",
        id: "90a25583-c9d6-46d3-b3a2-0aae559b1000"
    },
    {
        name: "FeineKatze",
        id: "591bdeee-8100-495e-a6d9-c8d8a61fe3e1"
    },
    {
        name: "Fibii",
        id: "04fdbeeb-12a5-4a1b-a63f-8d09bb09b31f"
    },
    {
        name: "Filow",
        id: "a3532f37-eeb8-4514-b84f-057c49cbf647"
    },
    {
        name: "Fischersnet",
        id: "e485e9aa-a93b-4c97-a74b-35388ac02fb1"
    },
    {
        name: "fisHC0P",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/fishc0p-profile_image-e16f0289c08d9989-300x300.png"
    },
    {
        name: "Flauschy",
        id: "eaa9c46b-f5f5-46b9-84ef-454a3f6a3f7b"
    },
    {
        name: "FlorentinWill",
        id: "8b79209f-e778-4580-b3a5-d1b2e1d62bb8"
    },
    {
        name: "Fritz Meinecke",
        id: "3e7f37a8-80d4-451f-840f-ce88eba83119"
    },
    {
        name: "Gamerbrother",
        id: "975b34c9-3805-46c4-b011-1d64c71edabe"
    },
    {
        name: "GippiGaming",
        id: "b03addcf-3556-453e-8d32-87d85c205333"
    },
    {
        name: "Gnu",
        id: "3f9a5d89-3b97-4add-9863-061c4e4c1f94"
    },
    {
        name: "Gronkh",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/gronkh-profile_image-76b34139eaa46bb5-300x300.png"
    },
    {
        name: "Hasi",
        id: "6ce86c5e-cff4-44c4-ad0e-f95e48d7a595"
    },
    {
        name: "HollaDieWaldfee",
        id: "301b72c3-d4a8-459e-ac7a-d7d2f9a083cd"
    },
    {
        name: "H0llyLP",
        id: "48e4a8fb-a2d9-4378-a559-f77c281cea55"
    },
    {
        name: "HandOfBlood",
        id: "d2d10d39-d857-4f01-a1c2-447a9fbbc9bf"
    },
    {
        name: "Haselnuuuss",
        id: "3ba59097-755a-40c1-adbc-50b073f060b4"
    },
    {
        name: "HoneyPuu",
        id: "34820fde-44c2-438a-b9cd-555220b77aac"
    },
    {
        name: "Inscope21",
        id: "9a4d9b20-2845-4da6-a8a4-867b298e109d"
    },
    {
        name: "JenNyan",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/4eaace7a-9926-49ff-a946-cd41f451870e-profile_image-300x300.png"
    },
    {
        name: "Juliversal",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/juliversal-profile_image-1fe330d8c59062e6-300x300.jpeg"
    },
    {
        name: "JustGiggles",
        id: "5279bf66-3f8b-445c-825b-956dc88d8dd3"
    },
    {
        name: "Kalle",
        id: "91fc97f1-f148-4654-b5e2-819e02438458"
    },
    {
        name: "Kapuzenwurm",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/kapuzenwurm-profile_image-33ce7712db206d37-300x300.png"
    },
    {
        name: "Karni",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/3dde8e06-72cc-4e5e-8bb5-6ea947c19463-profile_image-300x300.jpeg"
    },
    {
        name: "Katazuri",
        id: "a61fa648-0668-4c47-a100-eb2b39a33cbe"
    },
    {
        name: "KDRkitten",
        id: "0f5751e4-5dad-4239-b06b-670770c436e1"
    },
    {
        name: "Kekluck",
        id: "90a2e404-ade9-430e-a88a-e88cfce9eece"
    },
    {
        name: "Knirpz",
        id: "4fd0f679-952e-4ff4-a725-fbdb3bff574f"
    },
    {
        name: "Krokoboss",
        id: "9c38804f-2c72-4881-b9af-306da4217637"
    },
    {
        name: "Kunshikitty",
        id: "6a6ced98-88c0-4b7d-853b-fd9da00e2e6d"
    },
    {
        name: "Philly Westside",
        id: "4fb151e7-be38-44c7-a31a-d00fd265fa0f"
    },
    {
        name: "Lachsmann",
        id: "32096b08-fc93-408b-8a3e-fc0d18f4a0d3"
    },
    {
        name: "LaraLoft",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/27706ec9-881d-41aa-bb1f-2e097b15c635-profile_image-300x300.jpeg"
    },
    {
        name: "LetsHugoTV",
        id: "111bbc84-a87d-49fc-9b8e-8b9bf0c67297"
    },
    {
        name: "LostKittn",
        id: "64e4b37d-cb4c-4406-9eee-8c5c2c2b2314"
    },
    {
        name: "Lost",
        id: "e14bba0f-7dbf-4553-8839-86f7cf755c00"
    },
    {
        name: "Johnny",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/6ad0c90a869dd1ee-profile_image-300x300.png"
    },
    {
        name: "Lumenti",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/c6a37a3a-1ed8-442d-8b59-a94d3cbab9a0-profile_image-300x300.jpg"
    },
    {
        name: "MaceZayuri",
        id: "ff96f046-72ae-4c61-bc9f-2f6b5d1d740b"
    },
    {
        name: "Mahluna",
        id: "25d08b64-469d-4d70-b4b2-2ac9b98452ac"
    },
    {
        name: "Maty",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/8a63bd3a56d87ddf-profile_image-300x300.png"
    },
    {
        name: "MaumiPaumi",
        id: "2ed986d2-c034-4d29-b6be-dea1515ee50b"
    },
    {
        name: "MauriceWeber",
        id: "5dfae05e-abac-4947-9eba-c5f282d7bb37"
    },
    {
        name: "Maxim",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/1a8ad88b654bf333-profile_image-300x300.png"
    },
    {
        name: "MckyTV",
        id: "4a8b188b-e3bf-4413-b47e-0b021b3526ab"
    },
    {
        name: "MerlePerle",
        id: "a21c8074-2f1d-45a6-a23b-496c79097fc8"
    },
    {
        name: "Mexify",
        id: "d21a8b37-94f4-449d-b391-8823a4294f6b"
    },
    {
        name: "Mienah",
        id: "5d8876d7-4f3e-4ab5-92c2-f06d8cf2e364"
    },
    {
        name: "Milschbaum",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/953ab63f-bdf7-46b4-bd54-0f03ebfa7dc4-profile_image-300x300.jpg"
    },
    {
        name: "minimoli",
        id: "76c29bb9-ca87-468d-a726-a52b0faa18e3"
    },
    {
        name: "mon_official",
        id: "5e3cbb0d-02f6-48ba-b731-ed58e9241c52"
    },
    {
        name: "MontanaBlack",
        id: "6f36c08a-6f7d-40f1-a9e8-12eee2ff0f93"
    },
    {
        name: "Moondye7",
        id: "d26840e3-10e6-4f64-bede-ca4580e8d6fe"
    },
    {
        name: "Mowky",
        id: "385ffb4a-2b48-41ec-928e-3f466ce9da87"
    },
    {
        name: "MrMoregame",
        id: "c9b6ff06-6034-4bb3-a829-c10da4d6e098"
    },
    {
        name: "Mystery_Blue",
        id: "93d0fa70-49e6-4bdd-b0ef-1a1d12a74116"
    },
    {
        name: "Gubi Fortnite",
        id: "69fe19ab-babc-4502-b3de-b5cf609920a4"
    },
    {
        name: "NiklasWilson",
        id: "9c352f7e-c9a1-4a2a-81b5-e5301e73fa4a"
    },
    {
        name: "NoahZett28",
        id: "972e1747-8f53-48e3-9caa-18a62361ffca"
    },
    {
        name: "Nooreax",
        id: "cf4d614e-35d9-43ec-8dc4-63de61989132"
    },
    {
        name: "Noway",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/9e619d88755f56a8-profile_image-300x300.png"
    },
    {
        name: "Paarzival",
        id: "b3174866-3755-49a2-8ff7-e930a9097cbd"
    },
    {
        name: "Papaplatte",
        id: "04abc1b4-7bad-4b55-8da8-c0f1cf031bda"
    },
    {
        name: "Papfi",
        id: "f5e927d1-dc76-43d1-9bad-829506f61ea1"
    },
    {
        name: "Paluten",
        id: "48ccd34c-c17d-4599-beb7-088f2589371c"
    },
    {
        name: "PATTIIIIIIII",
        id: "544548ed-d674-4416-aff8-92c5745ebf13"
    },
    {
        name: "Pausenapfel",
        id: "a4fd1540-e13d-4fab-a9a0-ce68fb9d2feb"
    },
    {
        name: "PietSmiet",
        id: "f1518fb2-01a7-4414-b34d-e2842d20cbef"
    },
    {
        name: "quiteLola",
        id: "e2168ac5-e150-479d-8f84-aa182bcb9a5a"
    },
    {
        name: "Radlerauge",
        id: "8e8fe14d-935d-470a-9418-f11fe79e4abc"
    },
    {
        name: "Reeze",
        id: "2138caa8-520e-472a-a3f6-85ab2501592f"
    },
    {
        name: "ReismitMais",
        id: "055a2cae-ece6-4289-8f3a-c6ef3c96d24a"
    },
    {
        name: "Repaz",
        id: "98e43b4c-ad0f-4964-88a9-d3de34eb58ac"
    },
    {
        name: "RevedTV",
        id: "a68d7efe-3b2a-4de3-9bc7-c8a309613b29"
    },
    {
        name: "Rewinside",
        id: "c2f897fd-6cc0-4456-a86d-46aec89fd8e1"
    },
    {
        name: "Rezo",
        id: "be5109a7-9bce-456c-9eac-266c83001aba"
    },
    {
        name: "rezonfn",
        id: "411116ef-8dd8-4b77-a48c-b0aa974aeb69"
    },
    {
        name: "Ronny Berger",
        id: "029c4ead-9a5d-4c23-ad93-41e6b6326dbb"
    },
    {
        name: "RoozWorld",
        id: "bb786f60-7c8e-48e7-8834-96e71b080b49"
    },
    {
        name: "PhunkRoyal",
        id: "fa63cae9-770d-4ce6-9018-1c6bd1fe1b69"
    },
    {
        name: "Rumathra",
        id: "70787557-b053-4640-9f6e-e2f51752c367"
    },
    {
        name: "Mango",
        id: "e60f4548-024e-4285-8b4c-35bf56349c67"
    },
    {
        name: "Salzwerk_tv",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/8749f5fb-5535-4f16-b97f-65bd2438d6b1-profile_image-300x300.png"
    },
    {
        name: "Shlorox",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/shlorox-profile_image-4be72b9009ae00a8-300x300.png"
    },
    {
        name: "shortytv",
        id: "cc641427-b6e4-4462-8dbd-8dfe89d8cb59"
    },
    {
        name: "Shurjoka",
        id: "1ce51277-768f-47f6-98cd-7e3f009e9070"
    },
    {
        name: "shushu",
        id: "10fbbdfc-92e4-41ea-8b17-16c8a1af4ece"
    },
    {
        name: "SidneyEweka",
        id: "6545046f-b033-4a24-b3f0-46204abb8268"
    },
    {
        name: "simfinity_nina",
        id: "52638b13-9313-4db0-8071-c8957e5da873"
    },
    {
        name: "Sintica",
        id: "f88e8af1-366a-4d0b-9746-c597d647757d"
    },
    {
        name: "SkylineTVlive",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/a7299c59679269b3-profile_image-300x300.jpeg"
    },
    {
        name: "SmashLunatic",
        id: "fa1e23ed-53fc-445e-b807-0f0cd19468fd"
    },
    {
        name: "Sola",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/sola-profile_image-3b9974dec74aafa6-300x300.png"
    },
    {
        name: "sophiexelisabeth",
        id: "b2d48c2a-661a-46d6-92e6-ad7bbe45278f"
    },
    {
        name: "Staiy",
        id: "c5fdecbb-5b04-40c5-a2c6-b84944cfc485"
    },
    {
        name: "Starletnova",
        id: "52c244b8-002c-4984-af1a-2a8057320307"
    },
    {
        name: "Stegi",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/stegi-profile_image-05c7e0763d078e9a-300x300.jpeg"
    },
    {
        name: "Sterzik",
        id: "5433b7dc-0611-448b-a8a8-17399aef9da3"
    },
    {
        name: "sukidingels",
        id: "0c3f49fb-14e5-4513-afcf-546826b7f9ef"
    },
    {
        name: "suuN",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/e1749d80-8742-41b1-a203-a213bcbeed85-profile_image-300x300.jpeg"
    },
    {
        name: "TANZVERBOT",
        id: "50ffecbf-8ef3-449b-8920-ab89a9f26bc7"
    },
    {
        name: "Knossi",
        id: "13bfaccd-9f13-46a6-b6c7-983903a4a34a"
    },
    {
        name: "Timhorus",
        id: "510c49c0-f7f1-47a2-85e0-ee98c49fc1e7"
    },
    {
        name: "Timit",
        id: "892ac370-0679-4693-9fef-1eb779dec767"
    },
    {
        name: "Tinkerleo",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/tinkerleo-profile_image-2a4a77aa7cf7d3c4-300x300.jpeg"
    },
    {
        name: "Tolkin",
        id: "54b3baeb-902e-4c18-9488-6530ada7f8ef"
    },
    {
        name: "Torro",
        id: "92ef32a6-57fe-4eb1-8eb1-065713ed1911"
    },
    {
        name: "TouristHistories",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/touristhistories-profile_image-76afd8b89ed49a2d-300x300.png"
    },
    {
        name: "Trilluxe",
        id: "464806d7-2c46-4064-ac2a-d28cb8e7e928"
    },
    {
        name: "Trymacs",
        id: "22a56845-20d0-4e14-932e-0ec099b088eb"
    },
    {
        name: "TwoBiers",
        id: "38f04fb1-b9dc-4042-b678-51bfa448eda0"
    },
    {
        name: "unsympathisch_tv",
        id: "369e3eb0-a2a4-43ed-8433-211eb4dc1588"
    },
    {
        name: "Varion",
        id: "bdea7b6c-672a-4810-acfe-b21f1872ab0b"
    },
    {
        name: "Vlesk",
        id: "290951f3-3c12-46b8-8e97-7f971f26b922"
    },
    {
        name: "Wichtiger",
        id: "366c67a7-18eb-44a7-89de-27e65d0b733c"
    },
    {
        name: "Pandorya",
        id: "8e913027-c6b3-4d8a-b5f6-fdbe5a5a40f7"
    },
    {
        name: "Rohat",
        id: "dc99030e-69b1-4e11-b381-e1507c991ff0"
    },
    {
        name: "xTheSolutionTV",
        id: "https://static-cdn.jtvnw.net/jtv_user_pictures/xthesolutiontv-profile_image-60407df7245fee58-300x300.png"
    },
    {
        name: "Yvraldis",
        id: "4cd5b5e1-2aff-4f77-8a17-429efe2045af"
    },
    {
        name: "Zarbex",
        id: "1ddb5e9f-4729-40b1-962e-f4aeafe982cb"
    },
    {
        name: "ZeusSpezial",
        id: "39a738f3-ca86-4478-96ce-5a2e92ead87b"
    },
    {
        name: "Zombey",
        id: "b8f050a9-8957-433a-ae0b-e192d50abca6"
    },
];