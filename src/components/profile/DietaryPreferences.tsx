import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        <div className="grid gap-4">
          {preferences.map((preference) => (
            <div key={preference} className="flex items-center space-x-2">
              <Select
                value={formData.dietaryPreferences.includes(preference) ? preference : ""}
                onValueChange={() => handlePreferenceChange(preference)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={preference} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={preference}>{preference}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Allergies & Intolerances</h3>
        <div className="grid gap-4">
          {allergies.map((allergy) => (
            <div key={allergy} className="flex items-center space-x-2">
              <Select
                value={formData.allergies.includes(allergy) ? allergy : ""}
                onValueChange={() => handleAllergyChange(allergy)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={allergy} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={allergy}>{allergy}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DietaryPreferences;