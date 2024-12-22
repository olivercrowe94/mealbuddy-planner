import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface DietaryPreferencesProps {
  formData: {
    dietaryPreferences: string[];
    allergies: string[];
  };
  updateFormData: (data: Partial<typeof formData>) => void;
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
  ];

  const allergies = [
    "Nuts",
    "Dairy",
    "Eggs",
    "Soy",
    "Wheat",
    "Fish",
    "Shellfish",
  ];

  const handlePreferenceChange = (preference: string) => {
    const newPreferences = formData.dietaryPreferences.includes(preference)
      ? formData.dietaryPreferences.filter((p) => p !== preference)
      : [...formData.dietaryPreferences, preference];
    updateFormData({ dietaryPreferences: newPreferences });
  };

  const handleAllergyChange = (allergy: string) => {
    const newAllergies = formData.allergies.includes(allergy)
      ? formData.allergies.filter((a) => a !== allergy)
      : [...formData.allergies, allergy];
    updateFormData({ allergies: newAllergies });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Dietary Preferences</h3>
        <div className="grid grid-cols-2 gap-4">
          {preferences.map((preference) => (
            <div key={preference} className="flex items-center space-x-2">
              <Checkbox
                id={preference}
                checked={formData.dietaryPreferences.includes(preference)}
                onCheckedChange={() => handlePreferenceChange(preference)}
              />
              <Label htmlFor={preference}>{preference}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Allergies & Intolerances</h3>
        <div className="grid grid-cols-2 gap-4">
          {allergies.map((allergy) => (
            <div key={allergy} className="flex items-center space-x-2">
              <Checkbox
                id={allergy}
                checked={formData.allergies.includes(allergy)}
                onCheckedChange={() => handleAllergyChange(allergy)}
              />
              <Label htmlFor={allergy}>{allergy}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DietaryPreferences;