import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/contexts/language-context";
import { 
  Plus, 
  MoreHorizontal, 
  Calendar, 
  CheckCircle,
  Circle
} from "lucide-react";

interface ListItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  isCompleted: boolean;
}

interface ShoppingListColumn {
  title: string;
  color: string;
  items: ListItem[];
  type: "active" | "planned" | "completed";
}

export function ShoppingListBoard() {
  const { t } = useLanguage();

  const columns: ShoppingListColumn[] = [
    {
      title: "Em Andamento",
      color: "warning",
      type: "active",
      items: [
        { id: "1", name: "Cerveja Skol 350ml", price: "3.50", quantity: 2, isCompleted: false },
        { id: "2", name: "Pão de Açúcar Integral", price: "4.50", quantity: 1, isCompleted: false },
        { id: "3", name: "Leite Integral 1L", price: "5.20", quantity: 1, isCompleted: true },
      ]
    },
    {
      title: "Planejadas",
      color: "secondary",
      type: "planned",
      items: [
        { id: "4", name: "Feira de Domingo", price: "45.00", quantity: 8, isCompleted: false },
        { id: "5", name: "Churrasco Sábado", price: "120.00", quantity: 15, isCompleted: false },
      ]
    },
    {
      title: "Concluídas",
      color: "success",
      type: "completed",
      items: [
        { id: "6", name: "Compras Janeiro", price: "234.50", quantity: 23, isCompleted: true },
        { id: "7", name: "Festa Aniversário", price: "167.30", quantity: 18, isCompleted: true },
      ]
    }
  ];

  const getStatusColor = (color: string) => {
    const colors = {
      warning: "bg-warning",
      secondary: "bg-secondary", 
      success: "bg-success",
    };
    return colors[color as keyof typeof colors] || "bg-muted";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold" data-testid="text-shopping-lists-title">
          {t("myShoppingLists")}
        </h3>
        <Button 
          className="totem-button bg-primary text-primary-foreground hover:bg-primary/90"
          data-testid="button-create-new-list"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nova Lista
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {columns.map((column) => (
          <Card key={column.type} className="bg-card border border-border" data-testid={`list-column-${column.type}`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="font-semibold flex items-center">
                  <div className={`w-3 h-3 ${getStatusColor(column.color)} rounded-full mr-2`}></div>
                  {column.title}
                </span>
                <Button size="sm" variant="ghost" data-testid={`button-column-menu-${column.type}`}>
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {column.items.map((item) => (
                <div 
                  key={item.id}
                  className="bg-muted rounded-lg p-4 cursor-pointer hover:bg-muted/80 transition-colors"
                  data-testid={`list-item-${item.id}`}
                >
                  {column.type === "active" ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Checkbox 
                          checked={item.isCompleted}
                          className="w-4 h-4"
                          data-testid={`checkbox-item-${item.id}`}
                        />
                        <div>
                          <p className={`font-medium text-sm ${item.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                            {item.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            R$ {parseFloat(item.price).toFixed(2)} cada
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.isCompleted 
                          ? 'bg-success/20 text-success' 
                          : 'bg-warning/20 text-warning'
                      }`}>
                        {item.isCompleted ? '✓' : `${item.quantity}x`}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.quantity} itens • R$ {parseFloat(item.price).toFixed(2)}
                        </p>
                      </div>
                      {column.type === "planned" ? (
                        <Calendar className="w-4 h-4 text-secondary" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-success" />
                      )}
                    </div>
                  )}
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full p-3 border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary"
                data-testid={`button-add-item-${column.type}`}
              >
                <Plus className="w-4 h-4 mr-2" />
                {column.type === "planned" ? "Planejar lista" : "Adicionar item"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
