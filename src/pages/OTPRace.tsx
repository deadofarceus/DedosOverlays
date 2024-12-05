import { Container } from "react-bootstrap";
import "../styles/OTPRace.css";
import { useEffect, useState } from "react";
import { DefaultPlayers, OTPPlayerProps } from "../types/OTPTypes";
import OTPPlayer from "../components/league/otp/OTPPlayer";
import { BroadcastWebsocket } from "../types/WebsocketTypes";
import { useParams } from "react-router-dom";

let ws: BroadcastWebsocket<OTPPlayerProps[]>;

function OTPRace() {
  const [otpRaceData, setOTPRaceData] =
    useState<OTPPlayerProps[]>(DefaultPlayers);

  const { accountName } = useParams();

  useEffect(() => {
    if (!ws && accountName) {
      ws = new BroadcastWebsocket<OTPPlayerProps[]>(
        accountName,
        setOTPRaceData
      );
    }
  }, []);

  console.log(otpRaceData);

  //   otpRaceData.sort((a, b) => a.combinedLP - b.combinedLP);

  const karmaIndex = otpRaceData.findIndex(
    (p) => p.summonerName === "Fat Houdini"
  )!;
  const betterKarmaIndex = otpRaceData.findIndex(
    (p) =>
      p.combinedLP >= otpRaceData[karmaIndex].combinedLP &&
      p.summonerName !== "Fat Houdini"
  )!;
  const bestOTP = otpRaceData.length - 1;

  let kontrahenten: OTPPlayerProps[];

  if (karmaIndex === bestOTP) {
    console.log("Karma is best");

    kontrahenten = [
      otpRaceData[karmaIndex - 2],
      otpRaceData[karmaIndex - 1],
      otpRaceData[karmaIndex],
    ];
    kontrahenten[0].rang = 49 - karmaIndex - 2;
    kontrahenten[1].rang = 49 - karmaIndex - 1;
    kontrahenten[1].rang = 49 - karmaIndex;
  } else if (betterKarmaIndex === bestOTP) {
    console.log("Better Karma is second to best");
    kontrahenten = [
      otpRaceData[karmaIndex - 1],
      otpRaceData[karmaIndex],
      otpRaceData[bestOTP],
    ];
    kontrahenten[0].rang = 49 - karmaIndex - 1;
    kontrahenten[1].rang = 49 - karmaIndex;
    kontrahenten[1].rang = 49 - bestOTP;
  } else {
    console.log("Karma is third to best or worse");
    kontrahenten = [
      otpRaceData[karmaIndex],
      otpRaceData[betterKarmaIndex],
      otpRaceData[bestOTP],
    ];
    kontrahenten[0].rang = 49 - karmaIndex;
    kontrahenten[1].rang = 49 - betterKarmaIndex;
    kontrahenten[2].rang = 49 - bestOTP;
  }

  console.log(karmaIndex, betterKarmaIndex, bestOTP);

  console.log(kontrahenten);

  return (
    <Container className="OTPRaceCon">
      {kontrahenten.map((player, index) => (
        <OTPPlayer
          key={index}
          index={index}
          lp={player.lp}
          tier={player.tier}
          rank={player.rank}
          summonerName={player.summonerName}
          combinedLP={player.combinedLP}
          rang={player.rang}
        />
      ))}
    </Container>
  );
}

export default OTPRace;
