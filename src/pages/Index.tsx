import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to MealMaster</h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          Your personal meal planning assistant. Let's start by setting up your profile!
        </p>
        <Button 
          onClick={() => navigate("/profile")}
          className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;