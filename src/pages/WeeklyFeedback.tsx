import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Mock data - replace with actual API call
const mockWeeklyRecipes = {
  "1": "Oatmeal with Berries",
  "2": "Chicken Caesar Salad",
  "3": "Grilled Salmon",
  // Add more recipes as needed
};

const WeeklyFeedback = () => {
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the feedback to your API
    console.log({
      recipeId: selectedRecipe,
      rating,
      feedback
    });

    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! This will help improve future recipes.",
    });

    // Reset form
    setSelectedRecipe("");
    setRating("");
    setFeedback("");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Weekly Recipe Feedback</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Recipe</label>
            <Select
              value={selectedRecipe}
              onValueChange={setSelectedRecipe}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a recipe" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(mockWeeklyRecipes).map(([id, name]) => (
                  <SelectItem key={id} value={id}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Rating</label>
            <Select
              value={rating}
              onValueChange={setRating}
            >
              <SelectTrigger>
                <SelectValue placeholder="Rate this recipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                <SelectItem value="4">⭐⭐⭐⭐ Very Good</SelectItem>
                <SelectItem value="3">⭐⭐⭐ Good</SelectItem>
                <SelectItem value="2">⭐⭐ Fair</SelectItem>
                <SelectItem value="1">⭐ Poor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Additional Feedback</label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts about this recipe..."
              className="min-h-[100px]"
            />
          </div>

          <Button 
            type="submit"
            className="w-full"
            disabled={!selectedRecipe || !rating}
          >
            Submit Feedback
          </Button>
        </form>
      </div>
    </div>
  );
};

export default WeeklyFeedback;