
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { 
  Target, 
  Scale, 
  Heart, 
  Dumbbell, 
  Zap, 
  Clock, 
  Coffee 
} from "lucide-react";
import { Label } from "@/components/ui/label";

interface FormData {
  healthGoals: string[];
  exerciseDays: number;
}

interface HealthGoalsProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const HealthGoals = ({ formData, updateFormData }: HealthGoalsProps) => {
  const goals = [
    {
      id: "weight-loss",
      label: "Weight Loss",
      description: "I want to lose weight with balanced, satisfying meals",
      icon: Scale,
    },
    {
      id: "muscle-gain",
      label: "Muscle Gain",
      description: "Build strength with protein-rich, nutritious meals",
      icon: Dumbbell,
    },
    {
      id: "maintain-weight",
      label: "Maintain Weight",
      description: "Keep a healthy balance with consistent nutrition",
      icon: Target,
    },
    {
      id: "best-nutrition",
      label: "Best Nutrition",
      description: "Focus on nutrient-dense, wholesome ingredients",
      icon: Heart,
    },
    {
      id: "improve-energy",
      label: "Improve Energy",
      description: "Feel more energetic throughout the day",
      icon: Zap,
    },
    {
      id: "save-time",
      label: "Save Time",
      description: "Quick, efficient meal prep and cooking",
      icon: Clock,
    },
    {
      id: "stress-free",
      label: "Stress-Free Cooking",
      description: "Simple, enjoyable cooking without complexity",
      icon: Coffee,
    },
  ];

  const handleGoalToggle = (goalId: string) => {
    const newGoals = formData.healthGoals.includes(goalId)
      ? formData.healthGoals.filter((g) => g !== goalId)
      : [...formData.healthGoals, goalId];
    updateFormData({ healthGoals: newGoals });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Health Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.map((goal) => {
            const isSelected = formData.healthGoals.includes(goal.id);
            return (
              <Card
                key={goal.id}
                className={`p-4 cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-purple-50 border-purple-200"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleGoalToggle(goal.id)}
              >
                <div className="flex items-center space-x-4">
                  <goal.icon className={`h-6 w-6 ${
                    isSelected ? "text-purple-500" : "text-gray-500"
                  }`} />
                  <div>
                    <h4 className="font-medium">{goal.label}</h4>
                    <p className="text-sm text-gray-500">{goal.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Exercise Frequency</Label>
          <span className="text-sm font-medium">{formData.exerciseDays} days/week</span>
        </div>
        <Slider
          value={[formData.exerciseDays]}
          onValueChange={([value]) => updateFormData({ exerciseDays: value })}
          max={7}
          min={0}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default HealthGoals;
