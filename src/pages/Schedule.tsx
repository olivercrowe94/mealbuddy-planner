import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WeeklySchedule from "@/components/profile/WeeklySchedule";
import { useToast } from "@/components/ui/use-toast";
import { Check, Copy, Home, User, Calendar, UtensilsCrossed, ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfWeek, addWeeks, subWeeks } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileSchedule from "./MobileSchedule";

const Schedule = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [schedule, setSchedule] = useState({});
  const [selectedWeek, setSelectedWeek] = useState(new Date());

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

  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 1 });
  const weekEnd = addWeeks(weekStart, 1);
  const weekLabel = `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`;

  const nextWeek = () => setSelectedWeek(addWeeks(selectedWeek, 1));
  const previousWeek = () => setSelectedWeek(subWeeks(selectedWeek, 1));

  if (isMobile) {
    return <MobileSchedule />;
  }

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
            <Tabs defaultValue="current" className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Weekly Meal Schedule</h2>
                  <p className="text-gray-600">Plan your meals for the week ahead</p>
                </div>
                <TabsList>
                  <TabsTrigger value="current">Current Week</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="current">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <div className="flex justify-between items-center mb-6">
                    <Button variant="outline" onClick={previousWeek}>
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous Week
                    </Button>
                    <div className="text-lg font-medium">{weekLabel}</div>
                    <Button variant="outline" onClick={nextWeek}>
                      Next Week
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>

                  <div className="flex justify-end mb-6">
                    <Button
                      variant="outline"
                      onClick={handleCopyLastWeek}
                      className="flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy Last Week
                    </Button>
                  </div>

                  <WeeklySchedule 
                    schedule={schedule} 
                    setSchedule={setSchedule}
                    selectedWeek={selectedWeek}
                  />
                </div>
              </TabsContent>

              <TabsContent value="history">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">Previous Weeks</h3>
                    <p className="text-gray-600">
                      View your meal planning history and past schedules
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
