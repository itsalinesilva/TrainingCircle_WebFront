
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Star, Send, MessageSquare, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  type: 'student' | 'trainer';
  name: string;
  personalTrainer?: string;
  totalStudents?: number;
  avatar?: string;
}

interface Workout {
  id: string;
  name: string;
  date: string;
  completed: boolean;
  // Adicione outras propriedades conforme necessário
}

interface EvaluateWorkoutProps {
  user: User;
  workout: Workout | null;
  onBack: () => void;
}

const recentWorkouts = [
  { id: 1, name: "Treino de Força A", date: "2024-01-15", completed: true },
  { id: 2, name: "Treino de Força B", date: "2024-01-14", completed: true },
  { id: 3, name: "Treino Cardio", date: "2024-01-13", completed: true },
];

const feedbackHistory = [
  {
    id: 1,
    workoutName: "Treino de Força A",
    date: "2024-01-10",
    rating: 4,
    feedback: "Treino muito bom, senti que poderia ter mais peso no supino.",
    trainerResponse: "Obrigado pelo feedback! Vamos aumentar a carga na próxima sessão.",
    status: "Respondido"
  },
  {
    id: 2,
    workoutName: "Treino Cardio",
    date: "2024-01-08",
    rating: 5,
    feedback: "Excelente treino, me senti muito bem!",
    trainerResponse: null,
    status: "Aguardando resposta"
  }
];

export function EvaluateWorkout({ onBack }: EvaluateWorkoutProps) {
  const [selectedWorkout, setSelectedWorkout] = useState<number | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const handleRatingClick = (star: number) => {
    setRating(star);
  };

  const handleSubmitEvaluation = () => {
    if (!selectedWorkout) {
      toast({
        title: "Selecione um treino",
        description: "Por favor, selecione um treino para avaliar.",
        variant: "destructive",
      });
      return;
    }

    if (rating === 0) {
      toast({
        title: "Avaliação necessária",
        description: "Por favor, dê uma nota de 1 a 5 estrelas.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Avaliação enviada!",
      description: "Sua avaliação foi enviada com sucesso para seu personal trainer.",
    });

    setSelectedWorkout(null);
    setRating(0);
    setFeedback("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mr-4"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-800">Avaliar Treino</h1>
          <p className="text-slate-600 mt-1">Compartilhe sua experiência com o treino</p>
        </div>
      </div>

      {/* Workout Selection */}
      <Card className="border-0 shadow-lg mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Selecione o Treino para Avaliar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentWorkouts.map((workout) => (
              <div
                key={workout.id}
                onClick={() => setSelectedWorkout(workout.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedWorkout === workout.id
                    ? 'border-indigo-900 bg-indigo-50'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800">{workout.name}</h3>
                    <p className="text-sm text-slate-600">
                      Realizado em {new Date(workout.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="w-4 h-4 rounded-full border-2 border-indigo-900 flex items-center justify-center">
                    {selectedWorkout === workout.id && (
                      <div className="w-2 h-2 rounded-full bg-indigo-900"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rating Section */}
      {selectedWorkout && (
        <Card className="border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Como foi o treino?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingClick(star)}
                    className={`transition-colors ${
                      star <= rating
                        ? 'text-yellow-400'
                        : 'text-slate-300 hover:text-yellow-200'
                    }`}
                  >
                    <Star className="w-8 h-8 fill-current" />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-sm text-slate-600">
                  {rating === 1 && "Muito difícil"}
                  {rating === 2 && "Difícil"}
                  {rating === 3 && "Adequado"}
                  {rating === 4 && "Bom"}
                  {rating === 5 && "Excelente"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Comentários (opcional)
              </label>
              <Textarea
                placeholder="Compartilhe sua experiência, dificuldades ou sugestões sobre o treino..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[120px] rounded-xl border-slate-200 focus:border-indigo-900 focus:ring-indigo-900"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submit Button */}
      {selectedWorkout && rating > 0 && (
        <div className="flex justify-center mb-8">
          <Button
            onClick={handleSubmitEvaluation}
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-900 to-purple-800 hover:from-indigo-800 hover:to-purple-700"
          >
            <Send className="w-4 h-4 mr-2" />
            Enviar Avaliação
          </Button>
        </div>
      )}

      {/* Feedback History */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-900" />
            Histórico de Avaliações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedbackHistory.map((item) => (
              <div key={item.id} className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-slate-800">{item.workoutName}</h4>
                    <p className="text-sm text-slate-600">
                      {new Date(item.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= item.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                      item.status === 'Respondido' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status === 'Respondido' ? <MessageSquare className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {item.status}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-700 mb-3">{item.feedback}</p>
                {item.trainerResponse && (
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-indigo-900 mb-1">Resposta do Personal:</p>
                    <p className="text-sm text-indigo-800">{item.trainerResponse}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
