
import { HeartIcon, SparklesIcon } from "lucide-react";
import { useEffect, useState } from "react";

const HeartBackground = () => {
  const [elements, setElements] = useState<Array<{
    id: number;
    type: "heart" | "sparkle";
    size: number;
    left: string;
    top: string;
    opacity: number;
    animationDuration: string;
    animationDelay: string;
    rotate: number;
  }>>([]);

  useEffect(() => {
    // Create a mix of hearts and sparkles
    const items = [];
    
    // Add hearts
    for (let i = 0; i < 20; i++) {
      items.push({
        id: i,
        type: "heart",
        size: Math.random() * 20 + 8,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.4 + 0.1,
        animationDuration: `${Math.random() * 10 + 15}s`,
        animationDelay: `${Math.random() * 5}s`,
        rotate: Math.random() * 360,
      });
    }
    
    // Add sparkles
    for (let i = 20; i < 35; i++) {
      items.push({
        id: i,
        type: "sparkle",
        size: Math.random() * 14 + 5,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.3 + 0.1,
        animationDuration: `${Math.random() * 8 + 10}s`,
        animationDelay: `${Math.random() * 5}s`,
        rotate: Math.random() * 360,
      });
    }
    
    setElements(items);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-white opacity-70"></div>
      
      {elements.map((elem) => (
        elem.type === "heart" ? (
          <HeartIcon
            key={elem.id}
            fill="currentColor"
            className="fixed text-birthday-pink"
            style={{
              width: elem.size,
              height: elem.size,
              left: elem.left,
              top: elem.top,
              opacity: elem.opacity,
              animation: `float ${elem.animationDuration} ease-in-out infinite`,
              animationDelay: elem.animationDelay,
              transform: `rotate(${elem.rotate}deg)`,
            }}
          />
        ) : (
          <SparklesIcon
            key={elem.id}
            className="fixed text-birthday-gold"
            style={{
              width: elem.size,
              height: elem.size,
              left: elem.left,
              top: elem.top,
              opacity: elem.opacity,
              animation: `float ${elem.animationDuration} ease-in-out infinite`,
              animationDelay: elem.animationDelay,
              transform: `rotate(${elem.rotate}deg)`,
            }}
          />
        )
      ))}
    </div>
  );
};

export default HeartBackground;
