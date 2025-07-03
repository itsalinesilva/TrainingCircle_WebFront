import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const MainLayout = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [currentView, setCurrentView] = useState("dashboard");
  
  useEffect(() => {
    // Extrai a visualização atual do caminho da URL
    const pathParts = location.pathname.split('/');
    const view = pathParts[pathParts.length - 1];
    setCurrentView(view === 'trainer' || view === 'student' ? 'dashboard' : view);
    
    console.log('Path atual:', location.pathname);
    console.log('Usuário autenticado:', isAuthenticated);
    console.log('Tipo de usuário:', user?.type);
  }, [location.pathname, user, isAuthenticated]);
  
  // Se não estiver autenticado, redireciona para o login
  if (!isAuthenticated || !user) {
    console.log('Usuário não autenticado, redirecionando...');
    return null; // O redirecionamento é tratado pelo ProtectedRoute
  }

  // Garante que o usuário tenha um tipo válido
  const userWithType = {
    ...user,
    type: user.type === 'student' || user.type === 'trainer' ? user.type : 'student'
  };
  
  console.log('Usuário no MainLayout - Nome:', userWithType.name, 'Tipo:', userWithType.type);
  
  // Força a renderização apenas quando o tipo de usuário estiver definido
  if (!userWithType.type) {
    console.error('Tipo de usuário não definido!');
    return null;
  }

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen bg-gray-50 flex">
        <AppSidebar 
          user={userWithType} 
          onLogout={logout} 
          currentView={currentView}
          onViewChange={(view) => setCurrentView(view)}
        />
        
        <div className="flex-1 ml-16">
          <main className="p-4 md:p-6">
            <div className="max-w-7xl mx-auto w-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
