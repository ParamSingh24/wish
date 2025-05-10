
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { HeartIcon, Share2Icon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WishInputProps {
  onWishCreated: (wish: string, recipient: string) => void;
}

const WishInput = ({ onWishCreated }: WishInputProps) => {
  const [wish, setWish] = useState("");
  const [recipient, setRecipient] = useState("");
  const [showShare, setShowShare] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!wish.trim()) {
      toast({
        title: "Wish Required",
        description: "Please enter your birthday wish",
        variant: "destructive",
      });
      return;
    }
    
    if (!recipient.trim()) {
      toast({
        title: "Recipient Required",
        description: "Please enter who this wish is for",
        variant: "destructive",
      });
      return;
    }

    onWishCreated(wish, recipient);
    setShowShare(true);
    
    toast({
      title: "Wish Created!",
      description: "Your birthday wish has been created with love"
    });
  };

  const generateShareableLink = () => {
    // Create a base64 encoded string with recipient and wish
    const encoded = btoa(`${recipient}||${wish}`);
    const shareUrl = `${window.location.origin}/share/${encoded}`;
    
    // Copy to clipboard
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
    <div className="space-y-6 w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-birthday-pink mb-2">Create a Wish</h2>
        <p className="text-muted-foreground">Send your heartfelt birthday wishes</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="recipient" className="block text-sm font-medium">
            To:
          </label>
          <input
            id="recipient"
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="Who is this wish for?"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="wish" className="block text-sm font-medium">
            Your Birthday Wish:
          </label>
          <Textarea
            id="wish"
            placeholder="Write your heartfelt birthday message here..."
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            className="min-h-[150px] resize-none"
          />
        </div>
        
        <div className="flex gap-2 flex-col sm:flex-row">
          <Button 
            type="submit" 
            className="flex-1 group bg-birthday-pink hover:bg-pink-600 text-white"
          >
            Create Wish
            <HeartIcon className="ml-2 h-4 w-4 group-hover:animate-heart-beat" />
          </Button>
          
          {wish && recipient && (
            <Button 
              type="button"
              onClick={generateShareableLink}
              className="flex-1 sm:flex-initial bg-birthday-purple hover:bg-purple-700 text-white"
            >
              <Share2Icon className="mr-2 h-4 w-4" />
              Copy Share Link
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default WishInput;
