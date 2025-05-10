
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeartIcon, PartyPopper, SparklesIcon, Share2Icon } from "lucide-react";
import ConfettiExplosion from "./ConfettiExplosion";
import { useToast } from "@/hooks/use-toast";

interface WishDisplayProps {
  wish: string;
  recipient: string;
  onBack: () => void;
}

const WishDisplay = ({ wish, recipient, onBack }: WishDisplayProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; left: string; delay: string }[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Show confetti when component mounts
    setShowConfetti(true);
    
    // Generate random floating hearts
    const interval = setInterval(() => {
      createRandomHeart();
    }, 800);
    
    return () => clearInterval(interval);
  }, []);
  
  const createRandomHeart = () => {
    const id = Date.now();
    const left = `${Math.random() * 100}%`;
    const delay = `${Math.random() * 0.5}s`;
    
    setHearts(prev => [...prev.slice(-15), { id, left, delay }]);
  };

  const handleShareLink = () => {
    const encoded = btoa(`${recipient}||${wish}`);
    const shareUrl = `${window.location.origin}/share/${encoded}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast({
        title: "Link Copied!",
        description: "Share this link with your friends"
      });
    }).catch(err => {
      console.error('Failed to copy link: ', err);
      toast({
        title: "Couldn't copy link",
        description: "Please try again or copy it manually",
        variant: "destructive"
      });
    });
  };

  return (
    <div className="relative min-h-[60vh] flex flex-col items-center justify-center">
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
      
      <Card className="w-full max-w-lg mx-auto bg-white shadow-lg border-birthday-lavender animate-fade-in relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-birthday-pink via-birthday-purple to-birthday-gold"></div>
        <CardContent className="p-6 md:p-8">
          <div className="flex justify-center mb-4">
            <SparklesIcon className="text-birthday-gold animate-pulse h-6 w-6" />
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-center font-bold mb-6 text-birthday-pink">
            Happy Birthday, {recipient}!
          </h1>
          
          <div className="bg-birthday-lavender/30 p-6 rounded-lg mb-6 relative">
            <div className="absolute -top-3 -left-3">
              <HeartIcon className="h-6 w-6 text-birthday-pink animate-heart-beat" fill="currentColor" />
            </div>
            <div className="absolute -bottom-3 -right-3">
              <HeartIcon className="h-6 w-6 text-birthday-pink animate-heart-beat" fill="currentColor" />
            </div>
            <p className="text-center italic font-dancing text-xl md:text-2xl leading-relaxed">
              "{wish}"
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
            <Button
              onClick={onBack}
              className="bg-birthday-pink hover:bg-pink-600 text-white group"
            >
              <PartyPopper className="mr-2 h-4 w-4 group-hover:animate-wiggle" />
              Create Another Wish
            </Button>
            
            <Button
              onClick={handleShareLink}
              className="bg-birthday-purple hover:bg-purple-700 text-white"
            >
              <Share2Icon className="mr-2 h-4 w-4" />
              Share This Wish
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WishDisplay;
