import { useState } from "react";
import { User } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, User as UserIcon, Lock, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

// User Section Components
import { UserDashboard } from "@/components/userSection/UserDashboard";
import { UserMyWorkouts } from "@/components/userSection/UserMyWorkouts";
import { UserEvaluateWorkout } from "@/components/userSection/UserEvaluateWorkout";
import { UserProfile } from "@/components/userSection/UserProfile";
import { WorkoutDetails } from "@/components/student/WorkoutDetails";
import { Progress } from "@/components/student/Progress";
import { Messages } from "@/components/student/Messages";
import LiveEvent from "@/components/student/LiveEvent";

// Trainer Section Components
import { TrainerDashboard } from "@/components/trainerSection/TrainerDashboard";
import { AllStudents } from "@/components/trainerSection/AllStudents";
import { StudentProfile } from "@/components/trainerSection/StudentProfile";
import { CreateWorkout } from "@/components/trainerSection/CreateWorkout";
import { ExerciseLibrary } from "@/components/trainerSection/ExerciseLibrary";
import { TrainerMessages } from "@/components/trainerSection/TrainerMessages";
import { TrainerLiveEvent } from "@/components/trainerSection/TrainerLiveEvent";
import { RecentEvaluations } from "@/components/trainerSection/RecentEvaluations";

// Mock authentication data
const mockAuthData = [
  {
    email: 'aluno@example.com',
    password: '123456',
    userData: {
      id: '1',
      name: 'João Silva',
      email: 'aluno@example.com',
      type: 'student' as const,
      personalTrainer: 'Maria Santos',
      avatar: ''
    }
  },
  {
    email: 'personal@example.com',
    password: '123456',
    userData: {
      id: '2',
      name: 'Maria Santos',
      email: 'personal@example.com',
      type: 'trainer' as const,
      avatar: ''
    }
  }
];

// Mock authentication function
const authenticateUser = (email: string, password: string): User | null => {
  const authData = mockAuthData.find(data => data.email === email && data.password === password);
  return authData?.userData || null;
};

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const user = authenticateUser(email, password);
      
      if (user) {
        setCurrentUser(user);
        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo(a), ${user.name}!`,
        });
      } else {
        toast({
          title: "Erro de autenticação",
          description: "E-mail ou senha incorretos. Tente novamente.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView("dashboard");
    setSelectedWorkout(null);    
    setSelectedStudent(null);
    setEmail("");
    setPassword("");
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  const handleForgotPassword = () => {
    toast({
      title: "Recuperação de senha",
      description: "Em breve você receberá um e-mail com instruções para redefinir sua senha.",
    });
  };

  const handleViewChange = (view: string, data?: any) => {
    setCurrentView(view);
    if (data) {
      if (view === "workout-details") {
        setSelectedWorkout(data);
      } else if (view === "student-details") {
        setSelectedStudent(data);
      }
    }
  };

  const handleBack = () => {
    if (currentView === "workout-details") {
      setCurrentView("my-workouts");
      setSelectedWorkout(null);
    } else if (currentView === "student-profile") {
      setCurrentView("all-students"); 
      setSelectedStudent(null);
    } else {
      setCurrentView("dashboard");
    }
  };

  const renderStudentContent = () => {
    switch (currentView) {
      case "dashboard":
        return <UserDashboard user={currentUser} onViewChange={handleViewChange} />;
      case "my-workouts":
        return <UserMyWorkouts onViewChange={handleViewChange} onBack={handleBack} />;
      case "workout-details":
        return <WorkoutDetails workout={selectedWorkout} onBack={handleBack} />;
      case "progress":
        return <Progress onBack={handleBack} />;
      case "evaluate-workout":
        return <UserEvaluateWorkout onBack={handleBack} />;
      case "messages":
        return <Messages user={currentUser} onBack={handleBack} />;
      case "live-event":
        return <LiveEvent onBack={handleBack} />;
      case "profile":
        return <UserProfile user={currentUser} onBack={handleBack} />;
      default:
        return <UserDashboard user={currentUser} onViewChange={handleViewChange} />;
    }
  };

  const renderTrainerContent = () => {
    switch (currentView) {
      case "dashboard":
        return <TrainerDashboard user={currentUser} onViewChange={handleViewChange} />;
      case "all-students":
        return <AllStudents onBack={handleBack} onViewChange={handleViewChange} />;
      case "student-profile":
        return <StudentProfile student={selectedStudent} onBack={handleBack} onViewChange={handleViewChange} />;
      case "create-workout":
        return <CreateWorkout onBack={handleBack} student={selectedStudent} />;
      case "exercise-library":
        return <ExerciseLibrary onBack={handleBack} />;
      case "live-event":
        return <TrainerLiveEvent onBack={handleBack} user={currentUser} onViewChange={handleViewChange} />;
      case "trainer-messages":
        return <TrainerMessages onBack={handleBack} />;
      case "recent-evaluations":
        return <RecentEvaluations onBack={handleBack} user={currentUser} onViewChange={handleViewChange} />;
      default:
        return <TrainerDashboard user={currentUser} onViewChange={handleViewChange} />;
    }
  };

  if (currentUser) {
    return (
      <SidebarProvider defaultOpen={false}>
        <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-slate-100">
          <AppSidebar 
            user={currentUser} 
            onViewChange={handleViewChange}
            currentView={currentView}
            onLogout={handleLogout}
          />
          <main className="flex-1">
            {currentUser.type === 'student' ? renderStudentContent() : renderTrainerContent()}
          </main>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-900 to-purple-800 mx-auto mb-4 flex items-center justify-center shadow-lg">
            <div className="w-8 h-8 border-3 border-white rounded-full"></div>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Training Circle</h1>
          <p className="text-slate-600">Entre na sua conta</p>
        </div>

        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-slate-800">Login</CardTitle>
            <CardDescription className="text-slate-600">
              Acesse sua conta para continuar
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">
                  E-mail
                </Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 rounded-xl border-slate-200 focus:border-indigo-900 focus:ring-indigo-900"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 rounded-xl border-slate-200 focus:border-indigo-900 focus:ring-indigo-900"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-indigo-900 hover:text-purple-800 font-medium transition-colors"
                >
                  Esqueceu a senha?
                </button>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-gradient-to-r from-indigo-900 to-purple-800 hover:from-indigo-800 hover:to-purple-700 text-white font-medium py-3 shadow-lg transition-all duration-200 hover:shadow-xl"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-600 text-center mb-2 font-medium">
                Credenciais para teste:
              </p>
              <div className="text-xs text-slate-500 space-y-1">
                <p><strong>Aluno:</strong> aluno@example.com / 123456</p>
                <p><strong>Personal:</strong> personal@example.com / 123456</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
