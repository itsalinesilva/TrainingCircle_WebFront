
import React, { useEffect } from "react";
import { Home, User, LogOut, Star, Users, Library, Plus, Menu, X } from "lucide-react";
import { Dumbbell, MessageCircle, TrendingUp, Video } from "@/lib/icons";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { BaseUser, MenuItem } from "@/types";

interface AppSidebarProps {
  user: BaseUser & { type: 'student' | 'trainer' };
  onLogout: () => void;
  currentView: string;
  onViewChange: (view: string, data?: any) => void;
}

const studentMenuItems: MenuItem[] = [
  { title: "Dashboard", icon: Home, path: "/dashboard", view: "dashboard" },
  { title: "Meus Treinos", icon: Dumbbell, path: "/workouts", view: "my-workouts" },
  { title: "Meu Progresso", icon: TrendingUp, path: "/progress", view: "progress" },
  { title: "Avaliar Treino", icon: Star, path: "/evaluate-workout", view: "evaluate-workout" },
  { title: "Mensagens", icon: MessageCircle, path: "/messages", view: "messages" },
  { title: "Evento ao Vivo", icon: Video, path: "/live", view: "live-event" },
  { title: "Perfil", icon: User, path: "/profile", view: "profile" },
];

const trainerMenuItems: MenuItem[] = [
  { title: "Dashboard", icon: Home, path: "/dashboard", view: "dashboard" },
  { title: "Alunos", icon: Users, path: "/students", view: "all-students" },
  { title: "Criar Treino", icon: Plus, path: "/create-workout", view: "create-workout" },
  { title: "Biblioteca de Exercícios", icon: Library, path: "/exercises", view: "exercise-library" },
  { title: "Avaliações", icon: Star, path: "/evaluations", view: "evaluations" },
  { title: "Mensagens", icon: MessageCircle, path: "/messages", view: "trainer-messages" },
  { title: "Evento ao Vivo", icon: Video, path: "/live", view: "live-event" },
  { title: "Perfil", icon: User, path: "/profile", view: "profile" },
];

export function AppSidebar({ user, onLogout, currentView, onViewChange }: AppSidebarProps) {
  const { state, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  // Garante que o tipo de usuário seja 'student' ou 'trainer'
  const userType = user?.type === 'student' || user?.type === 'trainer' ? user.type : 'student';
  
  // Filtra os itens de menu com base no tipo de usuário
  const menuItems = userType === 'student' ? [...studentMenuItems] : [...trainerMenuItems];
  
  // Prefixo baseado no tipo de usuário
  const basePath = `/${userType}`;
  
  // Remove o prefixo do caminho atual para comparação
  const currentPath = location.pathname.startsWith(basePath) 
    ? location.pathname.slice(basePath.length) || '/' 
    : location.pathname;
  
  // Função para verificar se um item do menu está ativo
  const isItemActive = (itemPath: string) => {
    // Remove barras iniciais e finais para comparação
    const normalizedItemPath = itemPath.replace(/^\/+|\/+$/g, '');
    const normalizedCurrentPath = currentPath.replace(/^\/+|\/+$/g, '');
    
    // Se for a rota raiz, verifica se o caminho atual está vazio ou é a raiz
    if (normalizedItemPath === '') {
      return normalizedCurrentPath === '' || normalizedCurrentPath === basePath.replace(/^\/+|\/+$/g, '');
    }
    
    // Verifica se o caminho atual começa com o caminho do item
    return normalizedCurrentPath === normalizedItemPath || 
           normalizedCurrentPath.startsWith(`${normalizedItemPath}/`);
  };
  
  console.log('=== Menu Lateral ===');
  console.log('Tipo de usuário:', userType);
  console.log('Caminho completo:', location.pathname);
  console.log('Base path:', basePath);
  console.log('Caminho relativo:', currentPath);

  // Fechar o menu ao navegar em dispositivos móveis
  useEffect(() => {
    if (isMobile && state === "expanded") {
      const timer = setTimeout(() => {
        toggleSidebar();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, isMobile]);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    onLogout();
    navigate('/login');
  };

  return (
    <div className={cn(
      "fixed top-0 left-0 h-screen z-50 bg-white border-r border-slate-200 flex flex-col",
      "transition-all duration-300 ease-in-out",
      state === "expanded" ? "w-64" : "w-16"
    )}>
      {/* Área do perfil */}
      <div className="p-4 border-b border-slate-200">
        <div className={cn(
          "flex items-center",
          state === "expanded" ? "justify-between" : "justify-center"
        )}>
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-900 to-purple-800 flex-shrink-0 flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            {state === "expanded" && (
              <div className="ml-3">
                <p className="text-sm font-medium text-slate-800 truncate">{user.name}</p>
                <p className="text-xs text-slate-500 capitalize">{user.type === 'student' ? 'Aluno' : 'Treinador'}</p>
              </div>
            )}
          </div>
          
          {/* Botão de menu com efeito de seleção */}
          <button
            onClick={toggleSidebar}
            className={cn(
              "h-8 w-8 rounded-lg flex items-center justify-center transition-colors",
              state === "expanded" 
                ? "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <Menu className={cn(
              "h-5 w-5 transition-transform duration-200",
              state === "expanded" ? "rotate-90" : "rotate-0"
            )} />
          </button>
        </div>
      </div>

      {/* Itens do menu */}
      <div className="flex-1 overflow-y-auto py-2">
        <div className="space-y-1 px-2">
          {menuItems.map((item) => {
            const active = isItemActive(item.path);
            const fullPath = `${basePath}${item.path}`.replace(/\/+$/, '') || '/';
            
            console.log('--- Menu Item ---');
            console.log('Título:', item.title);
            console.log('Caminho do item:', item.path);
            console.log('Caminho completo:', fullPath);
            console.log('Está ativo?', active);
            
            return (
              <NavLink
                key={item.path}
                to={fullPath}
                end={item.path === '/' || item.path === ''}
                className={({ isActive: navLinkIsActive }) => {
                  const isActive = active || navLinkIsActive;
                  console.log('NavLink -', item.title, 'isActive:', isActive);
                  
                  return cn(
                    "flex items-center p-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-indigo-50 text-indigo-600 font-medium"
                      : "text-slate-600 hover:bg-slate-100",
                    state === "expanded" ? "justify-start gap-3 px-4" : "justify-center"
                  );
                }}
                title={state === "collapsed" ? item.title : undefined}
              >
                <item.icon className={cn(
                  "h-5 w-5 flex-shrink-0",
                  active ? "text-indigo-600" : "text-slate-600"
                )} />
                {state === "expanded" && (
                  <span className="text-sm truncate">{item.title}</span>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Botão de logout */}
      <div className="border-t border-slate-200 p-2">
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center p-2 rounded-lg",
            "text-indigo-600 hover:bg-slate-100 active:bg-indigo-50",
            state === "expanded" ? "justify-start gap-3 px-3" : "justify-center"
          )}
          title={state === "collapsed" ? "Sair" : undefined}
        >
          <LogOut className="h-5 w-5" />
          {state === "expanded" && (
            <span className="text-sm">Sair</span>
          )}
        </button>
      </div>
    </div>
  );
}
