import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FormData {
  dietaryPreferences: string[];
  allergies: string[];
}

interface DietaryPreferencesProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const DietaryPreferences = ({ formData, updateFormData }: DietaryPreferencesProps) => {
  const preferences = [
    "Vegetarian",
    "Vegan",
    "Pescatarian",
    "Gluten-Free",
    "Dairy-Free",
    "Keto",
    "Paleo",
    "No Red Meat",
    "Omnivore",
  ];

  const allergies = [
    "None",
    "Nuts",
    "Dairy",
    "Eggs",
    "Soy",
    "Wheat",
    "Fish",
    "Shellfish",
    "Gluten",
  ];

  const handlePreferenceChange = (value: string) => {
    const newPreferences = formData.dietaryPreferences.includes(value)
      ? formData.dietaryPreferences.filter((p) => p !== value)
      : [...formData.dietaryPreferences, value];
    updateFormData({ dietaryPreferences: newPreferences });
  };

  const handleAllergyChange = (value: string) => {
    if (value === "None") {
      updateFormData({ allergies: [] });
      return;
    }
    const newAllergies = formData.allergies.includes(value)
      ? formData.allergies.filter((a) => a !== value)
      : [...formData.allergies, value];
    updateFormData({ allergies: newAllergies });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Dietary Preferences</h3>
        <Select
          value=""
          onValueChange={handlePreferenceChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select dietary preferences" />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-[200px]">
              {preferences.map((preference) => (
                <SelectItem key={preference} value={preference}>
                  {preference}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.dietaryPreferences.map((preference) => (
            <Badge
              key={preference}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => handlePreferenceChange(preference)}
            >
              {preference} ×
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Allergies & Intolerances</h3>
        <Select
          value=""
          onValueChange={handleAllergyChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select allergies" />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-[200px]">
              {allergies.map((allergy) => (
                <SelectItem key={allergy} value={allergy}>
                  {allergy}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.allergies.map((allergy) => (
            <Badge
              key={allergy}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => handleAllergyChange(allergy)}
            >
              {allergy} ×
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DietaryPreferences;