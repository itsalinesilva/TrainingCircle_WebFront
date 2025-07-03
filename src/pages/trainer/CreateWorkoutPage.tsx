import { useNavigate } from 'react-router-dom';
import { CreateWorkout } from '@/components/trainerSection/CreateWorkout';

export const CreateWorkoutPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <CreateWorkout onBack={handleBack} />
  );
};

export default CreateWorkoutPage;
