import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import WeeklySchedule from "@/components/profile/WeeklySchedule";
import { useToast } from "@/components/ui/use-toast";

const Schedule = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [schedule, setSchedule] = useState({});

  const handleSave = () => {
    toast({
      title: "Schedule Saved",
      description: "Your meal schedule has been saved successfully!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Weekly Meal Schedule</h2>
          <p className="text-gray-600">Plan your meals for the week ahead</p>
        </div>

        <WeeklySchedule schedule={schedule} setSchedule={setSchedule} />

        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => navigate("/profile")}
            className="px-6"
          >
            Back to Profile
          </Button>
          <Button
            onClick={handleSave}
            className="bg-[#9b87f5] hover:bg-[#8b77e5] px-6"
          >
            Save Schedule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Schedule;