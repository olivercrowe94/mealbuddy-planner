import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import WeeklySchedule from "@/components/profile/WeeklySchedule";
import { useToast } from "@/components/ui/use-toast";
import { Check, Copy, Home, User, Calendar, UtensilsCrossed } from "lucide-react";

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

  const handleCopyLastWeek = () => {
    toast({
      title: "Schedule Copied",
      description: "Last week's schedule has been copied successfully!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="flex h-full">
        {/* Left Navigation */}
        <div className="w-64 bg-white shadow-lg p-6 space-y-4">
          <div className="flex items-center gap-2 text-purple-600 font-medium mb-8">
            <Calendar className="w-5 h-5" />
            <span>Weekly Planning</span>
          </div>
          
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate("/")}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate("/profile")}
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start bg-purple-50"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Weekly Schedule
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate("/recipes")}
          >
            <UtensilsCrossed className="mr-2 h-4 w-4" />
            Recipes
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Weekly Meal Schedule</h2>
                <p className="text-gray-600">Plan your meals for the week ahead</p>
              </div>
              <Button
                variant="outline"
                onClick={handleCopyLastWeek}
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy Last Week
              </Button>
            </div>

            <WeeklySchedule schedule={schedule} setSchedule={setSchedule} />

            <div className="flex justify-end mt-8">
              <Button
                onClick={handleSave}
                className="bg-[#9b87f5] hover:bg-[#8b77e5] px-6"
              >
                Save Schedule
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;