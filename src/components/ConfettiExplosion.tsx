
import { useEffect, useState } from "react";

const ConfettiExplosion = () => {
  const [particles, setParticles] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    const colors = ["#FE6479", "#E5DEFF", "#FEF7CD", "#D6BCFA", "#F7D1BA", "#A5D7E8"];
    const shapes = ["circle", "square", "triangle", "heart"];
    const particleCount = 150;
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      const left = `${Math.random() * 100}%`;
      const top = `${Math.random() * 40}%`;
      const size = `${Math.random() * 10 + 5}px`;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const angle = Math.random() * 360;
      const delay = `${Math.random() * 0.7}s`;
      const duration = `${Math.random() * 3 + 3}s`;
      
      let borderRadius = "50%"; // circle by default
      if (shape === "square") borderRadius = "0";
      if (shape === "triangle") borderRadius = "0";
      if (shape === "heart") borderRadius = "50% 50% 0 0";
      
      let transform = `rotate(${angle}deg)`;
      if (shape === "triangle") {
        transform = `rotate(${angle}deg) skew(30deg, 30deg)`;
      } else if (shape === "heart") {
        transform = `rotate(45deg)`;
      }
      
      newParticles.push(
        <div
          key={i}
          className="fixed z-10"
          style={{
            left,
            top,
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius,
            transform,
            animation: `fall ${duration} ease-out forwards`,
            animationDelay: delay,
            opacity: 0,
          }}
        />
      );
    }
    
    setParticles(newParticles);
    
    const cleanup = setTimeout(() => {
      setParticles([]);
    }, 7000);
    
    return () => clearTimeout(cleanup);
  }, []);
  
  return (
    <>
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            25% {
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
        `}
      </style>
      {particles}
    </>
  );
};

export default ConfettiExplosion;
