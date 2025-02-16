
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Home,
  Settings,
  User,
  UtensilsCrossed,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="flex h-full">
        {/* Left Navigation */}
        <div className="w-64 bg-white shadow-lg p-6 space-y-4">
          <div className="flex items-center gap-2 text-purple-600 font-medium mb-8">
            <UtensilsCrossed className="w-5 h-5" />
            <span>MealPlanner</span>
          </div>
          
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate("/dashboard")}
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate("/schedule")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Weekly Schedule
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate("/recipes")}
          >
            <UtensilsCrossed className="mr-2 h-4 w-4" />
            Recipes
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Navigation */}
          <div className="h-16 bg-white shadow-sm px-6 flex justify-end items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/profile-edit")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Edit Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Dashboard Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate("/schedule")}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Plan This Week's Meals
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate("/recipes")}
                  >
                    <UtensilsCrossed className="mr-2 h-4 w-4" />
                    Browse Recipes
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate("/profile-edit")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Update Preferences
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Weekly Overview</h2>
                <p className="text-gray-600">
                  Start planning your meals for the week ahead.
                </p>
                <Button 
                  className="mt-4"
                  onClick={() => navigate("/schedule")}
                >
                  View Schedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
