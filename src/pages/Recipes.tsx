import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBasket, ChevronRight, Home, User, Calendar, UtensilsCrossed } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RecipeCard from "@/components/recipes/RecipeCard";
import { useToast } from "@/hooks/use-toast";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MEALS = ["Breakfast", "Lunch", "Dinner"];

// Temporary mock data - replace with actual API call
const mockRecipes = {
  Monday: {
    Breakfast: { name: "Oatmeal with Berries", time: "15 mins", difficulty: "Easy" },
    Lunch: { name: "Chicken Caesar Salad", time: "20 mins", difficulty: "Medium" },
    Dinner: { name: "Grilled Salmon", time: "30 mins", difficulty: "Medium" }
  },
  Tuesday: {
    Lunch: { name: "Quinoa Bowl", time: "25 mins", difficulty: "Easy" },
    Dinner: { name: "Vegetable Stir Fry", time: "20 mins", difficulty: "Medium" }
  },
  Wednesday: {
    Breakfast: { name: "Greek Yogurt Parfait", time: "10 mins", difficulty: "Easy" },
    Lunch: { name: "Turkey Wrap", time: "15 mins", difficulty: "Easy" },
    Dinner: { name: "Pasta Primavera", time: "35 mins", difficulty: "Medium" }
  },
  Thursday: {
    Breakfast: { name: "Scrambled Eggs", time: "10 mins", difficulty: "Easy" },
    Dinner: { name: "Baked Chicken", time: "45 mins", difficulty: "Medium" }
  },
  Friday: {
    Lunch: { name: "Tuna Salad", time: "15 mins", difficulty: "Easy" },
    Dinner: { name: "Pizza Night", time: "30 mins", difficulty: "Medium" }
  },
  Saturday: {
    Breakfast: { name: "Pancakes", time: "25 mins", difficulty: "Medium" },
    Lunch: { name: "Grilled Cheese", time: "15 mins", difficulty: "Easy" },
    Dinner: { name: "Steak and Potatoes", time: "40 mins", difficulty: "Hard" }
  },
  Sunday: {
    Breakfast: { name: "French Toast", time: "20 mins", difficulty: "Medium" },
    Lunch: { name: "Soup and Sandwich", time: "25 mins", difficulty: "Easy" },
    Dinner: { name: "Roast Chicken", time: "90 mins", difficulty: "Hard" }
  }
};

export default function RecipesPage() {
  const [loading, setLoading] = useState(false);
  const [activeDay, setActiveDay] = useState(DAYS[0]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleBasketClick = () => {
    navigate("/schedule");
    toast({
      title: "Opening Shopping Basket",
      description: "Redirecting to your weekly schedule to view the basket."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="flex h-full">
        {/* Left Navigation */}
        <div className="w-64 bg-white shadow-lg p-6 space-y-4">
          <div className="flex items-center gap-2 text-purple-600 font-medium mb-8">
            <UtensilsCrossed className="w-5 h-5" />
            <span>Weekly Recipes</span>
          </div>
          
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate("/")}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate("/profile")}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate("/schedule")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Weekly Schedule
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start bg-purple-50"
          >
            <UtensilsCrossed className="mr-2 h-4 w-4" />
            Recipes
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Weekly Recipes</h1>
              <Button
                onClick={handleBasketClick}
                className="bg-[#9b87f5] hover:bg-[#8b77e5]"
              >
                <ShoppingBasket className="mr-2 h-4 w-4" />
                View Shopping Basket
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <Tabs defaultValue={activeDay} onValueChange={setActiveDay} className="w-full">
              <ScrollArea className="w-full">
                <TabsList className="w-full justify-start mb-6 bg-transparent">
                  {DAYS.map((day) => (
                    <TabsTrigger
                      key={day}
                      value={day}
                      className="data-[state=active]:bg-[#9b87f5] data-[state=active]:text-white"
                    >
                      {day}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </ScrollArea>

              {DAYS.map((day) => (
                <TabsContent key={day} value={day} className="mt-6">
                  {loading ? (
                    <div className="space-y-4">
                      {MEALS.map((meal) => (
                        <Skeleton key={meal} className="h-[200px] w-full" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-8">
                      {MEALS.map((meal) => (
                        <Card key={meal}>
                          <CardContent className="p-6">
                            <h3 className="text-xl font-semibold mb-4">{meal}</h3>
                            {mockRecipes[day]?.[meal] ? (
                              <RecipeCard recipe={mockRecipes[day][meal]} />
                            ) : (
                              <p className="text-muted-foreground">
                                No {meal.toLowerCase()} recipe scheduled for {day}.
                              </p>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}