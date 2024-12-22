import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ScheduleProps {
  schedule: any;
  setSchedule: (schedule: any) => void;
}

const WeeklySchedule = ({ schedule, setSchedule }: ScheduleProps) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const meals = ["Breakfast", "Lunch", "Dinner"];

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

  return (
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
          {days.map((day) => (
            <tr key={day} className="border-t">
              <td className="px-4 py-4 font-medium">{day}</td>
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
  );
};

export default WeeklySchedule;