import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AuroraLogo } from "@/components/ui/aurora-logo";
import { Link } from "wouter";
import { ArrowLeft, Server, Monitor } from "lucide-react";

export default function About() {
  const teamMembers = [
    { name: "Julia Santiago", id: "12301841", role: "Desenvolvedora Frontend", initials: "JS", color: "bg-primary" },
    { name: "Clara", id: "12302317", role: "Designer UX/UI", initials: "C", color: "bg-secondary" },
    { name: "Gabriel Scarpelli", id: "12301426", role: "Desenvolvedor Backend", initials: "GS", color: "bg-accent" },
    { name: "Alisson", id: "12302155", role: "Analista de Sistemas", initials: "A", color: "bg-success" },
    { name: "Vitor Hugo", id: "12302783", role: "Gerente de Projeto", initials: "VH", color: "bg-warning" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" className="flex items-center space-x-2" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Sobre o Aurora</h1>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Project Info */}
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6">
              <AuroraLogo size="lg" className="w-full h-full" />
            </div>
            <h2 className="text-4xl font-bold mb-4 aurora-gradient bg-clip-text text-transparent" data-testid="text-project-title">
              Sistema Aurora
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Revolucionando a experiência de compras com tecnologia inteligente e interface intuitiva
            </p>
          </div>

          {/* Team Section */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-8 text-center" data-testid="text-team-title">
                Equipe de Desenvolvimento
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member, index) => (
                  <div key={member.id} className="text-center" data-testid={`team-member-${index}`}>
                    <div className={`w-16 h-16 ${member.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <span className="text-background font-bold">{member.initials}</span>
                    </div>
                    <h4 className="font-semibold" data-testid={`text-member-name-${index}`}>
                      {member.name}
                    </h4>
                    <p className="text-sm text-muted-foreground" data-testid={`text-member-id-${index}`}>
                      {member.id}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1" data-testid={`text-member-role-${index}`}>
                      {member.role}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technology Stack */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6" data-testid="text-tech-title">
                Tecnologias Utilizadas
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4 flex items-center">
                    <Server className="w-5 h-5 mr-2 text-primary" />
                    Backend
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Node.js + Express</li>
                    <li>• TypeScript</li>
                    <li>• Drizzle ORM</li>
                    <li>• PostgreSQL Database</li>
                    <li>• Session Management</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 flex items-center">
                    <Monitor className="w-5 h-5 mr-2 text-secondary" />
                    Frontend
                  </h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• React + TypeScript</li>
                    <li>• Tailwind CSS</li>
                    <li>• TanStack Query</li>
                    <li>• Wouter (Routing)</li>
                    <li>• Shadcn/ui Components</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Features */}
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6" data-testid="text-features-title">
                Recursos Principais
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary">Sistema de Compras</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Catálogo de produtos com busca avançada</li>
                    <li>• Carrinho inteligente com cálculos em tempo real</li>
                    <li>• Sistema de listas organizadas (estilo Trello)</li>
                    <li>• Simulação de leitura de códigos QR/barras</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-secondary">Interface e UX</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Design otimizado para totems touchscreen</li>
                    <li>• Tema escuro como padrão</li>
                    <li>• Suporte a múltiplos idiomas (PT/EN/ES)</li>
                    <li>• Assistente virtual integrado</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-accent">Pagamentos</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Múltiplos métodos de pagamento</li>
                    <li>• Cartão de crédito/débito</li>
                    <li>• PIX e carteiras digitais</li>
                    <li>• Checkout seguro e criptografado</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-success">Gestão de Dados</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Histórico completo de compras</li>
                    <li>• Sistema de autenticação seguro</li>
                    <li>• Persistência de dados do usuário</li>
                    <li>• Analytics de economia e gastos</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* University Info */}
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold mb-4">Projeto Acadêmico</h3>
              <p className="text-muted-foreground mb-4">
                Este projeto foi desenvolvido para a disciplina de <strong>Projeto de Software</strong>
              </p>
              <p className="text-sm text-muted-foreground">
                Turma: Sala 3B1 • Ano: 2024
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
