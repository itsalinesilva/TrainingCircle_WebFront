export interface AuthUser {
  id: string;
  email: string;
  password: string;
  type: 'student' | 'trainer';
  name: string;
  personalTrainer?: string;
  totalStudents?: number;
  avatar?: string;
}
