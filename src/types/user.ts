export interface User {
  id: string;
  name: string;
  email: string;
  type: 'student' | 'trainer';
  avatar?: string;
  personalTrainer?: string;
  totalStudents?: number;
}
