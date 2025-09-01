import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { Language } from "@/lib/translations";

interface LanguageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LanguageSelector({ isOpen, onClose }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "pt-BR" as Language, name: "Português", country: "Brasil", flag: "🇧🇷" },
    { code: "en-US" as Language, name: "English", country: "United States", flag: "🇺🇸" },
    { code: "es-ES" as Language, name: "Español", country: "España", flag: "🇪🇸" },
  ];

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" data-testid="modal-language-selector">
        <DialogHeader>
          <DialogTitle className="text-center text-xl mb-2">Selecionar Idioma</DialogTitle>
          <p className="text-muted-foreground text-center">Choose your preferred language</p>
        </DialogHeader>

        <div className="space-y-3">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={language === lang.code ? "default" : "outline"}
              className="w-full p-4 justify-start"
              onClick={() => handleLanguageSelect(lang.code)}
              data-testid={`button-language-${lang.code}`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{lang.flag}</span>
                <div className="text-left">
                  <p className="font-medium">{lang.name}</p>
                  <p className="text-xs text-muted-foreground">{lang.country}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={onClose}
          data-testid="button-cancel-language"
        >
          Cancelar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
