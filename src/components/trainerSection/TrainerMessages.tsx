
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ArrowLeft, Send, Search, MessageCircle, User, MoreVertical } from "lucide-react";

interface TrainerMessagesProps {
  onBack: () => void;
}

const mockConversations = [
  {
    id: 1,
    student: "João Silva",
    avatar: "JS",
    lastMessage: "Obrigado pelo treino de hoje!",
    timestamp: "Há 2 horas",
    unread: 2,
    messages: [
      { id: 1, sender: "student", content: "Olá! Tenho uma dúvida sobre o treino de hoje.", timestamp: "14:30" },
      { id: 2, sender: "trainer", content: "Oi João! Claro, qual é sua dúvida?", timestamp: "14:32" },
      { id: 3, sender: "student", content: "No supino, devo manter os pés no chão?", timestamp: "14:35" },
      { id: 4, sender: "trainer", content: "Sim, mantenha os pés bem apoiados no chão para mais estabilidade.", timestamp: "14:37" },
      { id: 5, sender: "student", content: "Obrigado pelo treino de hoje!", timestamp: "16:20" }
    ]
  },
  {
    id: 2,
    student: "Maria Santos",
    avatar: "MS",
    lastMessage: "Consegui fazer todas as séries!",
    timestamp: "Ontem",
    unread: 0,
    messages: [
      { id: 1, sender: "student", content: "Bom dia! Como está?", timestamp: "09:15" },
      { id: 2, sender: "trainer", content: "Bom dia Maria! Tudo bem, e você?", timestamp: "09:20" },
      { id: 3, sender: "student", content: "Consegui fazer todas as séries!", timestamp: "10:30" }
    ]
  },
  {
    id: 3,
    student: "Pedro Oliveira",
    avatar: "PO",
    lastMessage: "Podemos ajustar o treino de pernas?",
    timestamp: "Há 2 dias",
    unread: 1,
    messages: [
      { id: 1, sender: "student", content: "Podemos ajustar o treino de pernas?", timestamp: "15:45" }
    ]
  }
];

export function TrainerMessages({ onBack }: TrainerMessagesProps) {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null); // Inicia sem conversa selecionada
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConversations = mockConversations.filter(conv =>
    conv.student.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // Aqui seria enviada a mensagem
    setNewMessage("");
  };

  const selectedConv = mockConversations.find(conv => conv.id === selectedConversation);

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="mr-2 md:mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Mensagens</h1>
            <p className="text-sm text-muted-foreground">Converse com seus alunos</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="hidden md:flex">
          <User className="w-4 h-4 mr-2" />
          Novo Aluno
        </Button>
      </div>

      <div className="flex h-[calc(100vh-160px)] w-full overflow-hidden">
        {/* Lista de Alunos */}
        <div className="w-full lg:w-1/4 flex flex-col border-r">
          <div className="p-3 border-b sticky top-0 bg-background z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar alunos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 rounded-lg w-full"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={cn(
                  "w-full p-3 cursor-pointer transition-colors hover:bg-accent/50 flex items-center border-b",
                  selectedConversation === conversation.id && "bg-accent"
                )}
              >
                <Avatar className="h-10 w-10 border-2 border-background flex-shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
                    {conversation.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex justify-between items-center w-full">
                    <p className="font-medium text-sm truncate pr-2">
                      {conversation.student}
                    </p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {conversation.timestamp}
                    </span>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-sm text-muted-foreground truncate pr-2">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unread > 0 && (
                      <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs flex-shrink-0">
                        {conversation.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Área de Conversa */}
        <div className="hidden lg:flex lg:flex-1 flex-col">
          {selectedConv ? (
            <Card className="border-0 shadow-sm flex flex-col h-full">
              <CardHeader className="border-b p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <Avatar className="h-10 w-10 border-2 border-background">
                      <AvatarFallback className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
                        {selectedConv.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{selectedConv.student}</CardTitle>
                      <CardDescription className="text-sm">
                        <span className="flex items-center text-green-500">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                          Online
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <ScrollArea className="flex-1 p-3 sm:p-4">
                <div className="space-y-4">
                  {selectedConv.messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        "flex",
                        message.sender === 'trainer' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          "max-w-xs lg:max-w-md px-4 py-2 rounded-2xl",
                          message.sender === 'trainer'
                            ? 'bg-primary text-primary-foreground rounded-tr-none'
                            : 'bg-muted rounded-tl-none'
                        )}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={cn(
                          "text-xs mt-1 text-right",
                          message.sender === 'trainer' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        )}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 h-10 rounded-lg"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    className="h-10 w-10 rounded-lg"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="lg:col-span-3 border-0 shadow-sm h-full flex flex-col items-center justify-center">
              <div className="text-center p-8">
                <MessageCircle className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma conversa selecionada</h3>
                <p className="text-muted-foreground">Selecione um aluno para começar a conversar</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
