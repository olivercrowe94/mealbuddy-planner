import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Profile from "@/pages/Profile";
import Schedule from "@/pages/Schedule";
import Recipes from "@/pages/Recipes";
import RecipeDetail from "@/pages/RecipeDetail";
import WeeklyFeedback from "@/pages/WeeklyFeedback";
import "./App.css";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/weekly-feedback" element={<WeeklyFeedback />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;