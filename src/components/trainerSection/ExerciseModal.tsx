
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Exercise {
  id?: number;
  name: string;
  category: string;
  muscleGroup: string;
  equipment: string;
  difficulty: string;
  description: string;
  videoUrl: string;
}

interface ExerciseModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercise?: Exercise;
  onSave: (exercise: Exercise) => void;
}

const categories = ["Peito", "Pernas", "Braços", "Core", "Cardio", "Costas", "Ombros"];
const difficulties = ["Iniciante", "Intermediário", "Avançado"];
const equipments = ["Peso Corporal", "Halter", "Barra", "Máquina", "Elástico", "Kettlebell"];

export function ExerciseModal({ isOpen, onClose, exercise, onSave }: ExerciseModalProps) {
  const [formData, setFormData] = useState<Exercise>({
    name: exercise?.name || "",
    category: exercise?.category || "",
    muscleGroup: exercise?.muscleGroup || "",
    equipment: exercise?.equipment || "",
    difficulty: exercise?.difficulty || "",
    description: exercise?.description || "",
    videoUrl: exercise?.videoUrl || "",
    ...exercise
  });
  const { toast } = useToast();

  const handleInputChange = (field: keyof Exercise, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.category || !formData.difficulty) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha pelo menos o nome, categoria e dificuldade do exercício.",
        variant: "destructive",
      });
      return;
    }

    onSave(formData);
    
    toast({
      title: exercise ? "Exercício atualizado!" : "Exercício criado!",
      description: `${formData.name} foi ${exercise ? "atualizado" : "adicionado"} à biblioteca.`,
    });

    onClose();
  };

  const handleClose = () => {
    setFormData({
      name: "",
      category: "",
      muscleGroup: "",
      equipment: "",
      difficulty: "",
      description: "",
      videoUrl: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-slate-800">
            {exercise ? "Editar Exercício" : "Novo Exercício"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                Nome do Exercício *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Ex: Supino Reto"
                className="rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="muscleGroup" className="text-sm font-medium text-slate-700">
                Grupo Muscular
              </Label>
              <Input
                id="muscleGroup"
                value={formData.muscleGroup}
                onChange={(e) => handleInputChange("muscleGroup", e.target.value)}
                placeholder="Ex: Peitoral"
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Categoria *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Equipamento</Label>
              <Select value={formData.equipment} onValueChange={(value) => handleInputChange("equipment", value)}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {equipments.map((equipment) => (
                    <SelectItem key={equipment} value={equipment}>
                      {equipment}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700">Dificuldade *</Label>
              <Select value={formData.difficulty} onValueChange={(value) => handleInputChange("difficulty", value)}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-slate-700">
              Descrição
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Descreva como executar o exercício..."
              className="rounded-xl min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="videoUrl" className="text-sm font-medium text-slate-700">
              URL do Vídeo Demonstrativo
            </Label>
            <Input
              id="videoUrl"
              value={formData.videoUrl}
              onChange={(e) => handleInputChange("videoUrl", e.target.value)}
              placeholder="https://..."
              className="rounded-xl"
            />
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button variant="outline" onClick={handleClose} className="rounded-xl">
              Cancelar
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-indigo-900 hover:bg-indigo-800 rounded-xl"
            >
              {exercise ? "Atualizar" : "Criar"} Exercício
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
