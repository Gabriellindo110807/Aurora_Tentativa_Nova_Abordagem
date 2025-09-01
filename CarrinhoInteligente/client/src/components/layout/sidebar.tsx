import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
import { QrCode, Plus, Brain } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  onScanProduct: () => void;
  onCreateList: () => void;
  onOpenAssistant: () => void;
}

export function Sidebar({ onScanProduct, onCreateList, onOpenAssistant }: SidebarProps) {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <aside className="hidden lg:block w-80 bg-card border-r border-border p-6 min-h-screen">
      <div className="space-y-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={onScanProduct}
              className="w-full totem-button bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-scan-product"
            >
              <QrCode className="w-5 h-5 mr-2" />
              {t("scanProduct")}
            </Button>
            <Button
              onClick={onCreateList}
              className="w-full totem-button bg-secondary text-secondary-foreground hover:bg-secondary/90"
              data-testid="button-create-list"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nova Lista
            </Button>
          </CardContent>
        </Card>

        {/* Recent Lists */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Listas Recentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-muted rounded-lg p-4 cursor-pointer hover:bg-muted/80 transition-colors" data-testid="list-item-weekly">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm">Compras da Semana</h4>
                  <p className="text-xs text-muted-foreground">12 itens</p>
                </div>
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              </div>
            </div>
            
            <div className="bg-muted rounded-lg p-4 cursor-pointer hover:bg-muted/80 transition-colors" data-testid="list-item-sunday">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm">Feira de Domingo</h4>
                  <p className="text-xs text-muted-foreground">8 itens</p>
                </div>
                <div className="w-3 h-3 bg-accent rounded-full"></div>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-4 cursor-pointer hover:bg-muted/80 transition-colors" data-testid="list-item-cleaning">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-sm">Produtos de Limpeza</h4>
                  <p className="text-xs text-muted-foreground">5 itens</p>
                </div>
                <div className="w-3 h-3 bg-success rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Virtual Assistant */}
        <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Brain className="w-4 h-4 text-primary-foreground" />
              </div>
              <h4 className="font-semibold">Assistente Aurora</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Posso ajudá-lo a encontrar produtos, comparar preços ou organizar suas listas!
            </p>
            <Button
              onClick={onOpenAssistant}
              className="w-full bg-primary/20 text-primary hover:bg-primary/30"
              data-testid="button-open-assistant"
            >
              Conversar Agora
            </Button>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
