import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { AppHeader } from "@/components/AppHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const MainLayout = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [currentView, setCurrentView] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Fecha o menu ao mudar de rota em dispositivos móveis
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);
  
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

  // Inicializa o estado do menu como fechado por padrão em todos os dispositivos
  useEffect(() => {
    setIsSidebarOpen(false);
  }, []);

  // Função para alternar o menu lateral
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };
  
  // Função para fechar o menu
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Fecha o menu ao mudar de rota em dispositivos móveis
  useEffect(() => {
    if (isMobile) {
      console.log('Route changed, closing sidebar on mobile');
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-30 flex items-center px-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          aria-label={isSidebarOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isSidebarOpen ? (
            <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
        <h1 className="ml-4 text-xl font-bold text-indigo-600">TrainingCircle</h1>
      </header>
      
      <div className="flex flex-1 pt-16">
        {/* Overlay para fechar o menu ao clicar fora */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:bg-opacity-30"
            onClick={closeSidebar}
          />
        )}
        
        {/* Sidebar */}
        <div 
          className={cn(
            "fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full",
            "md:translate-x-0", // Em desktop, sempre mostra a barra lateral
            !isSidebarOpen && "md:-translate-x-full" // Em desktop, esconde a barra lateral quando fechada
          )}
        >
          {/* Cabeçalho do menu lateral com botão de fechar */}
          <div className="h-16 flex items-center px-4 border-b border-gray-200">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-label="Fechar menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          <div className="h-full overflow-y-auto pt-12">
            <AppSidebar 
              user={userWithType} 
              onLogout={logout} 
              currentView={currentView}
              onViewChange={(view) => {
                setCurrentView(view);
                // Fecha o menu após a seleção em dispositivos móveis
                if (isMobile) {
                  closeSidebar();
                }
              }}
            />
          </div>
        </div>
        
        {/* Conteúdo principal */}
        <div className={cn(
          "w-full transition-all duration-300",
          isSidebarOpen && !isMobile ? "ml-64" : "ml-0"
        )}>
          <main className="p-4 md:p-6">
            <div className="max-w-7xl mx-auto w-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
