
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
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
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

      <div className="flex flex-col lg:flex-row h-[calc(100vh-180px)] gap-4">
        {/* Lista de Alunos */}
        <Card className={cn(
          "lg:w-1/3 xl:w-1/4 border-0 lg:border-r rounded-none shadow-sm overflow-hidden flex flex-col h-full",
          selectedConversation && "hidden lg:flex"
        )}>
          <CardHeader className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar alunos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-10 rounded-lg"
              />
            </div>
          </CardHeader>
          <ScrollArea className="flex-1">
            <div className="divide-y">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={cn(
                    "px-4 py-3 cursor-pointer transition-colors hover:bg-accent/50",
                    selectedConversation === conversation.id && "bg-accent"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarFallback className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
                        {conversation.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate pr-2">{conversation.student}</p>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {conversation.timestamp}
                          </span>
                          {conversation.unread > 0 && (
                            <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs flex-shrink-0">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-0.5">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Área de Conversa */}
        <div className={cn(
          "flex-1 h-full flex flex-col",
          !selectedConversation && "hidden lg:flex"
        )}>
          {selectedConv ? (
            <Card className="border-0 shadow-sm h-full flex flex-col">
              <CardHeader className="border-b py-3 px-4 bg-muted/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="lg:hidden mr-1"
                      onClick={() => setSelectedConversation(null)}
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
                        {selectedConv.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{selectedConv.student}</CardTitle>
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
              
              <div className="flex-1 overflow-auto p-4">
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
                        <p className="text-xs opacity-80 mt-1 text-right">
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t p-3 bg-background">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Digite uma mensagem..."
                    className="flex-1 rounded-full border-gray-200 focus-visible:ring-1 focus-visible:ring-ring"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button
                    size="icon"
                    className="rounded-full h-10 w-10 bg-primary hover:bg-primary/90"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <MessageCircle className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhuma conversa selecionada</h3>
              <p className="text-sm text-muted-foreground">
                Selecione uma conversa para começar a enviar mensagens
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
