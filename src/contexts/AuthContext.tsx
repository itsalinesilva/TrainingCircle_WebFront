import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

export type User = {
  id: string;
  name: string;
  email: string;
  type: 'student' | 'trainer';
  avatar?: string;
  photoURL?: string;
  displayName?: string;
  phone?: string;
  personalTrainer?: string;
  joinDate?: string;
  metadata?: {
    creationTime?: string;
  };
};

type AuthContextData = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock de autenticação - substitua por uma chamada real à API
  const authenticateUser = async (email: string, password: string): Promise<User> => {
    // Simulando uma chamada de API
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUsers = [
          { 
            id: '1', 
            name: 'João Silva', 
            email: 'aluno@example.com', 
            password: '123456',
            type: 'student' as const,
            avatar: '/avatars/joao.jpg'
          },
          { 
            id: '2', 
            name: 'Maria Santos', 
            email: 'personal@example.com', 
            password: '123456',
            type: 'trainer' as const,
            avatar: '/avatars/maria.jpg'
          }
        ];

        const user = mockUsers.find(
          (u) => u.email === email && u.password === password
        );

        if (user) {
          // Removendo a senha do objeto do usuário
          const { password: _, ...userWithoutPassword } = user;
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Credenciais inválidas'));
        }
      }, 1000);
    });
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const userData = await authenticateUser(email, password);
      setUser(userData);
      // Salvar token no localStorage (simulado)
      localStorage.setItem('@TrainingCircle:token', 'mock-jwt-token');
      localStorage.setItem('@TrainingCircle:user', JSON.stringify(userData));
      
      // O redirecionamento será tratado pelo componente de rota
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('@TrainingCircle:token');
    localStorage.removeItem('@TrainingCircle:user');
    setUser(null);
    // O redirecionamento será tratado pelo componente de rota
  };

  // Verificar autenticação ao carregar o app
  useEffect(() => {
    const loadUserFromStorage = () => {
      try {
        const storagedUser = localStorage.getItem('@TrainingCircle:user');
        const storagedToken = localStorage.getItem('@TrainingCircle:token');

        if (storagedUser && storagedToken) {
          const parsedUser = JSON.parse(storagedUser);
          
          // Garante que o tipo de usuário seja válido
          const userWithValidType = {
            ...parsedUser,
            type: parsedUser.type === 'student' || parsedUser.type === 'trainer' 
              ? parsedUser.type 
              : 'student'
          };
          
          console.log('Usuário carregado do localStorage:', userWithValidType);
          setUser(userWithValidType);
        }
      } catch (error) {
        console.error('Erro ao carregar usuário do localStorage:', error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}
