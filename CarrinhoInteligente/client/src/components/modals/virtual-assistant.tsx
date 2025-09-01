import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Send, X } from "lucide-react";
import { useState } from "react";

interface VirtualAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function VirtualAssistant({ isOpen, onClose }: VirtualAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! Sou a Aurora, sua assistente de compras. Como posso ajudá-lo hoje?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Entendi! Posso ajudá-lo a encontrar produtos específicos ou criar uma lista personalizada. O que você gostaria de fazer?",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputMessage("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col p-0" data-testid="modal-virtual-assistant">
        <DialogHeader className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <DialogTitle>Assistente Aurora</DialogTitle>
                <p className="text-xs text-success flex items-center">
                  <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></div>
                  Online
                </p>
              </div>
            </div>
            <Button size="sm" variant="ghost" onClick={onClose} data-testid="button-close-assistant">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${message.isUser ? 'justify-end' : ''}`}
              data-testid={`message-${message.id}`}
            >
              {!message.isUser && (
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
              <div className={`${message.isUser ? 'bg-primary' : 'bg-muted'} rounded-lg p-3 max-w-xs`}>
                <p className={`text-sm ${message.isUser ? 'text-primary-foreground' : ''}`}>
                  {message.text}
                </p>
              </div>
              {message.isUser && (
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-secondary-foreground text-sm font-medium">U</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-border">
          <div className="flex space-x-3">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
              data-testid="input-assistant-message"
            />
            <Button 
              onClick={handleSendMessage}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-testid="button-send-message"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
