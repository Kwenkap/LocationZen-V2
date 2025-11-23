import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-subtle p-4">
      <div className="text-center space-y-6 max-w-md animate-fade-in-up">
        {/* 404 Visual */}
        <div className="relative">
          <h1 className="text-9xl font-bold font-heading gradient-primary bg-clip-text text-transparent">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl opacity-30 gradient-primary" />
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold font-heading text-foreground">
            Page introuvable
          </h2>
          <p className="text-muted-foreground text-lg">
            Oups ! La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            className="hover-lift"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
          <Button 
            asChild
            className="gradient-primary hover:opacity-90 transition-opacity shadow-lg"
          >
            <a href="/">
              <Home className="mr-2 h-4 w-4" />
              Accueil
            </a>
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>
    </div>
  );
};

export default NotFound;
