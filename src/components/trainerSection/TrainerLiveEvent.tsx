
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff,
  Users,
  MessageCircle,
  Send,
  Eye,
  Clock,
  Calendar,
  Settings,
  Play,
  Square
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TrainerLiveEventProps {
  onBack: () => void;
  user: any; // Consider replacing 'any' with a proper type
  onViewChange: (view: string, data?: any) => void;
}

interface Viewer {
  id: number;
  name: string;
  joinTime: string;
}

interface ChatMessage {
  id: number;
  userName: string;
  message: string;
  time: string;
}

const mockViewers: Viewer[] = [
  { id: 1, name: "Ana Silva", joinTime: "19:30" },
  { id: 2, name: "Carlos Santos", joinTime: "19:32" },
  { id: 3, name: "Mariana Costa", joinTime: "19:35" },
];

const mockMessages: ChatMessage[] = [
  { id: 1, userName: "Ana Silva", message: "Boa noite, pessoal!", time: "19:30" },
  { id: 2, userName: "Carlos Santos", message: "Vamos começar o treino!", time: "19:32" },
  { id: 3, userName: "Mariana Costa", message: "Estou animada para a aula de hoje", time: "19:35" },
];

export function TrainerLiveEvent({ onBack }: TrainerLiveEventProps) {
  const [isLive, setIsLive] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [viewers] = useState<Viewer[]>(mockViewers);
  const [messages] = useState<ChatMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [startTime] = useState("19:30");
  const { toast } = useToast();

  const handleStartLive = () => {
    if (!eventTitle.trim()) {
      toast({
        title: "Título obrigatório",
        description: "Digite um título para o evento ao vivo.",
        variant: "destructive",
      });
      return;
    }

    setIsLive(true);
    toast({
      title: "Transmissão iniciada!",
      description: `Evento "${eventTitle}" está ao vivo.`,
    });
  };

  const handleStopLive = () => {
    setIsLive(false);
    toast({
      title: "Transmissão encerrada",
      description: "O evento foi finalizado com sucesso.",
      className: "bg-indigo-900 text-white"
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Aqui seria implementada a lógica de envio de mensagem
    toast({
      title: "Mensagem enviada",
      description: "Sua mensagem foi enviada para todos os participantes.",
      className: "bg-indigo-900 text-white"
    });
    setNewMessage("");
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl mr-3"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">Transmissão ao Vivo</h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-1">Gerencie seus eventos ao vivo com os alunos</p>
          </div>
        </div>
        {isLive && (
          <Badge className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-100 border-indigo-200 dark:border-indigo-800">
            <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full mr-2 animate-pulse"></div>
            AO VIVO
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Live Stream Setup */}
          {!isLive ? (
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader className="border-b border-slate-100 dark:border-slate-700">
                <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-white">
                  <Video className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  Configurar Transmissão
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Título do Evento *
                  </label>
                  <Input
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="Ex: Treino de Força - Membros Superiores"
                    className="rounded-xl border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Descrição
                  </label>
                  <Textarea
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    placeholder="Descreva o que será abordado no treino..."
                    className="rounded-xl border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setVideoEnabled(!videoEnabled)}
                    className={`rounded-xl ${!videoEnabled ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300' : 'dark:border-slate-600 dark:text-slate-300'}`}
                  >
                    {videoEnabled ? <Video className="w-4 h-4 mr-2" /> : <VideoOff className="w-4 h-4 mr-2" />}
                    {videoEnabled ? "Câmera On" : "Câmera Off"}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setAudioEnabled(!audioEnabled)}
                    className={`rounded-xl ${!audioEnabled ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300' : 'dark:border-slate-600 dark:text-slate-300'}`}
                  >
                    {audioEnabled ? <Mic className="w-4 h-4 mr-2" /> : <MicOff className="w-4 h-4 mr-2" />}
                    {audioEnabled ? "Microfone On" : "Microfone Off"}
                  </Button>
                </div>

                <Button 
                  onClick={handleStartLive}
                  className="w-full bg-gradient-to-r from-indigo-900 to-purple-900 hover:from-indigo-800 hover:to-purple-800 rounded-xl text-white"
                  size="lg"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Iniciar Transmissão
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader className="border-b border-slate-100 dark:border-slate-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-white">
                    <div className="w-3 h-3 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-pulse"></div>
                    {eventTitle}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <Clock className="w-4 h-4" />
                    Iniciado às {startTime}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-slate-900 dark:bg-slate-900/80 rounded-xl flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-700">
                  <div className="text-center text-white p-4">
                    <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Transmissão Ativa</p>
                    <p className="text-sm opacity-75">Sua transmissão está sendo enviada aos alunos</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setVideoEnabled(!videoEnabled)}
                      className={`rounded-xl ${!videoEnabled ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300' : 'dark:border-slate-600 dark:text-slate-300'}`}
                    >
                      {videoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAudioEnabled(!audioEnabled)}
                      className={`rounded-xl ${!audioEnabled ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300' : 'dark:border-slate-600 dark:text-slate-300'}`}
                    >
                      {audioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-xl dark:border-slate-600 dark:text-slate-300"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={handleStopLive}
                    className="rounded-xl bg-gradient-to-r from-indigo-900 to-purple-900 hover:from-indigo-800 hover:to-purple-800 text-white mt-2 sm:mt-0 w-full sm:w-auto"
                  >
                    <Square className="w-4 h-4 mr-2" />
                    Finalizar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Event Info */}
          {eventDescription && (
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
              <CardHeader className="border-b border-slate-100 dark:border-slate-700">
                <CardTitle className="text-slate-800 dark:text-white">Sobre o Evento</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-slate-700 dark:text-slate-300">{eventDescription}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Viewers */}
          <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
            <CardHeader className="border-b border-slate-100 dark:border-slate-700">
              <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-white">
                <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Participantes ({viewers.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {viewers.map((viewer) => (
                  <div key={viewer.id} className="flex items-center gap-3">
                    <Avatar className="w-9 h-9">
                      <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-900 dark:text-indigo-200 text-xs font-medium">
                        {viewer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-slate-800 dark:text-slate-100 truncate">{viewer.name}</p>
                      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        <Eye className="w-3 h-3" />
                        Entrou às {viewer.joinTime}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat */}
          <Card className="border border-slate-200 dark:border-slate-700 shadow-sm">
            <CardHeader className="border-b border-slate-100 dark:border-slate-700">
              <CardTitle className="flex items-center gap-2 text-slate-800 dark:text-white">
                <MessageCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Chat ao Vivo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {messages.map((msg) => (
                  <div key={msg.id} className="text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-slate-800 dark:text-slate-100">{msg.userName}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{msg.time}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 pl-2 border-l-2 border-slate-200 dark:border-slate-600">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="rounded-xl text-sm border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white focus:border-indigo-500 focus:ring-indigo-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button 
                  size="sm" 
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-indigo-900 to-purple-900 hover:from-indigo-800 hover:to-purple-800 rounded-xl text-white shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
