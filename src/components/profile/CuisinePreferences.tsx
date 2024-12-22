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
  cuisinePreferences: string[];
  flavorProfiles: string[];
}

interface CuisinePreferencesProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const CuisinePreferences = ({ formData, updateFormData }: CuisinePreferencesProps) => {
  const cuisines = [
    "Mediterranean",
    "Asian",
    "Mexican",
    "Indian",
    "Italian",
    "American",
    "French",
    "Middle Eastern",
    "Japanese",
    "Thai",
    "Korean",
    "Vietnamese",
  ];

  const flavorProfiles = [
    "Spicy",
    "Sweet",
    "Savory",
    "Mild",
    "Tangy",
    "Umami",
    "Fresh",
    "Rich",
  ];

  const handleCuisineChange = (value: string) => {
    const newPreferences = formData.cuisinePreferences.includes(value)
      ? formData.cuisinePreferences.filter((p) => p !== value)
      : [...formData.cuisinePreferences, value];
    updateFormData({ cuisinePreferences: newPreferences });
  };

  const handleFlavorChange = (value: string) => {
    const newProfiles = formData.flavorProfiles.includes(value)
      ? formData.flavorProfiles.filter((p) => p !== value)
      : [...formData.flavorProfiles, value];
    updateFormData({ flavorProfiles: newProfiles });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Cuisine Preferences</h3>
        <Select
          value=""
          onValueChange={handleCuisineChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select cuisines" />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-[200px]">
              {cuisines.map((cuisine) => (
                <SelectItem key={cuisine} value={cuisine}>
                  {cuisine}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.cuisinePreferences.map((cuisine) => (
            <Badge
              key={cuisine}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => handleCuisineChange(cuisine)}
            >
              {cuisine} ×
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Flavor Profiles</h3>
        <Select
          value=""
          onValueChange={handleFlavorChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select flavor profiles" />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-[200px]">
              {flavorProfiles.map((flavor) => (
                <SelectItem key={flavor} value={flavor}>
                  {flavor}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.flavorProfiles.map((flavor) => (
            <Badge
              key={flavor}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => handleFlavorChange(flavor)}
            >
              {flavor} ×
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CuisinePreferences;