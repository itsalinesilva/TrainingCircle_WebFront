// Tipos compartilhados para usuários
export interface BaseUser {
  id: string;
  email: string;
  type: 'student' | 'trainer';
  name: string;
  personalTrainer?: string;
  totalStudents?: number;
  avatar?: string;
}

export interface AuthUser extends BaseUser {
  password: string;
}

export interface MenuItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  view: string;
}
