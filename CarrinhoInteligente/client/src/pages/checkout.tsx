import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { CartSummary } from "@/components/shopping/cart-summary";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Link, useLocation } from "wouter";
import { 
  ArrowLeft, 
  CreditCard, 
  QrCode, 
  Smartphone, 
  Lock,
  ShieldCheck,
  Gift
} from "lucide-react";

const paymentSchema = z.object({
  paymentMethod: z.string().min(1, "Selecione um método de pagamento"),
  cardNumber: z.string().optional(),
  cardName: z.string().optional(),
  expiry: z.string().optional(),
  cvv: z.string().optional(),
  zipCode: z.string().min(8, "CEP é obrigatório"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
});

type PaymentData = z.infer<typeof paymentSchema>;

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit");
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<PaymentData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "credit",
      zipCode: "",
      street: "",
      number: "",
      city: "",
      state: "",
    },
  });

  const paymentMethods = [
    { id: "credit", name: "Cartão de Crédito", description: "Visa, Mastercard, Elo", icon: CreditCard },
    { id: "pix", name: "PIX", description: "Pagamento instantâneo", icon: QrCode },
    { id: "debit", name: "Cartão de Débito", description: "Débito em conta", icon: CreditCard },
    { id: "wallet", name: "Carteira Digital", description: "PayPal, Apple Pay, Google Pay", icon: Smartphone },
  ];

  const subtotal = total;
  const discount = total * 0.05; // 5% discount
  const deliveryFee = 12.50;
  const finalTotal = subtotal - discount + deliveryFee;

  const onSubmit = async (data: PaymentData) => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create order
      const orderData = {
        userId: user?.id,
        total: finalTotal.toString(),
        paymentMethod: data.paymentMethod,
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        clearCart();
        toast({
          title: "Pagamento processado com sucesso!",
          description: "Seu pedido foi confirmado e será processado em breve.",
        });
        setLocation("/dashboard");
      } else {
        throw new Error("Erro ao processar pagamento");
      }
    } catch (error) {
      toast({
        title: "Erro no pagamento",
        description: "Não foi possível processar seu pagamento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Carrinho vazio</h3>
            <p className="text-muted-foreground mb-4">
              Adicione produtos ao carrinho para continuar com o checkout.
            </p>
            <Link href="/products">
              <Button className="w-full" data-testid="button-go-shopping">
                Ir às compras
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="flex items-center space-x-2" data-testid="button-back-dashboard">
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Finalizar Compra</h1>
          </div>

          {/* Progress Steps */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">1</div>
              <span className="text-sm font-medium">Carrinho</span>
            </div>
            <div className="w-8 h-px bg-primary"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">2</div>
              <span className="text-sm font-medium text-primary">Pagamento</span>
            </div>
            <div className="w-8 h-px bg-border"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">3</div>
              <span className="text-sm text-muted-foreground">Confirmação</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Payment Methods */}
                <Card>
                  <CardHeader>
                    <CardTitle>Método de Pagamento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {paymentMethods.map((method) => {
                        const IconComponent = method.icon;
                        return (
                          <Button
                            key={method.id}
                            type="button"
                            variant={selectedPaymentMethod === method.id ? "default" : "outline"}
                            onClick={() => setSelectedPaymentMethod(method.id)}
                            className="p-4 h-auto justify-start"
                            data-testid={`button-payment-${method.id}`}
                          >
                            <div className="flex items-center space-x-3">
                              <IconComponent className="w-6 h-6" />
                              <div className="text-left">
                                <p className="font-medium">{method.name}</p>
                                <p className="text-xs text-muted-foreground">{method.description}</p>
                              </div>
                            </div>
                          </Button>
                        );
                      })}
                    </div>

                    {/* Credit Card Form */}
                    {selectedPaymentMethod === "credit" && (
                      <div className="space-y-4 pt-4 border-t border-border">
                        <FormField
                          control={form.control}
                          name="cardNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número do Cartão</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="1234 5678 9012 3456" 
                                  data-testid="input-card-number"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="expiry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Validade</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="MM/AA" 
                                    data-testid="input-card-expiry"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="cvv"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CVV</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="123" 
                                    data-testid="input-card-cvv"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="cardName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome no Cartão</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="João Silva" 
                                  data-testid="input-card-name"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Billing Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Endereço de Cobrança</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CEP</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="01234-567" 
                              data-testid="input-zip-code"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rua</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Rua das Flores" 
                                data-testid="input-street"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Número</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="123" 
                                data-testid="input-number"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cidade</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="São Paulo" 
                                data-testid="input-city"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estado</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger data-testid="select-state">
                                  <SelectValue placeholder="Selecione o estado" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="SP">São Paulo</SelectItem>
                                <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                                <SelectItem value="MG">Minas Gerais</SelectItem>
                                <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  type="submit" 
                  disabled={isProcessing}
                  className="w-full totem-button bg-primary text-primary-foreground hover:bg-primary/90"
                  data-testid="button-process-payment"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  {isProcessing ? "Processando..." : "Finalizar Pagamento"}
                </Button>
              </form>
            </Form>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <CartSummary showActions={false} />

            {/* Discounts Available */}
            <Card className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Gift className="w-5 h-5 text-success" />
                  <h4 className="font-semibold text-success">Cupons Disponíveis</h4>
                </div>
                <Button
                  variant="outline"
                  className="w-full text-left p-3 hover:bg-background/70"
                  data-testid="button-apply-coupon"
                >
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <p className="font-medium text-sm">PRIMEIRA10</p>
                      <p className="text-xs text-muted-foreground">10% de desconto na primeira compra</p>
                    </div>
                    <span className="text-success text-sm font-medium">Aplicar</span>
                  </div>
                </Button>
              </CardContent>
            </Card>

            {/* Security Info */}
            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-success" />
              <span>Pagamento 100% seguro e criptografado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
