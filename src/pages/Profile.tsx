import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BasicInfo from "@/components/profile/BasicInfo";
import DietaryPreferences from "@/components/profile/DietaryPreferences";
import HealthGoals from "@/components/profile/HealthGoals";
import { useToast } from "@/components/ui/use-toast";

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

    if (step === 3) {
      navigate("/schedule");
      return;
    }

    setStep(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`w-1/3 h-2 rounded-full mx-1 ${
                  step >= num ? "bg-[#9b87f5]" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {step === 1 && "Basic Information"}
            {step === 2 && "Dietary Preferences"}
            {step === 3 && "Health Goals"}
          </h2>
        </div>

        <div className="mb-8">
          {step === 1 && (
            <BasicInfo formData={formData} updateFormData={updateFormData} />
          )}
          {step === 2 && (
            <DietaryPreferences formData={formData} updateFormData={updateFormData} />
          )}
          {step === 3 && (
            <HealthGoals formData={formData} updateFormData={updateFormData} />
          )}
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
            {step === 3 ? "Continue to Schedule" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;