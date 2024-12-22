import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Microwave, Flame, Fan, Blend, Thermometer } from "lucide-react";

interface FormData {
  equipment: string[];
}

interface KitchenEquipmentProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const KitchenEquipment = ({ formData, updateFormData }: KitchenEquipmentProps) => {
  const equipment = [
    { id: "oven", label: "Oven", icon: Flame },
    { id: "microwave", label: "Microwave", icon: Microwave },
    { id: "air-fryer", label: "Air Fryer", icon: Fan },
    { id: "blender", label: "Blender", icon: Blend },
    { id: "sous-vide", label: "Sous Vide", icon: Thermometer },
  ];

  const handleEquipmentToggle = (equipmentId: string) => {
    const newEquipment = formData.equipment.includes(equipmentId)
      ? formData.equipment.filter((e) => e !== equipmentId)
      : [...formData.equipment, equipmentId];
    updateFormData({ equipment: newEquipment });
  };

  return (
    <div className="space-y-4">
      <Label>Kitchen Equipment</Label>
      <ScrollArea className="h-[200px] w-full rounded-md border p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {equipment.map((item) => {
            const isSelected = formData.equipment.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => handleEquipmentToggle(item.id)}
                className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors ${
                  isSelected ? "bg-purple-50" : "hover:bg-gray-50"
                }`}
              >
                <item.icon className={`h-5 w-5 ${
                  isSelected ? "text-purple-500" : "text-gray-500"
                }`} />
                <span className={isSelected ? "text-purple-700" : "text-gray-700"}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <div className="flex flex-wrap gap-2 mt-2">
        {formData.equipment.map((item) => (
          <Badge
            key={item}
            variant="secondary"
            className="cursor-pointer"
            onClick={() => handleEquipmentToggle(item)}
          >
            {equipment.find(e => e.id === item)?.label} ×
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default KitchenEquipment;