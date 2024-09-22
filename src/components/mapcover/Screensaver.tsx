import { useState, useEffect } from "react";

const randint = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function randomAngle() {
  const minAngle = 30;
  const maxAngle = 60;
  const angleInDegrees = Math.random() * (maxAngle - minAngle) + minAngle;
  return (angleInDegrees * Math.PI) / 180; // Umrechnung in Radianten
}

// Berechne die neuen Bewegungsrichtungen basierend auf dem zufälligen Winkel
function calculateNewDirection(abprallVariante: number) {
  const angle = randomAngle();
  const cosAngle = Math.cos(angle);
  const sinAngle = Math.sin(angle);

  const signX = [1, 1, -1, -1][abprallVariante];
  const signY = [-1, 1, -1, 1][abprallVariante];

  return [signX * sinAngle, signY * cosAngle];
}

interface DVDLogoProps {
  logoSrc: string;
  initialColor?: string;
  randomizeColor?: boolean;
  speed?: number;
  containerRect: HTMLImageElement | HTMLDivElement;
  calcSize: number;
  border?: boolean;
  opacity?: number;
}

const Screensaver: React.FC<DVDLogoProps> = ({
  logoSrc,
  initialColor = "white",
  randomizeColor = true,
  speed = 1,
  containerRect,
  calcSize,
  border = false,
  opacity = 1,
}) => {
  //load image and use width of logoSrc
  const img = new Image();
  img.src = logoSrc;
  const width = img.width * calcSize;
  const height = img.height * calcSize;
  const minX = containerRect.offsetLeft;
  const minY = containerRect.offsetTop;
  const maxX = minX + containerRect.offsetWidth - width - 1;
  const maxY = minY + containerRect.offsetHeight - height - 1;

  const [position, setPosition] = useState({
    x: minX + width * 2,
    y: minY - height * 2,
  });

  const [direction, setDirection] = useState([-1, -1]);
  const [color, setColor] = useState(initialColor);
  const [borderColor, setBorderColor] = useState(initialColor);

  const changeColor = () => {
    if (randomizeColor) {
      setColor(`hue-rotate(${randint(0, 360)}deg)`);
      setBorderColor(
        `rgb(${randint(0, 255)}, ${randint(0, 255)}, ${randint(0, 255)})`
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
        if (newX <= minX || newX >= maxX) {
          const directionIndex =
            newX <= minX
              ? direction[1] >= 0
                ? 1
                : 0
              : direction[1] >= 0
              ? 3
              : 2;
          setDirection(calculateNewDirection(directionIndex));
          changeColor();
        }
        if (newY <= minY || newY >= maxY) {
          const directionIndex =
            newY <= minY
              ? direction[0] >= 0
                ? 1
                : 3
              : direction[0] >= 0
              ? 0
              : 2;
          setDirection(calculateNewDirection(directionIndex));
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
        width: `${width}px`,
        height: `${height}px`,
        border: border ? `2px solid ${borderColor}` : "none",
        opacity: opacity,
      }}
    />
  );
};

export default Screensaver;
