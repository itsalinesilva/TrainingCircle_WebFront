import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: ('student' | 'trainer')[];
};

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute - Estado:', { 
    isLoading, 
    isAuthenticated, 
    userType: user?.type,
    path: location.pathname,
    allowedRoles 
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('Usuário não autenticado, redirecionando para login...');
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Garante que o usuário tenha um tipo válido
  const userType = user?.type === 'student' || user?.type === 'trainer' ? user.type : 'student';
  
  // Verifica se o usuário tem a role necessária
  if (allowedRoles && !allowedRoles.includes(userType)) {
    console.log(`Usuário do tipo ${userType} não tem permissão para acessar esta rota. Redirecionando...`);
    const redirectTo = userType === 'student' ? '/student/dashboard' : '/trainer/dashboard';
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  console.log('Acesso permitido para o usuário:', { userType, path: location.pathname });
  return <>{children}</>;
}
