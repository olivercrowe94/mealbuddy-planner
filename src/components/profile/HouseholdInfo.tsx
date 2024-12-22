import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormData {
  householdSize: string;
  budget: string;
}

interface HouseholdInfoProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const HouseholdInfo = ({ formData, updateFormData }: HouseholdInfoProps) => {
  const budgetOptions = [
    { value: "low", label: "Low - Budget-conscious meals" },
    { value: "medium", label: "Medium - Balanced cost and quality" },
    { value: "high", label: "High - Premium ingredients" },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="householdSize">Household Size</Label>
        <Select
          value={formData.householdSize}
          onValueChange={(value) => updateFormData({ householdSize: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select household size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Cooking for 1</SelectItem>
            <SelectItem value="2">Cooking for 2</SelectItem>
            <SelectItem value="3-4">Cooking for 3-4</SelectItem>
            <SelectItem value="5+">Cooking for 5+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="budget">Budget Level</Label>
        <Select
          value={formData.budget}
          onValueChange={(value) => updateFormData({ budget: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select budget level" />
          </SelectTrigger>
          <SelectContent>
            {budgetOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex flex-col py-2">
                  <span className="font-medium capitalize">{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default HouseholdInfo;