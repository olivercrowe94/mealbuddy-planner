
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import BasketModal from "./BasketModal";
import { format, addDays, startOfWeek } from "date-fns";
import { Card } from "@/components/ui/card";
import {
  UtensilsCrossed,
  Calendar,
  Clock,
  Copy,
  ChevronRight,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ScheduleProps {
  schedule: any;
  setSchedule: (schedule: any) => void;
  selectedWeek: Date;
}

const WeeklySchedule = ({ schedule, setSchedule, selectedWeek }: ScheduleProps) => {
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const meals = ["Breakfast", "Lunch", "Dinner"];
  const { toast } = useToast();
  const [showBasket, setShowBasket] = useState(false);
  const [selectedDay, setSelectedDay] = useState(weekDays[0]);

  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 1 });

  const handleTimeChange = (day: string, meal: string, time: string) => {
    setSchedule((prev: any) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: {
          ...prev[day]?.[meal],
          time,
        },
      },
    }));
  };

  const handleStatusChange = (day: string, meal: string, status: string) => {
    setSchedule((prev: any) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [meal]: {
          ...prev[day]?.[meal],
          status,
          batchCookedFrom: status === "batch" ? selectedDay : undefined,
        },
      },
    }));
  };

  const handleBatchCook = (fromDay: string, meal: string, toDays: string[]) => {
    const updates = toDays.reduce((acc: any, day) => {
      acc[day] = {
        ...(acc[day] || {}),
        [meal]: {
          ...(schedule[fromDay]?.[meal] || {}),
          status: "batch",
          batchCookedFrom: fromDay,
        },
      };
      return acc;
    }, {});

    setSchedule((prev: any) => ({
      ...prev,
      ...updates,
    }));

    toast({
      title: "Batch Cooking Added",
      description: `Meal will be batch cooked on ${fromDay}`,
    });
  };

  const handleSave = () => {
    toast({
      title: "Schedule Saved",
      description: "Generating your shopping basket...",
    });
    setShowBasket(true);
  };

  const getDaySchedule = (day: string) => {
    return meals.map((meal) => {
      const mealData = schedule[day]?.[meal];
      const isBatchCooked = mealData?.status === "batch";
      const batchCookedFrom = mealData?.batchCookedFrom;

      return (
        <div key={`${day}-${meal}`} className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">{meal}</span>
            {isBatchCooked && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center text-xs text-purple-600">
                      <Copy className="w-3 h-3 mr-1" />
                      Batch cooked on {batchCookedFrom}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    This meal is batch cooked from {batchCookedFrom}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          
          <div className="space-y-3">
            <Select
              value={mealData?.status || "skip"}
              onValueChange={(value) => handleStatusChange(day, meal, value)}
            >
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cook">Cook Fresh</SelectItem>
                <SelectItem value="batch">Batch Cook</SelectItem>
                <SelectItem value="skip">Skip</SelectItem>
              </SelectContent>
            </Select>

            {(mealData?.status === "cook" || mealData?.status === "batch") && (
              <div className="flex items-center space-x-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <Input
                      type="number"
                      placeholder="Minutes"
                      className="w-20"
                      value={mealData?.time || ""}
                      onChange={(e) => handleTimeChange(day, meal, e.target.value)}
                    />
                    <span className="text-sm text-gray-500">min</span>
                  </div>
                </div>

                {mealData?.status === "batch" && day === selectedDay && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBatchCook(
                      day,
                      meal,
                      weekDays.slice(weekDays.indexOf(day) + 1)
                    )}
                  >
                    Apply to following days
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {weekDays.map((day, index) => (
          <Card
            key={day}
            className={`p-4 cursor-pointer min-w-[200px] transition-all ${
              selectedDay === day
                ? "border-purple-400 bg-purple-50"
                : "hover:border-purple-200"
            }`}
            onClick={() => setSelectedDay(day)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{day}</span>
              <span className="text-sm text-gray-500">
                {format(addDays(weekStart, index), 'MMM d')}
              </span>
            </div>
            <div className="space-y-1">
              {meals.map((meal) => {
                const status = schedule[day]?.[meal]?.status;
                return (
                  <div
                    key={meal}
                    className="text-xs flex items-center space-x-1 text-gray-500"
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        status === "cook"
                          ? "bg-green-400"
                          : status === "batch"
                          ? "bg-purple-400"
                          : "bg-gray-300"
                      }`}
                    />
                    <span>{meal}</span>
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">{selectedDay}'s Schedule</h3>
            <p className="text-sm text-gray-500">
              Plan your meals and batch cooking
            </p>
          </div>
          <UtensilsCrossed className="w-5 h-5 text-gray-400" />
        </div>
        {getDaySchedule(selectedDay)}
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-[#9b87f5] hover:bg-[#8b77e5] px-6">
          Save Schedule
        </Button>
      </div>

      <BasketModal open={showBasket} onOpenChange={setShowBasket} />
    </div>
  );
};

export default WeeklySchedule;
