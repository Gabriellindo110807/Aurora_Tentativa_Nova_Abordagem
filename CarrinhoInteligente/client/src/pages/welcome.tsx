import { AuroraLogo } from "@/components/ui/aurora-logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/language-context";
import { LanguageSelector } from "@/components/modals/language-selector";
import { Link } from "wouter";
import { 
  ShieldCheck, 
  Globe, 
  Brain, 
  QrCode, 
  CreditCard, 
  History,
  ShoppingBag,
  PiggyBank,
  Star,
  List as ListIcon,
  KanbanSquare,
  Wifi,
  Battery,
  Sun
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Welcome() {
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffc107' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AuroraLogo />
            <div>
              <h1 className="text-2xl font-bold text-primary">Aurora</h1>
              <p className="text-xs text-muted-foreground">Sistema de Compras Inteligente</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowLanguageModal(true)}
              data-testid="button-language-selector"
            >
              {language.split("-")[0].toUpperCase()}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              <Sun className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-40 flex items-center justify-center min-h-[80vh] px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8 fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold">
                <span className="typing-animation inline-block">Bem-vindo ao</span>
                <br />
                <span className="aurora-gradient bg-clip-text text-transparent">
                  Futuro das Compras
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Sistema inteligente de compras com assistente virtual, múltiplos métodos de pagamento e experiência personalizada.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/login">
                <Button className="totem-button bg-primary text-primary-foreground hover:bg-primary/90" data-testid="button-login">
                  Fazer Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="totem-button bg-secondary text-secondary-foreground hover:bg-secondary/90" data-testid="button-register">
                  Criar Conta
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
              <span className="flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2 text-success" />
                Pagamento Seguro
              </span>
              <span className="flex items-center">
                <Globe className="w-4 h-4 mr-2 text-primary" />
                Multi-idiomas
              </span>
              <span className="flex items-center">
                <Brain className="w-4 h-4 mr-2 text-accent" />
                IA Assistente
              </span>
            </div>
          </div>

          {/* Mobile Device Preview */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="w-80 h-[600px] bg-card rounded-[3rem] p-6 shadow-2xl border border-border">
              <div className="w-full h-full bg-background rounded-[2rem] p-4 relative overflow-hidden">
                {/* Status bar */}
                <div className="flex justify-between items-center mb-4 text-xs text-muted-foreground">
                  <span>9:41</span>
                  <span className="flex items-center space-x-1">
                    <Wifi className="w-3 h-3" />
                    <Battery className="w-3 h-3" />
                  </span>
                </div>

                {/* App preview */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <AuroraLogo size="sm" />
                    <div>
                      <h3 className="font-semibold text-sm">Produtos em Destaque</h3>
                      <p className="text-xs text-muted-foreground">3 itens selecionados</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted rounded-lg p-3 space-y-2">
                      <div className="w-full h-16 bg-secondary/20 rounded-md"></div>
                      <p className="text-xs font-medium">Cerveja R$ 25,00</p>
                    </div>
                    <div className="bg-muted rounded-lg p-3 space-y-2">
                      <div className="w-full h-16 bg-primary/20 rounded-md"></div>
                      <p className="text-xs font-medium">Tênis R$ 199,90</p>
                    </div>
                  </div>

                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Total</span>
                      <span className="text-lg font-bold text-primary">R$ 224,90</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="relative z-40 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Recursos Inteligentes</h2>
            <p className="text-xl text-muted-foreground">
              Tecnologia avançada para uma experiência de compras única
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-hover" data-testid="feature-card-assistant">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Assistente Virtual</h3>
                <p className="text-muted-foreground">
                  IA que ajuda você a encontrar produtos, comparar preços e otimizar suas compras.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover" data-testid="feature-card-lists">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                  <KanbanSquare className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Listas Organizadas</h3>
                <p className="text-muted-foreground">
                  Organize suas compras em listas personalizadas, como no Trello, com categorias e prioridades.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover" data-testid="feature-card-scanner">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                  <QrCode className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Leitura Inteligente</h3>
                <p className="text-muted-foreground">
                  Escaneie códigos QR e códigos de barras para adicionar produtos instantaneamente.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover" data-testid="feature-card-payment">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mb-6">
                  <CreditCard className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Pagamento Flexível</h3>
                <p className="text-muted-foreground">
                  Múltiplas opções: cartão, PIX, carteiras digitais com segurança total.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover" data-testid="feature-card-history">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center mb-6">
                  <History className="w-6 h-6 text-warning" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Histórico Completo</h3>
                <p className="text-muted-foreground">
                  Acompanhe todas suas compras anteriores e analise seus hábitos de consumo.
                </p>
              </CardContent>
            </Card>

            <Card className="card-hover" data-testid="feature-card-multilang">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Multi-idiomas</h3>
                <p className="text-muted-foreground">
                  Interface disponível em português, inglês e espanhol para todos os usuários.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <AuroraLogo />
                <div>
                  <h3 className="text-lg font-bold text-primary">Aurora</h3>
                  <p className="text-xs text-muted-foreground">Carrinho Inteligente</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Sistema inteligente de compras desenvolvido para o futuro do varejo.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/products" className="hover:text-foreground">Catálogo</Link></li>
                <li><Link href="/lists" className="hover:text-foreground">Listas</Link></li>
                <li><Link href="/history" className="hover:text-foreground">Histórico</Link></li>
                <li><button className="hover:text-foreground">Assistente</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">Sobre</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">Contato</Link></li>
                <li><a href="#" className="hover:text-foreground">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-foreground">Política de Privacidade</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Conecte-se</h4>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm">
                  <Globe className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="sm">
                  <ListIcon className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="sm">
                  <Brain className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                © 2024 Aurora. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>

      <LanguageSelector 
        isOpen={showLanguageModal} 
        onClose={() => setShowLanguageModal(false)} 
      />
    </div>
  );
}
