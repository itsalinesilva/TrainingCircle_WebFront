import { createBrowserRouter, useNavigate } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { MainLayout } from "@/components/layout/MainLayout";
import Login from "@/pages/auth/Login";
import { EvaluateWorkout as StudentEvaluateWorkout } from "@/components/student/EvaluateWorkout";
import NotFound from "@/pages/NotFound";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Student Pages
import StudentDashboard from "@/pages/student/Dashboard";
import StudentWorkouts from "@/pages/student/Workouts";
import StudentLiveEvent from "@/components/student/LiveEvent";
import Profile from "@/pages/student/Profile";

// Trainer Pages
import { TrainerDashboard } from "@/components/trainerSection/TrainerDashboard";
import TrainerStudents from "@/pages/trainer/Students";
import StudentProfilePage from "@/pages/trainer/StudentProfilePage";
import CreateWorkoutPage from "@/pages/trainer/CreateWorkoutPage";
import { ExerciseLibraryPage } from "@/pages/trainer/ExerciseLibraryPage";

// Components
import { Progress as StudentProgress } from "@/components/student/Progress";
import { Messages as StudentMessages } from "@/components/student/Messages";
import { TrainerMessages } from "@/components/trainerSection/TrainerMessages";
import { TrainerLiveEvent } from "@/components/trainerSection/TrainerLiveEvent";
import { StudentProfile } from "@/components/trainerSection/StudentProfile";
import { ExerciseLibrary } from "@/components/trainerSection/ExerciseLibrary";
import { TrainerEvaluations } from "@/pages/trainer/Evaluations";
import { User } from "@/types/user";
import { UserProfile } from "@/components/userSection/UserProfile";

// Wrapper components
type WrapperProps = {
  children: React.ReactNode;
};

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  requiredRole?: 'student' | 'trainer'
) => {
  const AuthenticatedComponent: FC<P> = (props) => {
    const { user } = useAuth();

    if (!user) {
      return <div>Carregando...</div>;
    }

    if (requiredRole && user.type !== requiredRole) {
      return <div>Acesso não autorizado</div>;
    }

    return <WrappedComponent {...props as P} />;
  };

  return AuthenticatedComponent;
};

// Wrapper for EvaluateWorkout
const EvaluateWorkoutWrapper = withAuth(({ onBack }: { onBack: () => void }) => {
  const { user } = useAuth();
  
  return (
    <StudentEvaluateWorkout 
      user={user!} 
      workout={null} 
      onBack={onBack} 
    />
  );
});

// Wrapper for TrainerDashboard
const TrainerDashboardWrapper = withAuth(() => {
  const { user } = useAuth();
  
  return (
    <TrainerDashboard 
      user={user!}
      onViewChange={(view: string) => {
        // Aqui você pode adicionar lógica adicional se necessário
        console.log('View changed to:', view);
      }}
    />
  );
}, 'trainer');

// Wrapper for ExerciseLibrary
const ExerciseLibraryWrapper = withAuth(() => {
  return (
    <div className="p-6">
      <ExerciseLibrary onBack={() => window.history.back()} />
    </div>
  );
}, 'trainer');

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
        element: <StudentLiveEvent onBack={() => window.history.back()} />
      },
      {
        path: "profile",
        element: <UserProfile 
          user={{ 
            id: '1',
            name: 'Current User',
            email: 'student@example.com',
            type: 'student',
            personalTrainer: 'Trainer Name'
          }} 
          onBack={() => window.history.back()} 
        />
      },
      {
        path: "evaluate-workout",
        element: <EvaluateWorkoutWrapper onBack={() => window.history.back()} />,
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
        index: true,
        element: <TrainerDashboardWrapper />,
      },
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
        path: "exercise-library",
        element: <ExerciseLibraryWrapper />,
      },
      {
        path: "messages",
        element: <TrainerMessages onBack={() => window.history.back()} />,
      },
      {
        path: "live",
        element: <TrainerLiveEvent 
          user={{ id: '1', name: 'Trainer', type: 'trainer' } as User}
          onBack={() => window.history.back()}
          onViewChange={() => {}}
        />,
      },
      {
        path: "evaluations",
        element: <TrainerEvaluations />
      },
      {
        path: "profile",
        element: <UserProfile 
          user={{ 
            name: 'Personal Trainer', 
            email: 'personal@example.com',
            personalTrainer: 'N/A',
            type: 'trainer'
          }} 
          onBack={() => window.history.back()} 
        />
      }
    ],
  },
    // Rota de fallback para páginas não encontradas
    {
      path: "*",
      element: <NotFound />,
    },
]);




