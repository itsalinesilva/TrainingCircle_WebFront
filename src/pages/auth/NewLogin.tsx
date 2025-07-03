import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AuthUser } from "@/types";

// Mock authentication function - substitua por uma chamada real à API
const authenticateUser = async (email: string, password: string): Promise<AuthUser> => {
  const mockUsers: AuthUser[] = [
    {
      id: '1',
      email: "aluno@example.com",
      password: "123456",
      type: "student",
      name: "João Silva",
      personalTrainer: "Maria Santos",
      avatar: "/avatars/joao.jpg"
    },
    {
      id: '2',
      email: "personal@example.com",
      password: "123456",
      type: "trainer",
      name: "Maria Santos",
      totalStudents: 24,
      avatar: "/avatars/maria.jpg"
    }
  ];
  
  const user = mockUsers.find(user => user.email === email && user.password === password);
  
  if (!user) {
    throw new Error('Credenciais inválidas');
  }
  
  return user;
};

const NewLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const authUser = await authenticateUser(email, password);
      
      // Aqui você deve definir o usuário no contexto de autenticação
      // Por exemplo: login(authUser);
      
      // Redireciona para a dashboard apropriada
      const redirectPath = authUser.type === 'student' ? '/student/dashboard' : '/trainer/dashboard';
      navigate(redirectPath);
      
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo(a), ${authUser.name}!`,
      });
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Training Circle</CardTitle>
          <CardDescription className="text-center">
            Entre com suas credenciais para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <button
              type="button"
              className="text-primary hover:underline"
              onClick={() => {
                toast({
                  title: "Recuperação de senha",
                  description: "Em breve você receberá um e-mail com instruções para redefinir sua senha.",
                });
              }}
            >
              Esqueceu sua senha?
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewLogin;
