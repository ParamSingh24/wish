
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import WishInput from "@/components/WishInput";
import WishDisplay from "@/components/WishDisplay";
import HeartBackground from "@/components/HeartBackground";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [currentWish, setCurrentWish] = useState("");
  const [currentRecipient, setCurrentRecipient] = useState("");
  const [isDisplaying, setIsDisplaying] = useState(false);
  const navigate = useNavigate();

  const handleWishCreated = (wish: string, recipient: string) => {
    setCurrentWish(wish);
    setCurrentRecipient(recipient);
    setIsDisplaying(true);
    
    // Generate a sharable ID (base64 encoded)
    const shareId = btoa(`${recipient}||${wish}`);
    
    // Update the URL without reloading (for easy copying)
    window.history.pushState({}, '', `/share/${shareId}`);
  };

  const handleBack = () => {
    setIsDisplaying(false);
    // Reset URL when going back to create form
    window.history.pushState({}, '', '/');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-10 px-4">
      <HeartBackground />
      
      <div className="w-full max-w-4xl mx-auto">
        {!isDisplaying ? (
          <Card className="border-birthday-pink/20 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 md:p-10">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-birthday-pink mb-4">
                  Birthday Wishes
                </h1>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Create beautiful animated birthday wishes for your loved ones
                </p>
              </div>
              
              <WishInput onWishCreated={handleWishCreated} />
            </CardContent>
          </Card>
        ) : (
          <WishDisplay 
            wish={currentWish} 
            recipient={currentRecipient} 
            onBack={handleBack} 
          />
        )}
      </div>
    </div>
  );
};

export default Index;
