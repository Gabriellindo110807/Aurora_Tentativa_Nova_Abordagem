import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/shopping/product-card";
import { Scanner } from "@/components/modals/scanner";
import { useLanguage } from "@/contexts/language-context";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { ArrowLeft, Search, QrCode } from "lucide-react";
import { Link } from "wouter";

export default function Products() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showScanner, setShowScanner] = useState(false);

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { search: searchQuery, category: selectedCategory === "all" ? undefined : selectedCategory }],
    enabled: true,
  });

  const categories = [
    { id: "all", name: "Todos", count: products.length },
    { id: "Bebidas", name: "Bebidas", count: products.filter(p => p.category === "Bebidas").length },
    { id: "Roupas", name: "Roupas", count: products.filter(p => p.category === "Roupas").length },
    { id: "Alimentação", name: "Alimentação", count: products.filter(p => p.category === "Alimentação").length },
    { id: "Casa", name: "Casa", count: 0 },
    { id: "Eletrônicos", name: "Eletrônicos", count: 0 },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleProductFound = (product: Product) => {
    console.log("Product found:", product);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-6">
              <Link href="/dashboard">
                <Button variant="ghost" className="flex items-center space-x-2" data-testid="button-back-dashboard">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </Button>
              </Link>
              <h1 className="text-2xl font-bold" data-testid="text-page-title">
                Catálogo de Produtos
              </h1>
            </div>
            
            <Button
              onClick={() => setShowScanner(true)}
              className="totem-button bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-scan-product"
            >
              <QrCode className="w-5 h-5 mr-2" />
              {t("scanProduct")}
            </Button>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="relative">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("searchProducts")}
                className="w-full pl-12 h-12 text-lg"
                data-testid="input-search-products"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="text-sm font-medium">Filtros:</span>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="text-sm"
                data-testid={`button-category-${category.id}`}
              >
                {category.name}
                {category.count > 0 && (
                  <span className="ml-2 text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                    {category.count}
                  </span>
                )}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {[...Array(10)].map((_, i) => (
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
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Nenhum produto encontrado</h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros ou buscar por outros termos.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Scanner
        isOpen={showScanner}
        onClose={() => setShowScanner(false)}
        onProductFound={handleProductFound}
      />
    </div>
  );
}
