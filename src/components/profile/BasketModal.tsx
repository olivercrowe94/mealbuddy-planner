import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, ShoppingBasket } from "lucide-react";
import { useState, useEffect } from "react";

interface BasketItem {
  name: string;
  quantity: string;
  category: string;
}

interface BasketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BasketModal = ({ open, onOpenChange }: BasketModalProps) => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<BasketItem[]>([]);

  useEffect(() => {
    if (open) {
      // Simulate API call
      setTimeout(() => {
        setItems([
          { name: "Chicken Breast", quantity: "2 lbs", category: "Meat" },
          { name: "Eggs", quantity: "12", category: "Dairy" },
          { name: "Milk", quantity: "1 gallon", category: "Dairy" },
          { name: "Spinach", quantity: "2 bunches", category: "Produce" },
          { name: "Tomatoes", quantity: "4", category: "Produce" },
          { name: "Onions", quantity: "3", category: "Produce" },
          { name: "Greek Yogurt", quantity: "32 oz", category: "Dairy" },
        ]);
        setLoading(false);
      }, 2000);
    } else {
      setLoading(true);
    }
  }, [open]);

  const categories = Array.from(new Set(items.map(item => item.category)));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBasket className="h-5 w-5" />
            Your Shopping Basket
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            <p className="mt-2 text-sm text-muted-foreground">
              Generating your shopping list...
            </p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-6">
              {categories.map((category) => (
                <div key={category}>
                  <h3 className="font-semibold text-lg mb-2">{category}</h3>
                  <div className="space-y-2">
                    {items
                      .filter((item) => item.category === category)
                      .map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-2 rounded-lg bg-accent/50"
                        >
                          <span>{item.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {item.quantity}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BasketModal;