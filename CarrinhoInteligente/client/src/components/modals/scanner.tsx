import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, Camera, X } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface ScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onProductFound: (product: any) => void;
}

export function Scanner({ isOpen, onClose, onProductFound }: ScannerProps) {
  const [manualCode, setManualCode] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const searchProduct = async (barcode: string) => {
    setIsSearching(true);
    try {
      const response = await fetch(`/api/products/barcode/${barcode}`);
      if (response.ok) {
        const product = await response.json();
        onProductFound(product);
        onClose();
      } else {
        alert("Produto não encontrado");
      }
    } catch (error) {
      alert("Erro ao buscar produto");
    } finally {
      setIsSearching(false);
    }
  };

  const handleManualSearch = () => {
    if (manualCode.trim()) {
      searchProduct(manualCode.trim());
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" data-testid="modal-scanner">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <QrCode className="w-8 h-8 text-primary" />
              </div>
              <DialogTitle className="text-xl">Escanear Produto</DialogTitle>
              <p className="text-muted-foreground mt-2">
                Aponte a câmera para o código QR ou código de barras
              </p>
            </div>
            <Button size="sm" variant="ghost" onClick={onClose} data-testid="button-close-scanner">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Camera Preview */}
          <div className="bg-muted rounded-xl h-64 flex items-center justify-center relative" data-testid="scanner-camera-area">
            <div className="text-center">
              <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Aguardando câmera...</p>
            </div>
            
            {/* Scanning Frame */}
            <div className="absolute inset-4 border-2 border-primary border-dashed rounded-lg flex items-center justify-center">
              <div className="w-24 h-24 border-2 border-primary rounded-lg animate-pulse"></div>
            </div>
          </div>

          {/* Manual Input */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="manual-code">Ou digite o código manualmente</Label>
              <Input
                id="manual-code"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="7891234567890"
                onKeyDown={(e) => e.key === "Enter" && handleManualSearch()}
                data-testid="input-manual-barcode"
              />
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={onClose}
                data-testid="button-cancel-scan"
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleManualSearch}
                disabled={!manualCode.trim() || isSearching}
                data-testid="button-search-product"
              >
                {isSearching ? "Buscando..." : "Buscar"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
