import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginCredentials } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AuroraLogo } from "@/components/ui/aurora-logo";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/lib/auth";
import { Link } from "wouter";
import { LogIn, Chrome, Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const { user } = await response.json();
        login(user);
        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo de volta, ${user.firstName}!`,
        });
        setLocation("/dashboard");
      } else {
        const error = await response.json();
        toast({
          title: "Erro no login",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Verifique sua conexão e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-background">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <AuroraLogo size="lg" className="mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Bem-vindo</h2>
              <p className="text-muted-foreground">Faça login para continuar suas compras</p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="seu@email.com" 
                          type="email"
                          className="text-lg h-12"
                          data-testid="input-email"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="••••••••" 
                            type={showPassword ? "text" : "password"}
                            className="text-lg h-12 pr-12"
                            data-testid="input-password"
                            {...field} 
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            data-testid="button-toggle-password"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full totem-button bg-primary text-primary-foreground hover:bg-primary/90"
                  data-testid="button-submit-login"
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>

                <div className="text-center">
                  <span className="text-muted-foreground">ou</span>
                </div>

                <Button 
                  type="button"
                  variant="outline"
                  className="w-full totem-button"
                  data-testid="button-google-login"
                >
                  <Chrome className="w-5 h-5 mr-2" />
                  Continuar com Google
                </Button>
              </form>
            </Form>

            <div className="mt-8 text-center space-y-4">
              <p className="text-muted-foreground">
                Não tem uma conta?{" "}
                <Link href="/register" className="text-primary hover:text-primary/80 font-medium">
                  Cadastre-se
                </Link>
              </p>
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                <Button variant="ghost" size="sm" data-testid="button-back-welcome">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar à página inicial
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
