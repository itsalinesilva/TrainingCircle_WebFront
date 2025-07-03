
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, User, Video, Phone } from "lucide-react";

interface MessagesProps {
  user: any;
  onBack: () => void;
}

const mockMessages = [
  {
    id: 1,
    sender: "trainer",
    senderName: "Maria Santos",
    message: "Olá João! Como foi o treino de hoje?",
    timestamp: "2024-01-15 10:30",
    isRead: true
  },
  {
    id: 2,
    sender: "student",
    senderName: "João Silva",
    message: "Oi Maria! Foi muito bom, consegui completar todos os exercícios!",
    timestamp: "2024-01-15 11:15",
    isRead: true
  },
  {
    id: 3,
    sender: "trainer",
    senderName: "Maria Santos",
    message: "Excelente! Vou ajustar o peso do agachamento na próxima semana. Continue assim!",
    timestamp: "2024-01-15 14:20",
    isRead: true
  },
  {
    id: 4,
    sender: "student",
    senderName: "João Silva",
    message: "Perfeito! Obrigado pelo acompanhamento constante.",
    timestamp: "2024-01-15 15:45",
    isRead: true
  }
];

export function Messages({ user, onBack }: MessagesProps) {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Aqui seria enviada a mensagem para o backend
      console.log("Enviando mensagem:", newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVideoCall = () => {
    console.log("Iniciando chamada de vídeo...");
    // Aqui seria implementada a funcionalidade de chamada de vídeo
  };

  const handleAudioCall = () => {
    console.log("Iniciando chamada de áudio...");
    // Aqui seria implementada a funcionalidade de chamada de áudio
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
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
          <h1 className="text-3xl font-bold text-slate-800">Mensagens</h1>
          <p className="text-slate-600 mt-1">Conversa com seu personal trainer</p>
        </div>
      </div>

      {/* Chat Container */}
      <Card className="border-0 shadow-lg h-[600px] flex flex-col">
        <CardHeader className="border-b border-slate-200 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <User className="w-5 h-5 text-indigo-900" />
              </div>
              <div>
                <CardTitle className="text-lg">{user.personalTrainer}</CardTitle>
                <p className="text-sm text-slate-600">Personal Trainer</p>
              </div>
            </div>
            
            {/* Call Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleAudioCall}
                className="rounded-xl border-slate-300 hover:bg-slate-50"
              >
                <Phone className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleVideoCall}
                className="rounded-xl border-slate-300 hover:bg-slate-50"
              >
                <Video className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Messages Area */}
        <CardContent className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-4">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'student' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.sender === 'student'
                      ? 'bg-gradient-to-r from-indigo-900 to-purple-800 text-white'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'student' ? 'text-indigo-100' : 'text-slate-500'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString('pt-BR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>

        {/* Message Input */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex gap-3">
            <Input
              placeholder="Digite sua mensagem..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 rounded-xl border-slate-200 focus:border-indigo-900 focus:ring-indigo-900"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-900 to-purple-800 hover:from-indigo-800 hover:to-purple-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
