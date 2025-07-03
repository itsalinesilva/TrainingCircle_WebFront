import { useNavigate } from "react-router-dom";
import { AllStudents } from "@/components/trainerSection/AllStudents";

export const TrainerStudents = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/trainer/dashboard');
  };

  const handleViewChange = (view: string, student?: any) => {
    if (view === 'student-profile' && student) {
      navigate(`/trainer/students/${student.id}`);
    } else if (view === 'trainer-messages') {
      // Implementar navegação para mensagens
      console.log('Navegar para mensagens do aluno:', student);
    } else if (view === 'add-student') {
      // Implementar adição de novo aluno
      console.log('Adicionar novo aluno');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <AllStudents 
        onBack={handleBack}
        onViewChange={handleViewChange}
      />
    </div>
  );
};

export default TrainerStudents;
