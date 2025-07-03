import { useParams, useNavigate } from 'react-router-dom';
import { StudentProfile } from '@/components/trainerSection/StudentProfile';

export const StudentProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Mock student data - in a real app, you would fetch this using the id
  const mockStudent = {
    id: id,
    name: "João Silva",
    email: "joao@example.com",
    joinDate: "15/03/2023",
    lastWorkout: "Ontem",
    nextSession: "Amanhã, 10:00",
    progress: 75,
    avatar: "/avatars/joao.jpg",
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleViewChange = (view: string) => {
    console.log("View changed to:", view);
    // Handle view change logic here
  };

  return (
    <StudentProfile 
      student={mockStudent}
      onBack={handleBack}
      onViewChange={handleViewChange}
    />
  );
};

export default StudentProfilePage;
