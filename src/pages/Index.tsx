import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { User, Calendar, BookOpen, ShoppingBasket } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: User,
      title: "Profile Setup",
      description: "Tell us about your dietary preferences and goals.",
    },
    {
      icon: Calendar,
      title: "Schedule Planning",
      description: "Plan your meals for the week effortlessly.",
    },
    {
      icon: BookOpen,
      title: "Recipe Viewing",
      description: "Access detailed recipes for each meal.",
    },
    {
      icon: ShoppingBasket,
      title: "Shopping Basket",
      description: "Generate a precise shopping list with exact ingredients.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 animate-fade-in">
            Plan Your Meals with Ease
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in">
            Customize your meal plans, view detailed recipes, and generate precise
            shopping lists tailored to your preferences.
          </p>
          <Button
            onClick={() => navigate("/profile")}
            className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all animate-scale-in"
          >
            Get Started
          </Button>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all animate-fade-in"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-purple-50 rounded-full">
                  <feature.icon className="w-8 h-8 text-[#9b87f5]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;