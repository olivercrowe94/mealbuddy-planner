
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FormData {
  name: string;
  age: string;
  cookingLevel: string;
  aspirationalLevel: string;
}

interface BasicInfoProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const BasicInfo = ({ formData, updateFormData }: BasicInfoProps) => {
  const cookingLevels = [
    {
      value: "newcomer",
      label: "Complete Newcomer",
      description: "I've barely boiled water; I need the easiest recipes",
    },
    {
      value: "basic",
      label: "Basic Cook",
      description: "I can follow simple recipes and do basic prep",
    },
    {
      value: "comfortable",
      label: "Comfortable Cook",
      description: "I can handle most standard recipes without stress",
    },
    {
      value: "enthusiast",
      label: "Enthusiastic Hobbyist",
      description: "I enjoy cooking new dishes and experimenting",
    },
    {
      value: "seasoned",
      label: "Seasoned Home Chef",
      description: "I'm experienced with advanced techniques",
    },
    {
      value: "aspiring-pro",
      label: "Aspiring Pro",
      description: "I love challenging recipes and want to refine my skills",
    },
  ];

  const aspirationalLevels = [
    {
      value: "stay-same",
      label: "Stay at the Same Level",
      description: "I'm comfortable where I am",
    },
    {
      value: "gain-confidence",
      label: "Gain Confidence",
      description: "I'd like to move from basic to comfortable cooking",
    },
    {
      value: "explore",
      label: "Explore & Experiment",
      description: "I want to try new dishes and techniques",
    },
    {
      value: "master",
      label: "Master Advanced Techniques",
      description: "I'd love to tackle gourmet-level cooking",
    },
    {
      value: "professional",
      label: "Professional Aspirations",
      description: "I'm thinking about culinary school or professional-level skills",
    },
  ];

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

      <div className="space-y-4">
        <Label>Current Cooking Experience</Label>
        <Select
          value={formData.cookingLevel}
          onValueChange={(value) => updateFormData({ cookingLevel: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your cooking level" />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-[300px]">
              {cookingLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  <div className="flex flex-col py-2">
                    <span className="font-medium">{level.label}</span>
                    <span className="text-sm text-gray-500">{level.description}</span>
                  </div>
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label>Aspirational Cooking Level</Label>
        <p className="text-sm text-gray-500">Where do you see yourself in a few months or a year?</p>
        <Select
          value={formData.aspirationalLevel}
          onValueChange={(value) => updateFormData({ aspirationalLevel: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your goal cooking level" />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-[300px]">
              {aspirationalLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  <div className="flex flex-col py-2">
                    <span className="font-medium">{level.label}</span>
                    <span className="text-sm text-gray-500">{level.description}</span>
                  </div>
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BasicInfo;
