
import React from "react";
import { Home, User, LogOut, Star, Users, Library, Plus } from "lucide-react";
import { Dumbbell, MessageCircle, TrendingUp, Video } from "@/lib/icons";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { BaseUser, MenuItem } from "@/types";

interface AppSidebarProps {
  user: BaseUser & { type: 'student' | 'trainer' };
  onLogout: () => void;
  currentView: string;
  onViewChange: (view: string, data?: any) => void;
}

const studentMenuItems: MenuItem[] = [
  { title: "Painel", icon: Home, path: "/dashboard", view: "dashboard" },
  { title: "Meus Treinos", icon: Dumbbell, path: "/workouts", view: "my-workouts" },
  { title: "Meu Progresso", icon: TrendingUp, path: "/progress", view: "progress" },
  { title: "Avaliar Treino", icon: Star, path: "/evaluate-workout", view: "evaluate-workout" },
  { title: "Mensagens", icon: MessageCircle, path: "/messages", view: "messages" },
  { title: "Evento ao Vivo", icon: Video, path: "/live", view: "live-event" },
  { title: "Perfil", icon: User, path: "/profile", view: "profile" },
];

const trainerMenuItems: MenuItem[] = [
  { title: "Painel", icon: Home, path: "/dashboard", view: "dashboard" },
  { title: "Alunos", icon: Users, path: "/students", view: "all-students" },
  { title: "Criar Treino", icon: Plus, path: "/create-workout", view: "create-workout" },
  { title: "Biblioteca de Exercícios", icon: Library, path: "/exercise-library", view: "exercise-library" },
  { title: "Avaliações", icon: Star, path: "/evaluations", view: "evaluations" },
  { title: "Mensagens", icon: MessageCircle, path: "/messages", view: "trainer-messages" },
  { title: "Evento ao Vivo", icon: Video, path: "/live", view: "live-event" },
  { title: "Perfil", icon: User, path: "/profile", view: "profile" },
];

export function AppSidebar({ user, onLogout, currentView, onViewChange }: AppSidebarProps) {
  const location = useLocation();
  
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
    
  console.log('Current path:', location.pathname);
  console.log('Base path:', basePath);
  console.log('Current path for comparison:', currentPath);
  
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

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    onLogout();
  };

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200 w-64">
      {/* Área do perfil */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-900 to-purple-800 flex-shrink-0 flex items-center justify-center">
            <span className="text-white text-sm font-bold">
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-slate-800 truncate">{user.name}</p>
            <p className="text-xs text-slate-500 capitalize">{user.type === 'student' ? 'Aluno' : 'Treinador'}</p>
          </div>
        </div>
      </div>

      {/* Itens do menu */}
      <div className="flex-1 overflow-y-auto py-2">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = isItemActive(item.path);
            // Garante que o caminho comece com / e não tenha barras duplas
            const fullPath = `/${basePath}${item.path}`.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
            console.log('Menu item:', item.title, 'Path:', fullPath);
            
            return (
              <NavLink
                key={item.path}
                to={fullPath}
                end={item.path === '/' || item.path === ''}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md group",
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
                onClick={() => onViewChange(item.view, item)}
              >
                <item.icon 
                  className={cn(
                    "mr-3 flex-shrink-0 h-5 w-5",
                    isActive ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-500"
                  )} 
                  aria-hidden="true" 
                />
                {item.title}
              </NavLink>
            );
          })}
        </nav>
      </div>
      
      {/* Botão de logout */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md group"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
          Sair
        </button>
      </div>
    </div>
  );
}
