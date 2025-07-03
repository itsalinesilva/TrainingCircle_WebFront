import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ExerciseLibraryPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Biblioteca de Exercícios</h1>
        <Button onClick={() => navigate('/trainer/create-workout')}>
          Criar Novo Exercício
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lista de Exercícios</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Aqui você pode gerenciar sua biblioteca de exercícios.</p>
          {/* Adicionar lista de exercícios aqui */}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExerciseLibraryPage;
