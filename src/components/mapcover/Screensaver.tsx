import { useState, useEffect } from "react";

const randint = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

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

  const [direction, setDirection] = useState([1, 1]);
  const [color, setColor] = useState(initialColor);

  const updateDirection = (index: number, value: number) => {
    const newDirection = [...direction];
    newDirection[index] = value;
    setDirection(newDirection);

    if (randomizeColor) {
      setColor(
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
        // Bounce on the left/right side
        if (newX <= minX) {
          updateDirection(0, 1);
        } else if (newX >= maxX) {
          updateDirection(0, -1);
        }
        // Bounce on the top/bottom side
        if (newY <= minY) {
          updateDirection(1, 1);
        } else if (newY >= maxY) {
          updateDirection(1, -1);
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
      //   alt="DVD Logo"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        position: "absolute",
        fill: color,
        width: `${width}px`, // Use your preferred size here
        height: `${height}px`, // Use your preferred size here
      }}
    />
  );
};

export default Screensaver;
