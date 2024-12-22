import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import BasicInfo from "@/components/profile/BasicInfo";
import DietaryPreferences from "@/components/profile/DietaryPreferences";
import HealthGoals from "@/components/profile/HealthGoals";
import HouseholdInfo from "@/components/profile/HouseholdInfo";
import KitchenEquipment from "@/components/profile/KitchenEquipment";
import CuisinePreferences from "@/components/profile/CuisinePreferences";
import { Check } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dietaryPreferences: [] as string[],
    allergies: [] as string[],
    healthGoals: [] as string[],
    cookingLevel: "",
    aspirationalLevel: "",
    householdSize: "",
    budget: "",
    equipment: [] as string[],
    cuisinePreferences: [] as string[],
    flavorProfiles: [] as string[],
  });

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (step === 1 && (!formData.name || !formData.age)) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields before continuing.",
        variant: "destructive",
      });
      return;
    }
    
    if (step === 2 && formData.dietaryPreferences.length === 0) {
      toast({
        title: "Dietary Preferences Required",
        description: "Please select at least one dietary preference.",
        variant: "destructive",
      });
      return;
    }

    if (step === 6) {
      toast({
        title: "Profile Complete!",
        description: "Your profile has been saved successfully.",
      });
      navigate("/schedule");
      return;
    }

    setStep(prev => prev + 1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <BasicInfo formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <DietaryPreferences formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <HealthGoals formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <HouseholdInfo formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <KitchenEquipment formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <CuisinePreferences formData={formData} updateFormData={updateFormData} />;
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Basic Information";
      case 2:
        return "Dietary Preferences";
      case 3:
        return "Health Goals";
      case 4:
        return "Household Information";
      case 5:
        return "Kitchen Equipment";
      case 6:
        return "Cuisine Preferences";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className={`w-1/6 h-2 rounded-full mx-1 ${
                  step >= num ? "bg-[#9b87f5]" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {getStepTitle()}
          </h2>
        </div>

        <div className="mb-8">
          {renderStepContent()}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => step > 1 ? setStep(prev => prev - 1) : navigate("/")}
            className="px-6"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            className="bg-[#9b87f5] hover:bg-[#8b77e5] px-6"
          >
            {step === 6 ? (
              <span className="flex items-center gap-2">
                Complete Profile <Check className="w-4 h-4" />
              </span>
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;