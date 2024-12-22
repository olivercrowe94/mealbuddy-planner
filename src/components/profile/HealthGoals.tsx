import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface HealthGoalsProps {
  formData: {
    healthGoals: string[];
    cookingLevel: string;
  };
  updateFormData: (data: Partial<typeof formData>) => void;
}

const HealthGoals = ({ formData, updateFormData }: HealthGoalsProps) => {
  const goals = [
    "Weight Loss",
    "Muscle Gain",
    "Maintain Weight",
    "Improve Energy",
    "Better Nutrition",
    "Save Time",
  ];

  const handleGoalChange = (goal: string) => {
    const newGoals = formData.healthGoals.includes(goal)
      ? formData.healthGoals.filter((g) => g !== goal)
      : [...formData.healthGoals, goal];
    updateFormData({ healthGoals: newGoals });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Health Goals</h3>
        <div className="grid grid-cols-2 gap-4">
          {goals.map((goal) => (
            <div key={goal} className="flex items-center space-x-2">
              <Checkbox
                id={goal}
                checked={formData.healthGoals.includes(goal)}
                onCheckedChange={() => handleGoalChange(goal)}
              />
              <Label htmlFor={goal}>{goal}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Cooking Experience</h3>
        <Select
          value={formData.cookingLevel}
          onValueChange={(value) => updateFormData({ cookingLevel: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your cooking level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default HealthGoals;