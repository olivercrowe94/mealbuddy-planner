import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  Clock,
  BarChart,
  Users,
  Flame,
  UtensilsCrossed,
  AlertCircle,
  Heart
} from "lucide-react";

// Mock data - replace with actual API call
const mockRecipeDetails = {
  "1": {
    id: "1",
    name: "Oatmeal with Berries",
    time: "15 mins",
    difficulty: "Easy",
    servings: 2,
    calories: "320 kcal",
    allergies: ["Nuts", "Dairy optional"],
    ingredients: [
      "1 cup rolled oats",
      "2 cups water",
      "1 cup mixed berries",
      "1 tbsp honey",
      "Optional: splash of milk",
      "Pinch of salt"
    ],
    instructions: [
      "Bring water to a boil in a pot",
      "Add oats and reduce heat to medium",
      "Cook for 5 minutes, stirring occasionally",
      "Add a pinch of salt for taste",
      "Remove from heat and let stand for 2 minutes",
      "Top with berries and honey",
      "Add a splash of milk if desired"
    ],
    tips: [
      "Use old-fashioned rolled oats for best texture",
      "Fresh or frozen berries both work well",
      "Prepare extra portions for meal prep"
    ]
  }
  // Add more mock recipes as needed
};

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = mockRecipeDetails[id as keyof typeof mockRecipeDetails];

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <UtensilsCrossed className="mx-auto h-12 w-12 text-muted-foreground" />
              <h2 className="text-xl font-semibold">Recipe Not Found</h2>
              <p className="text-muted-foreground">
                We couldn't find the recipe you're looking for.
              </p>
              <Button
                variant="default"
                onClick={() => navigate("/recipes")}
                className="mt-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Recipes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        {/* Navigation */}
        <Button
          variant="ghost"
          onClick={() => navigate("/recipes")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Recipes
        </Button>

        {/* Recipe Header */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{recipe.name}</h1>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {/* Recipe Stats */}
          <Card className="bg-accent/50">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span>{recipe.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-muted-foreground" />
                  <span>{recipe.difficulty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span>{recipe.servings} servings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-muted-foreground" />
                  <span>{recipe.calories}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Allergies Warning */}
          {recipe.allergies && recipe.allergies.length > 0 && (
            <Card className="bg-destructive/10">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0" />
                  <div>
                    <p className="font-medium">Allergy Information</p>
                    <p className="text-sm text-muted-foreground">
                      Contains: {recipe.allergies.join(", ")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Ingredients */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
                <ScrollArea className="h-[300px] pr-4">
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                <ScrollArea className="h-[300px] pr-4">
                  <ol className="space-y-4">
                    {recipe.instructions.map((step, index) => (
                      <li key={index} className="flex gap-4">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm">
                          {index + 1}
                        </span>
                        <p className="text-muted-foreground">{step}</p>
                      </li>
                    ))}
                  </ol>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Tips */}
          {recipe.tips && recipe.tips.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Chef's Tips</h2>
                <ul className="space-y-2">
                  {recipe.tips.map((tip, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <UtensilsCrossed className="h-4 w-4 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;