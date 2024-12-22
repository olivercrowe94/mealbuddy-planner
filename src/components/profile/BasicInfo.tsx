import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BasicInfoProps {
  formData: {
    name: string;
    age: string;
  };
  updateFormData: (data: Partial<typeof formData>) => void;
}

const BasicInfo = ({ formData, updateFormData }: BasicInfoProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          placeholder="Enter your age"
          value={formData.age}
          onChange={(e) => updateFormData({ age: e.target.value })}
        />
      </div>
    </div>
  );
};

export default BasicInfo;