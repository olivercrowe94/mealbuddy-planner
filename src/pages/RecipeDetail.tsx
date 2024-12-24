import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, BarChart, Users } from "lucide-react";

// Mock data - replace with actual API call
const mockRecipeDetails = {
  "1": {
    id: "1",
    name: "Oatmeal with Berries",
    time: "15 mins",
    difficulty: "Easy",
    servings: 2,
    ingredients: [
      "1 cup rolled oats",
      "2 cups water",
      "1 cup mixed berries",
      "1 tbsp honey"
    ],
    instructions: [
      "Bring water to a boil in a pot",
      "Add oats and reduce heat to medium",
      "Cook for 5 minutes, stirring occasionally",
      "Top with berries and honey"
    ]
  }
  // Add more mock recipes as needed
};

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = mockRecipeDetails[id as keyof typeof mockRecipeDetails];

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Recipes
      </Button>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{recipe.name}</h1>

        <div className="flex gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span>{recipe.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart className="h-5 w-5" />
            <span>{recipe.difficulty}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
            <ul className="list-disc pl-5 space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <ol className="list-decimal pl-5 space-y-4">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;