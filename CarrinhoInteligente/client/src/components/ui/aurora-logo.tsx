import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuroraLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function AuroraLogo({ size = "md", className }: AuroraLogoProps) {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  return (
    <div className={cn(
      "aurora-logo rounded-full flex items-center justify-center",
      sizes[size],
      className
    )}>
      <ShoppingCart className={iconSizes[size]} />
    </div>
  );
}
