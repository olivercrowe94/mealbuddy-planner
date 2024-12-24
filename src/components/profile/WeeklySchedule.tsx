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
        },
      },
    }));
  };

  const handleSave = () => {
    toast({
      title: "Schedule Saved",
      description: "Generating your shopping basket...",
    });
    setShowBasket(true);
  };

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Day</th>
              {meals.map((meal) => (
                <th key={meal} className="px-4 py-2 text-left">
                  {meal}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weekDays.map((day, index) => (
              <tr key={day} className="border-t">
                <td className="px-4 py-4">
                  <div>
                    <div className="font-medium">{day}</div>
                    <div className="text-sm text-gray-500">
                      {format(addDays(weekStart, index), 'MMM d')}
                    </div>
                  </div>
                </td>
                {meals.map((meal) => (
                  <td key={`${day}-${meal}`} className="px-4 py-4">
                    <div className="space-y-2">
                      <Select
                        value={schedule[day]?.[meal]?.status || "skip"}
                        onValueChange={(value) => handleStatusChange(day, meal, value)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cook">Cook at home</SelectItem>
                          <SelectItem value="skip">Skip</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {schedule[day]?.[meal]?.status === "cook" && (
                        <div className="flex items-center space-x-2">
                          <Input
                            type="number"
                            placeholder="Minutes"
                            className="w-20"
                            value={schedule[day]?.[meal]?.time || ""}
                            onChange={(e) => handleTimeChange(day, meal, e.target.value)}
                          />
                          <span className="text-sm text-gray-500">min</span>
                        </div>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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