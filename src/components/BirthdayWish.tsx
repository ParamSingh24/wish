import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { HeartIcon, SparklesIcon, CakeIcon, GiftIcon } from "lucide-react";
import ConfettiExplosion from "./ConfettiExplosion";

const BirthdayWish = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; left: string; delay: string }[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show confetti when component mounts
    setShowConfetti(true);

    // Generate random floating hearts
    const interval = setInterval(() => {
      createRandomHeart();
    }, 800);

    // Trigger animation after a slight delay
    setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const createRandomHeart = () => {
    const id = Date.now();
    const left = `${Math.random() * 100}%`;
    const delay = `${Math.random() * 0.5}s`;

    setHearts(prev => [...prev.slice(-20), { id, left, delay }]);
  };

  return (
    <div className="relative min-h-[70vh] flex flex-col items-center justify-center w-full max-w-5xl mx-auto z-10">
      {/* Floating hearts container */}
      <div className="heart-container fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="heart"
            style={{
              left: heart.left,
              bottom: "5%",
              animationDelay: heart.delay
            }}
          >
            <HeartIcon
              size={Math.random() * 24 + 10}
              className="text-birthday-pink"
              fill="currentColor"
            />
          </div>
        ))}
      </div>

      {/* Confetti effect */}
      {showConfetti && <ConfettiExplosion />}

      <div className={`transform transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <Card className="w-full max-w-2xl mx-auto bg-white/90 shadow-2xl border-birthday-purple backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-birthday-pink via-birthday-purple to-birthday-gold"></div>

          <div className="absolute -left-12 -top-12 w-40 h-40 rounded-full bg-gradient-to-br from-birthday-pink/30 to-birthday-purple/30 blur-xl"></div>
          <div className="absolute -right-12 -bottom-12 w-40 h-40 rounded-full bg-gradient-to-tr from-birthday-gold/30 to-birthday-lavender/30 blur-xl"></div>

          <CardContent className="p-8 md:p-12 relative z-10">
            <div className="flex justify-center mb-6 gap-3">
              <CakeIcon className="text-birthday-gold h-8 w-8 animate-float" fill="rgba(254, 247, 205, 0.5)" />
              <SparklesIcon className="text-birthday-pink h-8 w-8 animate-pulse" />
              <GiftIcon className="text-birthday-purple h-8 w-8 animate-float" fill="rgba(229, 222, 255, 0.5)" />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl text-center font-bold mb-6 text-birthday-pink">
              Happy Birthday Best Mam 🎉
            </h1>

            <div className="bg-gradient-to-r from-birthday-lavender/40 to-birthday-gold/30 p-6 md:p-8 rounded-lg mb-8 shadow-inner relative">
              <div className="absolute -top-3 -left-3">
                <HeartIcon className="h-6 w-6 text-birthday-pink animate-heart-beat" fill="currentColor" />
              </div>
              <div className="absolute -bottom-3 -right-3">
                <HeartIcon className="h-6 w-6 text-birthday-pink animate-heart-beat" fill="currentColor" />
              </div>
              <p className="text-center italic font-dancing text-2xl md:text-3xl lg:text-4xl leading-relaxed text-gray-800">
                You treat us like our mom , you are a person with a golden heart , A women with sparking eyes , you have a heart of a whale and you love your students like your children ❤  , you are such a beautiful soul mam people like your are very less in this planet and I personally feel you need a round off applause from everyone for your teaching skills , your guiding skills and for your kindness
                I am wishing You a happy birthday Mam 🎉
                Maybe we will not get taught by you anymore , CSE  AI 1A
                Will get passed out someday but we will be always in your heart ❤ we will never forget you mam , May god fulfil your all wishes and may you get what you deserve
              </p>
            </div>

            <div className="flex justify-center">
              <div className="flex flex-row space-x-3 animate-float">
                <HeartIcon className="h-6 w-6 text-birthday-pink" fill="currentColor" />
                <HeartIcon className="h-8 w-8 text-birthday-pink" fill="currentColor" />
                <HeartIcon className="h-6 w-6 text-birthday-pink" fill="currentColor" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BirthdayWish;
