import { Product } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";
import { 
  ShoppingCart, 
  Heart, 
  Star,
  Wine,
  Shirt,
  Apple,
  Package
} from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

const iconMap = {
  wine: Wine,
  shirt: Shirt,
  apple: Apple,
  beef: Package,
  package: Package,
};

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const IconComponent = iconMap[product.iconType as keyof typeof iconMap] || Package;
  const hasDiscount = product.originalPrice && parseFloat(product.originalPrice) > parseFloat(product.price);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
    });
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className="card-hover cursor-pointer" data-testid={`product-card-${product.id}`}>
      <CardContent className="p-4">
        <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center relative">
          <div className="w-20 h-20 bg-primary/20 rounded-lg flex items-center justify-center">
            <IconComponent className="w-10 h-10 text-primary" />
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleFavorite}
            className="absolute top-2 right-2 p-1 bg-background/80 rounded-full hover:bg-background"
            data-testid={`button-favorite-${product.id}`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'text-destructive fill-current' : 'text-muted-foreground'}`} />
          </Button>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-semibold text-sm" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h4>
          <p className="text-xs text-muted-foreground" data-testid={`text-product-brand-${product.id}`}>
            {product.brand}
          </p>
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-primary" data-testid={`text-product-price-${product.id}`}>
                R$ {parseFloat(product.price).toFixed(2)}
              </span>
              {hasDiscount && (
                <p className="text-xs text-muted-foreground line-through">
                  R$ {parseFloat(product.originalPrice!).toFixed(2)}
                </p>
              )}
            </div>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="p-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105"
              data-testid={`button-add-to-cart-${product.id}`}
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-3 h-3 ${
                    star <= Math.floor(parseFloat(product.rating || "0"))
                      ? "text-warning fill-current"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.rating})
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
