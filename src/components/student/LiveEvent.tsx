
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Users, Smile } from "lucide-react";

interface LiveEventProps {
  onBack: () => void;
}

const mockMessages = [
  { id: 1, user: "João Silva", message: "Ótima aula! 💪", timestamp: "14:30" },
  { id: 2, user: "Maria Fernanda", message: "Estou adorando!", timestamp: "14:31" },
  { id: 3, user: "Carlos Santos", message: "Quando vai ser o próximo?", timestamp: "14:32" },
];

const emojis = ["👍", "💪", "🔥", "❤️", "😄", "👏", "💯", "⚡"];

export default function LiveEvent({ onBack }: LiveEventProps) {
  const [isLive, setIsLive] = useState(false);
  const [countdown, setCountdown] = useState(180); // 3 minutos em segundos
  const [participants, setParticipants] = useState(148);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const [showEmojis, setShowEmojis] = useState(false);

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
      const message = {
        id: messages.length + 1,
        user: "Você",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleEmojiClick = (emoji: string) => {
    const message = {
      id: messages.length + 1,
      user: "Você",
      message: emoji,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, message]);
    setShowEmojis(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/80 backdrop-blur-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        
        <div className="flex items-center gap-4">
          {/* Participants Counter */}
          <div className="flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full">
            <Users className="w-4 h-4" />
            <span className="text-sm">{participants} assistindo</span>
          </div>
          
          {/* Live/Countdown Indicator */}
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            isLive 
              ? 'bg-red-600 animate-pulse' 
              : 'bg-indigo-900'
          }`}>
            {isLive ? "🔴 AO VIVO" : `Início em: ${formatTime(countdown)}`}
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Video Area */}
        <div className="flex-1 relative">
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
            {isLive ? (
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-900 to-purple-800 mx-auto mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-white rounded-full animate-pulse"></div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Transmissão Ao Vivo</h2>
                <p className="text-slate-300">Treino Funcional com Maria Santos</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-slate-700 mx-auto mb-4 flex items-center justify-center">
                  <div className="text-4xl font-bold">{formatTime(countdown)}</div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Evento Iniciando Em Breve</h2>
                <p className="text-slate-300">Prepare-se para o treino!</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Sidebar */}
        <Card className="w-80 bg-slate-900 border-l border-slate-700 rounded-none flex flex-col">
          <CardContent className="flex-1 p-0 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-700">
              <h3 className="font-semibold text-white">Chat do Evento</h3>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className="text-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-indigo-300">{msg.user}</span>
                    <span className="text-xs text-slate-400">{msg.timestamp}</span>
                  </div>
                  <p className="text-slate-200">{msg.message}</p>
                </div>
              ))}
            </div>

            {/* Emoji Selector */}
            {showEmojis && (
              <div className="p-4 border-t border-slate-700">
                <div className="grid grid-cols-4 gap-2">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => handleEmojiClick(emoji)}
                      className="text-2xl p-2 hover:bg-slate-700 rounded transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message Input */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex gap-2">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:border-indigo-500"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEmojis(!showEmojis)}
                  className="text-white hover:bg-slate-700"
                >
                  <Smile className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  size="sm"
                  className="bg-indigo-900 hover:bg-indigo-800"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


