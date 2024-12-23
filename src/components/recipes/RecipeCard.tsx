import { Clock, BarChart } from "lucide-react";

interface RecipeCardProps {
  recipe: {
    name: string;
    time: string;
    difficulty: string;
  };
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <div className="bg-accent/50 rounded-lg p-4 hover:bg-accent/70 transition-colors">
      <h4 className="text-lg font-medium mb-3">{recipe.name}</h4>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{recipe.time}</span>
        </div>
        <div className="flex items-center gap-1">
          <BarChart className="h-4 w-4" />
          <span>{recipe.difficulty}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;