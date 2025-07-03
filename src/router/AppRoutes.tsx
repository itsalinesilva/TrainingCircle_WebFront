import { createBrowserRouter, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/layout/MainLayout";
import Login from "@/pages/auth/Login";
import NotFound from "@/pages/NotFound";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Student Pages
import StudentDashboard from "@/pages/student/Dashboard";
import StudentWorkouts from "@/pages/student/Workouts";
import { Progress as StudentProgress } from "@/components/student/Progress";
import { Messages as StudentMessages } from "@/components/student/Messages";
import Profile from "@/components/student/Profile";
import StudentLiveEvent from "@/components/student/LiveEvent";
import { EvaluateWorkout } from "@/components/student/EvaluateWorkout";

// Trainer Pages
import { TrainerDashboard } from "@/components/trainerSection/TrainerDashboard";
import TrainerStudents from "@/pages/trainer/Students";
import StudentProfilePage from "@/pages/trainer/StudentProfilePage";
import CreateWorkoutPage from "@/pages/trainer/CreateWorkoutPage";
import { ExerciseLibrary as TrainerExerciseLibrary } from "@/components/trainerSection/ExerciseLibrary";
import { StudentProfile } from "@/components/trainerSection/StudentProfile";
import { TrainerMessages } from "@/components/trainerSection/TrainerMessages";
import { TrainerLiveEvent } from "@/components/trainerSection/TrainerLiveEvent";
import { TrainerEvaluations } from "../pages/trainer/Evaluations";
import { User } from "@/types/user";

// Página de redirecionamento após login
function RedirectToDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const redirectPath = user.type === 'student' ? '/student/dashboard' : '/trainer/dashboard';
      navigate(redirectPath);
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  return null;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RedirectToDashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  // Rotas do Aluno
  {
    path: "/student",
    element: (
      <ProtectedRoute allowedRoles={['student']}>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <StudentDashboard />,
      },
      {
        path: "workouts",
        element: <StudentWorkouts />,
      },
      {
        path: "progress",
        element: <StudentProgress onBack={() => window.history.back()} />,
      },
      {
        path: "messages",
        element: (
          <StudentMessages 
            user={{ name: "Current User" }} // You might want to replace this with actual user data
            onBack={() => window.history.back()}
          />
        ),
      },
      {
        path: "live",
        element: <StudentLiveEvent onBack={() => window.history.back()} />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "evaluate-workout",
        element: <EvaluateWorkout onBack={() => window.history.back()} />,
      },
    ],
  },
  // Rotas do Personal Trainer
  {
    path: "/trainer",
    element: (
      <ProtectedRoute allowedRoles={['trainer']}>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <TrainerDashboardWrapper />,
      },
      {
        path: "students",
        element: <TrainerStudents />,
      },
      {
        path: "students/:id",
        element: <StudentProfilePage />,
      },
      {
        path: "create-workout",
        element: <CreateWorkoutPage />,
      },
      {
        path: "exercises",
        element: <TrainerExerciseLibrary onBack={() => window.history.back()} />,
      },
      {
        path: "messages",
        element: <TrainerMessages onBack={() => window.history.back()} />,
      },
      {
        path: "live",
        element: (
          <TrainerLiveEvent 
            user={{ id: '1', name: 'Trainer', type: 'trainer' } as User}
            onBack={() => window.history.back()}
            onViewChange={() => {}}
          />
        ),
      },
      {
        path: "evaluations",
        element: <TrainerEvaluations />,
      },
    ],
  },
    // Rota de fallback para páginas não encontradas
    {
      path: "*",
      element: <NotFound />,
    },
]);

// Wrapper para o TrainerDashboard que acessa o contexto de autenticação
function TrainerDashboardWrapper() {
  const { user } = useAuth();
  return <TrainerDashboard user={user} onViewChange={(view) => {}} />;
}
