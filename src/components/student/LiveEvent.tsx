
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Video,
  VideoOff,
  Mic,
  MicOff,
  Send,
  Eye,
  Square,
  Play,
  Smile,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LiveEventProps {
  onBack: () => void;
}

const mockMessages = [
  { id: 1, user: "João Silva", message: "Ótima aula! 💪", timestamp: "14:30" },
  { id: 2, user: "Maria Fernanda", message: "Estou adorando!", timestamp: "14:31" },
  { id: 3, user: "Carlos Santos", message: "Quando vai ser o próximo?", timestamp: "14:32" },
];

const emojis = ["👍", "💪", "🔥", "❤️", "😄", "👏", "💯", "⚡"];

function LiveEvent({ onBack }: LiveEventProps) {
  const [isLive, setIsLive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [countdown, setCountdown] = useState(180); // 3 minutos em segundos
  const [participants, setParticipants] = useState(148);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const [showEmojis, setShowEmojis] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!isLive && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setIsLive(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isLive, countdown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        user: "Você",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojis(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? "Microfone ativado" : "Microfone desativado",
      variant: "default",
    });
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    toast({
      title: isCameraOn ? "Câmera desativada" : "Câmera ativada",
      variant: "default",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="bg-indigo-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-indigo-800"
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Evento ao Vivo</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            <span className="text-sm">Ao Vivo</span>
          </div>
          <div className="flex items-center space-x-1 text-sm">
            <Eye className="h-4 w-4" />
            <span>{participants}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-gray-50">
        {/* Video Area */}
        <div className="flex-1 flex flex-col min-h-0 p-2 md:p-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
            {/* Video Placeholder */}
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              {!isLive ? (
                <div className="text-center p-6">
                  <div className="text-4xl font-bold text-indigo-900 mb-3">
                    {formatTime(countdown)}
                  </div>
                  <p className="text-gray-600">O evento começará em breve</p>
                </div>
              ) : (
                <div className="text-center p-6">
                  <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">🏋️</span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">Aula de Treinamento</h2>
                  <p className="text-gray-500 text-sm">Com Personal Trainer</p>
                </div>
              )}
            </div>
            
            {/* Player Controls */}
            <div className="border-t border-gray-100 p-2 bg-gray-50">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-gray-600 hover:bg-gray-100"
                    onClick={toggleMute}
                  >
                    {isMuted ? (
                      <MicOff className="h-4 w-4" />
                    ) : (
                      <Mic className="h-4 w-4" />
                    )}
                  </Button>
                  <div className="h-1 w-24 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 w-3/4"></div>
                  </div>
                  <span className="text-xs text-gray-500">75%</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-gray-600 hover:bg-gray-100"
                    title="Configurações"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col bg-white h-[400px] md:h-auto">
          <div className="p-3 border-b border-gray-200">
            <h3 className="font-medium text-gray-900 text-sm">Chat ao Vivo</h3>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`p-3 rounded-lg ${msg.user === "Você" ? 'bg-indigo-50 ml-6' : 'bg-gray-50'}`}
              >
                <div className="flex justify-between text-xs text-gray-500">
                  <span className={`font-medium ${msg.user === "Você" ? 'text-indigo-900' : 'text-gray-700'}`}>
                    {msg.user}
                  </span>
                  <span>{msg.timestamp}</span>
                </div>
                <p className="mt-1 text-sm text-gray-800">{msg.message}</p>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-2 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-1">
              <Input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Enviar mensagem..."
                className="flex-1 bg-white"
                onKeyDown={handleKeyPress}
              />
              <Button 
                size="icon" 
                variant="ghost" 
                className="text-gray-500 hover:text-indigo-600"
                onClick={handleSendMessage}
              >
                <Send className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                className="text-gray-500 hover:text-indigo-600"
                onClick={() => setShowEmojis(!showEmojis)}
              >
                <Smile className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Emoji Picker */}
            {showEmojis && (
              <div className="mt-2 p-2 bg-white border border-gray-200 rounded-md grid grid-cols-8 gap-1">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    className="text-xl hover:bg-gray-100 rounded p-1"
                    onClick={() => handleEmojiClick(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveEvent;
