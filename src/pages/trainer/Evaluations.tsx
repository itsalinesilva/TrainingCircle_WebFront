import { useNavigate } from 'react-router-dom';
import { RecentEvaluations } from '@/components/trainerSection/RecentEvaluations';

const TrainerEvaluations = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/trainer/dashboard');
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <RecentEvaluations 
        onBack={handleBack} 
        user={{}} // Passando um objeto vazio como user, já que não está sendo usado no componente
        onViewChange={() => {}} // Função vazia, já que não estamos usando navegação interna
      />
    </div>
  );
};

export { TrainerEvaluations };
