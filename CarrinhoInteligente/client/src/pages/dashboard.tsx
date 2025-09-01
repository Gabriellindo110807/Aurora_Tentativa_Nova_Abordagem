import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/layout/sidebar";
import { ShoppingListBoard } from "@/components/shopping/shopping-list-board";
import { ProductCard } from "@/components/shopping/product-card";
import { VirtualAssistant } from "@/components/modals/virtual-assistant";
import { Scanner } from "@/components/modals/scanner";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { 
  ShoppingBag, 
  PiggyBank, 
  Star, 
  List,
  ArrowRight
} from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [showAssistant, setShowAssistant] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const { data: featuredProducts = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    select: (products) => products.slice(0, 4), // Show only first 4 products
  });

  const handleProductFound = (product: Product) => {
    // Handle scanned product - could add to cart or show details
    console.log("Product found:", product);
  };

  const stats = {
    totalPurchases: 47,
    totalSaved: 342.80,
    favoriteProducts: 23,
    activeLists: 5,
  };

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        onScanProduct={() => setShowScanner(true)}
        onCreateList={() => console.log("Create list")}
        onOpenAssistant={() => setShowAssistant(true)}
      />

      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Welcome Section */}
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2" data-testid="text-welcome-message">
                    {t("hello")}, {user.firstName}! 👋
                  </h2>
                  <p className="text-muted-foreground">{t("readyToShop")}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">{t("monthlyLy")}</p>
                  <p className="text-2xl font-bold text-success" data-testid="text-monthly-savings">
                    R$ 127,50
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shopping Lists Board */}
          <ShoppingListBoard />

          {/* Featured Products */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold" data-testid="text-featured-products-title">
                Produtos em Destaque
              </h3>
              <Link href="/products">
                <Button variant="ghost" className="text-primary hover:text-primary/80" data-testid="button-view-all-products">
                  Ver todos <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {isLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="animate-pulse" data-testid={`product-skeleton-${i}`}>
                    <CardContent className="p-4">
                      <div className="aspect-square bg-muted rounded-lg mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                        <div className="h-6 bg-muted rounded w-1/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card data-testid="stat-card-purchases">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl font-bold mb-1" data-testid="text-total-purchases">
                  {stats.totalPurchases}
                </p>
                <p className="text-sm text-muted-foreground">Compras Realizadas</p>
              </CardContent>
            </Card>

            <Card data-testid="stat-card-savings">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <PiggyBank className="w-6 h-6 text-success" />
                </div>
                <p className="text-2xl font-bold mb-1" data-testid="text-total-saved">
                  R$ {stats.totalSaved.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">Economia Total</p>
              </CardContent>
            </Card>

            <Card data-testid="stat-card-favorites">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-accent" />
                </div>
                <p className="text-2xl font-bold mb-1" data-testid="text-favorite-products">
                  {stats.favoriteProducts}
                </p>
                <p className="text-sm text-muted-foreground">Produtos Favoritos</p>
              </CardContent>
            </Card>

            <Card data-testid="stat-card-lists">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <List className="w-6 h-6 text-secondary" />
                </div>
                <p className="text-2xl font-bold mb-1" data-testid="text-active-lists">
                  {stats.activeLists}
                </p>
                <p className="text-sm text-muted-foreground">Listas Ativas</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <VirtualAssistant 
        isOpen={showAssistant} 
        onClose={() => setShowAssistant(false)} 
      />

      <Scanner
        isOpen={showScanner}
        onClose={() => setShowScanner(false)}
        onProductFound={handleProductFound}
      />
    </div>
  );
}
