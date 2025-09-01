import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/cart-context";
import { useLanguage } from "@/contexts/language-context";
import { Link } from "wouter";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";

interface CartSummaryProps {
  showActions?: boolean;
}

export function CartSummary({ showActions = true }: CartSummaryProps) {
  const { items, total, updateQuantity, removeItem } = useCart();
  const { t } = useLanguage();

  const subtotal = total;
  const discount = total * 0.05; // 5% discount
  const deliveryFee = 12.50;
  const finalTotal = subtotal - discount + deliveryFee;

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Seu carrinho está vazio</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Resumo do Pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4" data-testid={`cart-item-${item.id}`}>
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm" data-testid={`text-item-name-${item.id}`}>
                {item.product.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.quantity}x × R$ {parseFloat(item.product.price).toFixed(2)}
              </p>
              {showActions && (
                <div className="flex items-center space-x-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    data-testid={`button-decrease-${item.id}`}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="text-sm font-medium w-8 text-center">
                    {item.quantity}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    data-testid={`button-increase-${item.id}`}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeItem(item.id)}
                    data-testid={`button-remove-${item.id}`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <p className="font-bold text-primary" data-testid={`text-item-total-${item.id}`}>
              R$ {(parseFloat(item.product.price) * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}

        <Separator className="my-6" />

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span data-testid="text-subtotal">R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Desconto</span>
            <span className="text-success" data-testid="text-discount">-R$ {discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Taxa de entrega</span>
            <span data-testid="text-delivery-fee">R$ {deliveryFee.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>{t("total")}</span>
            <span className="text-primary" data-testid="text-final-total">
              R$ {finalTotal.toFixed(2)}
            </span>
          </div>
        </div>

        {showActions && (
          <Link href="/checkout">
            <Button className="w-full totem-button bg-primary text-primary-foreground hover:bg-primary/90 mt-6" data-testid="button-proceed-checkout">
              Finalizar Compra
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
