
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Users, 
  Search, 
  Mail, 
  Calendar,
  TrendingUp,
  Plus,
  MoreVertical
} from "lucide-react";

interface AllStudentsProps {
  onBack: () => void;
  onViewChange: (view: string, student?: any) => void;
}

const mockStudents = [
  {
    id: 1,
    name: "João Silva",
    email: "joao@example.com",
    joinDate: "2024-01-15",
    status: "Ativo",
    workoutsCompleted: 23,
    lastActivity: "Hoje",
    avatar: "JS"
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@example.com",
    joinDate: "2024-01-10",
    status: "Ativo",
    workoutsCompleted: 18,
    lastActivity: "Ontem",
    avatar: "MS"
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    email: "pedro@example.com",
    joinDate: "2024-01-20",
    status: "Inativo",
    workoutsCompleted: 5,
    lastActivity: "Há 3 dias",
    avatar: "PO"
  },
  {
    id: 4,
    name: "Ana Costa",
    email: "ana@example.com",
    joinDate: "2024-01-25",
    status: "Ativo",
    workoutsCompleted: 12,
    lastActivity: "Hoje",
    avatar: "AC"
  }
];

export function AllStudents({ onBack, onViewChange }: AllStudentsProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Ativo</Badge>;
      case "Inativo":
        return <Badge variant="secondary">Inativo</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
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
          <h1 className="text-3xl font-bold text-slate-800">Meus Alunos</h1>
          <p className="text-slate-600 mt-1">Gerencie todos os seus alunos</p>
        </div>
        <div className="relative group">
          <Button
            onClick={() => onViewChange("add-student")}
            variant="ghost"
            size="icon"
            className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-900 to-purple-800 hover:from-indigo-800 hover:to-purple-700 text-white"
            aria-label="Adicionar Novo Aluno"
          >
            <div className="relative">
              <Users className="w-5 h-5" />
              <Plus className="absolute -top-1 -right-2 w-3 h-3 text-white" />
            </div>
          </Button>
          <div className="absolute right-0 mt-1 w-40 bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Adicionar Novo Aluno
          </div>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar alunos..."
              className="pl-10 rounded-xl border-slate-200"
            />
          </div>
        </div>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-indigo-900" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total de Alunos</p>
                <p className="text-2xl font-bold text-slate-800">{mockStudents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockStudents.map((student) => (
          <Card key={student.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-900 to-purple-800 flex items-center justify-center">
                    <span className="text-white font-bold">{student.avatar}</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                    <p className="text-sm text-slate-600">{student.email}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Status</span>
                {getStatusBadge(student.status)}
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Treinos Concluídos</span>
                <span className="font-semibold text-slate-800">{student.workoutsCompleted}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Última Atividade</span>
                <span className="text-sm text-slate-800">{student.lastActivity}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Início</span>
                <span className="text-sm text-slate-800">
                  {new Date(student.joinDate).toLocaleDateString('pt-BR')}
                </span>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 rounded-xl"
                  onClick={() => onViewChange("student-profile", student)}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Ver Perfil
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 rounded-xl"
                  onClick={() => onViewChange("trainer-messages", student)}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Mensagem
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
