
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User } from "lucide-react";

interface UserProfileProps {
  user: any;
  onBack: () => void;
}

export function UserProfile({ user, onBack }: UserProfileProps) {
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mr-4"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-2xl font-bold text-slate-800">Perfil</h1>
      </div>
      
      <Card className="max-w-md mx-auto border-0 shadow-xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-900 to-purple-800 mx-auto mb-4 flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800">
            {user.name}
          </CardTitle>
          <CardDescription className="text-slate-600">
            {user.email}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-slate-50 rounded-xl p-4">
            <h3 className="font-semibold text-slate-800 mb-2">Tipo de Usuário</h3>
            <p className="text-slate-600">{user.type === 'trainer' ? 'Personal Trainer' : 'Aluno'}</p>
          </div>

          {user.type !== 'trainer' && (
            <div className="bg-slate-50 rounded-xl p-4">
              <h3 className="font-semibold text-slate-800 mb-2">Personal Trainer</h3>
              <p className="text-slate-600">{user.personalTrainer || 'Não atribuído'}</p>
            </div>
          )}

          <div className="space-y-3 pt-4">
            <Button 
              variant="outline" 
              className="w-full rounded-xl border-slate-200 hover:bg-slate-50"
            >
              Editar Perfil
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
