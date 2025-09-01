import { Link, useLocation } from "wouter";
import { AuroraLogo } from "@/components/ui/aurora-logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
import { useCart } from "@/contexts/cart-context";
import { Language } from "@/lib/translations";
import { 
  Home, 
  Package, 
  List, 
  Clock, 
  ShoppingCart, 
  User, 
  ChevronDown,
  Sun,
  Moon
} from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { itemCount, total } = useCart();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  if (!user) return null;

  return (
    <nav className="bg-card border-b border-border px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/dashboard" className="flex items-center space-x-3">
            <AuroraLogo />
            <div>
              <h1 className="text-xl font-bold text-primary">Aurora</h1>
              <p className="text-xs text-muted-foreground">Carrinho Inteligente</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/dashboard">
              <Button 
                variant={location === "/dashboard" ? "default" : "ghost"}
                className="flex items-center space-x-2"
                data-testid="nav-dashboard"
              >
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </Button>
            </Link>
            
            <Link href="/products">
              <Button 
                variant={location === "/products" ? "default" : "ghost"}
                className="flex items-center space-x-2"
                data-testid="nav-products"
              >
                <Package className="w-4 h-4" />
                <span>{t("products")}</span>
              </Button>
            </Link>
            
            <Link href="/lists">
              <Button 
                variant={location === "/lists" ? "default" : "ghost"}
                className="flex items-center space-x-2"
                data-testid="nav-lists"
              >
                <List className="w-4 h-4" />
                <span>{t("lists")}</span>
              </Button>
            </Link>
            
            <Link href="/history">
              <Button 
                variant={location === "/history" ? "default" : "ghost"}
                className="flex items-center space-x-2"
                data-testid="nav-history"
              >
                <Clock className="w-4 h-4" />
                <span>{t("history")}</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            data-testid="button-theme-toggle"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const languages: Language[] = ["pt-BR", "en-US", "es-ES"];
              const currentIndex = languages.indexOf(language);
              const nextIndex = (currentIndex + 1) % languages.length;
              setLanguage(languages[nextIndex]);
            }}
            data-testid="button-language-toggle"
          >
            {language.split("-")[0].toUpperCase()}
          </Button>

          {/* Cart Summary */}
          <Link href="/checkout">
            <Button 
              variant="outline" 
              className="flex items-center space-x-3 bg-muted"
              data-testid="button-cart-summary"
            >
              <ShoppingCart className="w-5 h-5 text-primary" />
              <div className="text-sm">
                <span className="font-medium">{itemCount}</span>
                <span className="text-muted-foreground"> itens</span>
              </div>
              <div className="text-sm font-bold text-primary">
                R$ {total.toFixed(2)}
              </div>
            </Button>
          </Link>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 bg-muted"
              data-testid="button-user-menu"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-medium text-sm">
                  {user.firstName[0]}{user.lastName[0]}
                </span>
              </div>
              <span className="hidden sm:block text-sm font-medium">
                {user.firstName} {user.lastName}
              </span>
              <ChevronDown className="w-4 h-4" />
            </Button>

            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                <div className="p-2">
                  <Link href="/profile">
                    <Button variant="ghost" className="w-full justify-start" data-testid="button-profile">
                      <User className="w-4 h-4 mr-2" />
                      Perfil
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={logout}
                    data-testid="button-logout"
                  >
                    Sair
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
