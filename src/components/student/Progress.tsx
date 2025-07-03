
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Calendar, Award, Target } from "lucide-react";

interface ProgressProps {
  onBack: () => void;
}

const progressData = [
  { month: "Jan", workouts: 12, completionRate: 85 },
  { month: "Fev", workouts: 16, completionRate: 90 },
  { month: "Mar", workouts: 14, completionRate: 88 },
  { month: "Abr", workouts: 18, completionRate: 95 },
];

const achievements = [
  { title: "Primeira Semana", description: "Completou 7 treinos consecutivos", date: "15/01/2024" },
  { title: "Meta Mensal", description: "Atingiu 90% de conclusão em Fevereiro", date: "28/02/2024" },
  { title: "Consistência", description: "30 dias de treino sem faltar", date: "15/03/2024" },
];

export function Progress({ onBack }: ProgressProps) {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
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
          <h1 className="text-3xl font-bold text-slate-800">Meu Progresso</h1>
          <p className="text-slate-600 mt-1">Acompanhe sua evolução nos treinos</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-indigo-900" />
            </div>
            <div className="text-3xl font-bold text-indigo-900 mb-1">60</div>
            <p className="text-sm text-slate-600">Treinos Completados</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-green-700" />
            </div>
            <div className="text-3xl font-bold text-green-700 mb-1">89%</div>
            <p className="text-sm text-slate-600">Taxa de Conclusão</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-purple-700" />
            </div>
            <div className="text-3xl font-bold text-purple-700 mb-1">120</div>
            <p className="text-sm text-slate-600">Dias Ativos</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-yellow-700" />
            </div>
            <div className="text-3xl font-bold text-yellow-700 mb-1">3</div>
            <p className="text-sm text-slate-600">Conquistas</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart */}
      <Card className="border-0 shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">Evolução Mensal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {progressData.map((month, index) => (
              <div key={month.month} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="font-semibold text-indigo-900">{month.month}</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{month.workouts} treinos</p>
                    <p className="text-sm text-slate-600">{month.completionRate}% de conclusão</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-slate-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-indigo-900 to-purple-800 h-3 rounded-full"
                      style={{ width: `${month.completionRate}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-slate-700">{month.completionRate}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-slate-800">Conquistas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Award className="w-6 h-6 text-yellow-700" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800">{achievement.title}</h3>
                  <p className="text-sm text-slate-600">{achievement.description}</p>
                </div>
                <div className="text-sm text-slate-500">{achievement.date}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
