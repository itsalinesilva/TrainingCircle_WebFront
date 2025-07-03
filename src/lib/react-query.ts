import { QueryClient } from '@tanstack/react-query';

// Configuração global do React Query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Evita refetch quando a janela recebe foco
      retry: 1, // Número de tentativas em caso de erro
      staleTime: 5 * 60 * 1000, // Tempo em que os dados são considerados frescos (5 minutos)
      gcTime: 10 * 60 * 1000, // Tempo que os dados em cache são mantidos na memória (10 minutos)
    },
  },
});

// Tipos úteis para o React Query
type QueryKey = readonly unknown[];

export type QueryKeys = {
  auth: readonly ['auth'];
  user: readonly ['user'];
  workouts: readonly ['workouts'];
  workout: (id: string) => readonly ['workout', string];
  exercises: readonly ['exercises'];
  exercise: (id: string) => readonly ['exercise', string];
  // Adicione mais chaves de consulta conforme necessário
};

// Função auxiliar para criar chaves de consulta
export const queryKeys: QueryKeys = {
  auth: ['auth'] as const,
  user: ['user'] as const,
  workouts: ['workouts'] as const,
  workout: (id: string) => ['workout', id] as const,
  exercises: ['exercises'] as const,
  exercise: (id: string) => ['exercise', id] as const,
};
