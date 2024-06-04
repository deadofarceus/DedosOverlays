import { Container } from "react-bootstrap";
import spinner from "../assets/RandomSpinner.png";
import foundation from "../assets/Foundation.png";
import "../styles/RandomCharGen.css";
import { useState } from "react";

function RandomCharGen() {
  const [rotation, setRotation] = useState(0);
  console.log("ROTATE TO:", rotation);

  const handleClick = () => {
    const randomRotation =
      rotation +
      Math.floor(
        Math.floor(Math.random() * 2 * 360) + 360 * 3 + Math.random() * 361
      );
    console.log(randomRotation);

    setRotation(randomRotation);
  };

  return (
    <Container className="w-100 h-100 randomCharCont">
      <img className="randomIMG foundation" src={foundation} alt="" />
      <img
        onClick={handleClick}
        className="randomIMG"
        src={spinner}
        alt=""
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: "transform 5s",
        }}
      />
    </Container>
  );
}

export default RandomCharGen;
