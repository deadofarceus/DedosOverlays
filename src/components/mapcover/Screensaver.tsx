import { useState, useEffect } from "react";

const randint = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function randomAngle() {
  const minAngle = 25;
  const maxAngle = 65;
  const angleInDegrees = Math.random() * (maxAngle - minAngle) + minAngle;
  return (angleInDegrees * Math.PI) / 180; // Umrechnung in Radianten
}

// Berechne die neuen Bewegungsrichtungen basierend auf dem zufälligen Winkel -- -> +-
function calculateNewDirection(abprallVariante: number) {
  const angle = randomAngle();
  let b1 = 0;
  let b2 = 0;

  switch (abprallVariante) {
    case 0:
      b2 = -Math.cos(angle);
      b1 = Math.sqrt(1 - b2 * b2);
      break;
    case 1:
      b2 = Math.cos(angle);
      b1 = Math.sqrt(1 - b2 * b2);
      break;
    case 2:
      b1 = Math.cos(angle);
      b2 = -Math.sqrt(1 - b1 * b1);
      break;
    case 3:
      b1 = -Math.cos(angle);
      b2 = -Math.sqrt(1 - b1 * b1);
      break;
    case 4:
      b2 = -Math.cos(angle);
      b1 = -Math.sqrt(1 - b2 * b2);
      break;
    case 5:
      b2 = Math.cos(angle);
      b1 = -Math.sqrt(1 - b2 * b2);
      break;
    case 6:
      b1 = -Math.cos(angle);
      b2 = Math.sqrt(1 - b1 * b1);
      break;
    case 7:
      b1 = Math.cos(angle);
      b2 = Math.sqrt(1 - b1 * b1);
      break;
    default:
      break;
  }

  return [b1, b2];
}

interface DVDLogoProps {
  logoSrc: string;
  initialColor?: string;
  randomizeColor?: boolean;
  speed?: number;
  containerRect: HTMLImageElement;
  calcSize: number;
}

const Screensaver: React.FC<DVDLogoProps> = ({
  logoSrc,
  initialColor = "white",
  randomizeColor = true,
  speed = 1,
  containerRect,
  calcSize,
}) => {
  const width = 70 * calcSize * 0.01;
  const height = 70 * calcSize * 0.01;
  const minX = containerRect.offsetLeft;
  const minY = containerRect.offsetTop;
  const maxX = minX + containerRect.offsetWidth - width - 1;
  const maxY = minY + containerRect.offsetWidth - height - 1;

  //   console.log(containerRect.offsetTop);
  //   console.log(minY, maxY);

  const [position, setPosition] = useState({
    x: randint(minX, maxX),
    y: randint(minY, maxY),
    // x: maxX,
    // y: maxY,
  });

  //   console.log(position);

  const [direction, setDirection] = useState([-1, -1]);
  const [color, setColor] = useState(initialColor);

  const changeColor = () => {
    if (randomizeColor) {
      setColor(
        // `rgb(${randint(0, 255)}, ${randint(0, 255)}, ${randint(0, 255)})`
        `hue-rotate(${randint(0, 360)}deg)`
      );
    }
  };

  useEffect(() => {
    const imageElement = document.getElementById(
      "dvd-logo"
    ) as HTMLImageElement;

    if (!imageElement) return;

    const intervalId = setInterval(() => {
      setPosition((prev) => {
        const newX = prev.x + speed * direction[0];
        const newY = prev.y + speed * direction[1];
        // Bounce on the left/right side
        if (newX <= minX) {
          if (direction[1] >= 0) {
            setDirection(calculateNewDirection(1));
          } else {
            setDirection(calculateNewDirection(0));
          }
          changeColor();
        } else if (newX >= maxX) {
          if (direction[1] >= 0) {
            setDirection(calculateNewDirection(5));
          } else {
            setDirection(calculateNewDirection(4));
          }
          changeColor();
        }

        // Bounce on the top/bottom side
        if (newY <= minY) {
          if (direction[0] >= 0) {
            setDirection(calculateNewDirection(7));
          } else {
            setDirection(calculateNewDirection(6));
          }
          changeColor();
        } else if (newY >= maxY) {
          if (direction[0] >= 0) {
            setDirection(calculateNewDirection(2));
          } else {
            setDirection(calculateNewDirection(3));
          }
          changeColor();
        }
        return { x: newX, y: newY };
      });
    }, 16);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction, speed]);
  return (
    <img
      id="dvd-logo"
      src={logoSrc}
      style={{
        filter: color,
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: "absolute",
        width: `${width}px`, // Use your preferred size here
        height: `${height}px`, // Use your preferred size here
      }}
    />
  );
};

export default Screensaver;
