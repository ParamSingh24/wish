
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HeartBackground from "@/components/HeartBackground";
import BirthdayWish from "@/components/BirthdayWish";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="min-h-screen w-full flex items-center justify-center py-10 px-4">
        <HeartBackground />
        <BirthdayWish />
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
