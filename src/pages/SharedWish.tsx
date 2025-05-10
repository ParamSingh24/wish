
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import WishDisplay from "@/components/WishDisplay";
import HeartBackground from "@/components/HeartBackground";

const SharedWish = () => {
  const { wishId } = useParams();
  const navigate = useNavigate();
  const [wish, setWish] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!wishId) {
      setError(true);
      return;
    }

    try {
      // Decode the base64 wishId to get wish and recipient
      const decoded = atob(wishId);
      const [decodedRecipient, decodedWish] = decoded.split('||');
      
      if (!decodedRecipient || !decodedWish) {
        setError(true);
        return;
      }
      
      setRecipient(decodedRecipient);
      setWish(decodedWish);
      setIsLoading(false);
    } catch (e) {
      console.error("Failed to decode wish", e);
      setError(true);
      setIsLoading(false);
    }
  }, [wishId]);

  const handleGoHome = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center py-10 px-4">
        <HeartBackground />
        <div className="text-center">Loading wish...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center py-10 px-4">
        <HeartBackground />
        <Card className="border-birthday-pink/20 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6 md:p-10 text-center">
            <h2 className="text-2xl font-bold text-birthday-pink mb-4">Oops! This wish can't be found</h2>
            <p className="mb-6">The link might be invalid or has expired.</p>
            <Button 
              onClick={handleGoHome}
              className="bg-birthday-pink hover:bg-pink-600 text-white"
            >
              <HomeIcon className="mr-2 h-4 w-4" />
              Create New Wish
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-10 px-4">
      <HeartBackground />
      
      <div className="w-full max-w-4xl mx-auto">
        <WishDisplay 
          wish={wish} 
          recipient={recipient} 
          onBack={handleGoHome} 
        />
      </div>
    </div>
  );
};

export default SharedWish;
