import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";
import BasicInfo from "@/components/profile/BasicInfo";
import DietaryPreferences from "@/components/profile/DietaryPreferences";
import HealthGoals from "@/components/profile/HealthGoals";
import HouseholdInfo from "@/components/profile/HouseholdInfo";
import KitchenEquipment from "@/components/profile/KitchenEquipment";
import CuisinePreferences from "@/components/profile/CuisinePreferences";
import WeeklySchedule from "@/components/profile/WeeklySchedule";
import { ChevronLeft, ChevronRight } from "lucide-react";

const steps = [
  "Basic Info",
  "Dietary Preferences",
  "Health Goals",
  "Household Info",
  "Kitchen Equipment",
  "Cuisine Preferences",
  "Weekly Schedule",
];

const Profile = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    age: "",
    // Dietary Preferences
    dietaryPreferences: [] as string[],
    allergies: [] as string[],
    // Health Goals
    healthGoals: [] as string[],
    cookingLevel: "",
    aspirationalLevel: "",
    // Household Info
    householdSize: "",
    budget: "",
    // Kitchen Equipment
    equipment: [] as string[],
    // Cuisine Preferences
    cuisinePreferences: [] as string[],
    flavorProfiles: [] as string[],
  });

  // Schedule state
  const [schedule, setSchedule] = useState({});
  const [selectedWeek] = useState(new Date());

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      navigate("/schedule");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfo formData={formData} updateFormData={updateFormData} />;
      case 1:
        return <DietaryPreferences formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <HealthGoals formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <HouseholdInfo formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <KitchenEquipment formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <CuisinePreferences formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <WeeklySchedule 
          schedule={schedule} 
          setSchedule={setSchedule} 
          selectedWeek={selectedWeek}
        />;
      default:
        return null;
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 space-y-8 animate-fade-in">
      <ProgressBar steps={steps} currentStep={currentStep} className="mb-8" />
      
      <div className="bg-card rounded-lg p-6 shadow-sm">
        {renderStep()}
      </div>

      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        
        <Button
          onClick={handleNext}
          className="flex items-center gap-2"
        >
          {currentStep === steps.length - 1 ? "Save and Continue" : "Next"}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Profile;