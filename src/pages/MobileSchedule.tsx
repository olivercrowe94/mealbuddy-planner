import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, startOfWeek, addWeeks, subWeeks } from "date-fns";
import { Home, User, Calendar, UtensilsCrossed, ChevronLeft, ChevronRight } from "lucide-react";
import MobileWeeklySchedule from "@/components/profile/MobileWeeklySchedule";
import { useToast } from "@/hooks/use-toast";

const MobileSchedule = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [schedule, setSchedule] = useState({});
  const [selectedWeek, setSelectedWeek] = useState(new Date());

  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 1 });
  const weekEnd = addWeeks(weekStart, 1);
  const weekLabel = `${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d')}`;

  const nextWeek = () => setSelectedWeek(addWeeks(selectedWeek, 1));
  const previousWeek = () => setSelectedWeek(subWeeks(selectedWeek, 1));

  const handleCopyLastWeek = () => {
    toast({
      title: "Schedule Copied",
      description: "Last week's schedule has been copied successfully!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Fixed Top Navigation */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2 text-purple-600 font-medium">
            <Calendar className="w-5 h-5" />
            <span>Weekly Planning</span>
          </div>
        </div>
      </div>

      {/* Main Content with Padding for Fixed Header */}
      <div className="pt-16 pb-20 px-4">
        <Tabs defaultValue="current" className="space-y-4">
          <TabsList className="w-full">
            <TabsTrigger value="current" className="flex-1">Current Week</TabsTrigger>
            <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
                <Button variant="ghost" size="sm" onClick={previousWeek}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="font-medium">{weekLabel}</span>
                <Button variant="ghost" size="sm" onClick={nextWeek}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={handleCopyLastWeek}
                className="w-full"
              >
                Copy Last Week's Schedule
              </Button>

              <MobileWeeklySchedule 
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

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="flex justify-around p-2">
          <Button variant="ghost" onClick={() => navigate("/")} className="flex-1">
            <Home className="w-5 h-5" />
          </Button>
          <Button variant="ghost" onClick={() => navigate("/profile")} className="flex-1">
            <User className="w-5 h-5" />
          </Button>
          <Button variant="ghost" className="flex-1 text-purple-600">
            <Calendar className="w-5 h-5" />
          </Button>
          <Button variant="ghost" onClick={() => navigate("/recipes")} className="flex-1">
            <UtensilsCrossed className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileSchedule;