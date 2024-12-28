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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ScheduleProps {
  schedule: any;
  setSchedule: (schedule: any) => void;
  selectedWeek: Date;
}

const MobileWeeklySchedule = ({ schedule, setSchedule, selectedWeek }: ScheduleProps) => {
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
    <div className="space-y-4">
      <Accordion type="single" collapsible className="space-y-2">
        {weekDays.map((day, index) => (
          <AccordionItem key={day} value={day} className="bg-white rounded-lg shadow-sm">
            <AccordionTrigger className="px-4 py-3">
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-medium">{day}</div>
                  <div className="text-sm text-gray-500">
                    {format(addDays(weekStart, index), 'MMM d')}
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-4">
                {meals.map((meal) => (
                  <div key={`${day}-${meal}`} className="space-y-2">
                    <div className="font-medium text-sm text-gray-600">{meal}</div>
                    <Select
                      value={schedule[day]?.[meal]?.status || "skip"}
                      onValueChange={(value) => handleStatusChange(day, meal, value)}
                    >
                      <SelectTrigger className="w-full">
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
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <Button onClick={handleSave} className="w-full bg-[#9b87f5] hover:bg-[#8b77e5]">
        Save Schedule
      </Button>

      <BasketModal open={showBasket} onOpenChange={setShowBasket} />
    </div>
  );
};

export default MobileWeeklySchedule;