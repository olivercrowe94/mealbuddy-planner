import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { 
  Target, 
  Scale, 
  Heart, 
  Dumbbell, 
  Zap, 
  Clock, 
  Coffee 
} from "lucide-react";

interface FormData {
  healthGoals: string[];
  cookingLevel: string;
  aspirationalLevel: string;
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

  const cookingLevels = [
    {
      value: "newcomer",
      label: "Complete Newcomer",
      description: "I've barely boiled water; I need the easiest recipes",
    },
    {
      value: "basic",
      label: "Basic Cook",
      description: "I can follow simple recipes and do basic prep",
    },
    {
      value: "comfortable",
      label: "Comfortable Cook",
      description: "I can handle most standard recipes without stress",
    },
    {
      value: "enthusiast",
      label: "Enthusiastic Hobbyist",
      description: "I enjoy cooking new dishes and experimenting",
    },
    {
      value: "seasoned",
      label: "Seasoned Home Chef",
      description: "I'm experienced with advanced techniques",
    },
    {
      value: "aspiring-pro",
      label: "Aspiring Pro",
      description: "I love challenging recipes and want to refine my skills",
    },
  ];

  const aspirationalLevels = [
    {
      value: "stay-same",
      label: "Stay at the Same Level",
      description: "I'm comfortable where I am",
    },
    {
      value: "gain-confidence",
      label: "Gain Confidence",
      description: "I'd like to move from basic to comfortable cooking",
    },
    {
      value: "explore",
      label: "Explore & Experiment",
      description: "I want to try new dishes and techniques",
    },
    {
      value: "master",
      label: "Master Advanced Techniques",
      description: "I'd love to tackle gourmet-level cooking",
    },
    {
      value: "professional",
      label: "Professional Aspirations",
      description: "I'm thinking about culinary school or professional-level skills",
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
        <h3 className="text-lg font-medium">Cooking Experience</h3>
        <Select
          value={formData.cookingLevel}
          onValueChange={(value) => updateFormData({ cookingLevel: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your cooking level" />
          </SelectTrigger>
          <SelectContent>
            {cookingLevels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                <div className="flex flex-col py-2">
                  <span className="font-medium">{level.label}</span>
                  <span className="text-sm text-gray-500">{level.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Aspirational Cooking Level</h3>
        <p className="text-sm text-gray-500">Where do you see yourself in a few months or a year?</p>
        <Select
          value={formData.aspirationalLevel}
          onValueChange={(value) => updateFormData({ aspirationalLevel: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your goal cooking level" />
          </SelectTrigger>
          <SelectContent>
            {aspirationalLevels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                <div className="flex flex-col py-2">
                  <span className="font-medium">{level.label}</span>
                  <span className="text-sm text-gray-500">{level.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default HealthGoals;