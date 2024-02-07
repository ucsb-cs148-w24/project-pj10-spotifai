import React, { useEffect, useState } from "react";
import anime from "animejs";

const rainbowColors = [
  "#FF0000", // red
  "#FF7F00", // orange
  "#FFFF00", // yellow
  "#00FF00", // green
  "#0000FF", // blue
  "#4B0082", // indigo
  "#9400D3"  // violet
];

const BeatVisualizer = () => {
  const [animation, setAnimation] = useState(null);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const bpm = 140.0;

    const pulseAnimation = anime({
      targets: ".circle",
      scale: [
        { value: 1, duration: 100, easing: "easeOutQuad" },
        { value: 1.2, duration: 300, easing: "easeInOutQuad" },
        { value: 1, duration: 100, easing: "easeInQuad" },
      ],
      loop: true,
      duration: 60000 / bpm,
      update: (anim) => {
        if (anim.progress % 100 === 0) {
          const newColor = rainbowColors[currentColorIndex];
          anim.animatables.forEach((animatable) => {
            animatable.target.querySelector("circle").setAttribute("fill", newColor);
          });

          setCurrentColorIndex((currentColorIndex + 1) % rainbowColors.length);
        }
      },
    });

    setAnimation(pulseAnimation);

    // clean up after un-mounting
    return () => {
      pulseAnimation.pause();
    };
  }, [currentColorIndex]);

  return (
    <svg
      className="circle"
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#1DB954" />
    </svg>
  );
};

export default BeatVisualizer;