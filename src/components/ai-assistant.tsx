"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BrainCircuit, MessageSquare, History, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useUserStore } from "@/providers/user-store-provider";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { chatHistory, type ChatSession, type Message } from "@/lib/chat-history";

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isInitialState, setIsInitialState] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    // Load chat sessions
    const loadedSessions = chatHistory.getSessions();
    setSessions(loadedSessions);
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Create new session if none exists
    if (!currentSession) {
      const newSession = chatHistory.createNewSession(input.slice(0, 30) + "...");
      setCurrentSession(newSession);
      setSessions(prev => [...prev, newSession]);
    }

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setIsInitialState(false);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          userId: user?.id,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch response");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      let assistantMessage = "";
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        assistantMessage += chunk;
        
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          
          if (lastMessage?.role === "assistant") {
            lastMessage.content = assistantMessage;
          } else {
            newMessages.push({
              role: "assistant",
              content: assistantMessage,
              timestamp: new Date().toISOString(),
            });
          }
          
          return newMessages;
        });
      }

      // Update chat history
      if (currentSession) {
        const updatedSession: ChatSession = {
          ...currentSession,
          messages: [...messages, userMessage, {
            role: "assistant",
            content: assistantMessage,
            timestamp: new Date().toISOString(),
          }],
          updatedAt: new Date().toISOString(),
        };
        chatHistory.saveSession(updatedSession);
        setCurrentSession(updatedSession);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    setCurrentSession(null);
    setMessages([]);
    setIsInitialState(true);
  };

  const loadSession = (session: ChatSession) => {
    setCurrentSession(session);
    setMessages(session.messages);
    setIsInitialState(false);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute left-4 top-4 z-10 p-2 rounded-full bg-background border shadow-sm hover:bg-accent"
      >
        {isSidebarOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={` border-r bg-background transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Chat History</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={startNewChat}
              className="h-8 w-8"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2">
            {sessions.map((session) => (
              <Button
                key={session.id}
                variant={currentSession?.id === session.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => loadSession(session)}
              >
                <History className="h-4 w-4 mr-2" />
                <span className="truncate">{session.title}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* ${
        isSidebarOpen ? "ml-32" : "ml-0"
      } */}
      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300`}>
        <Card className="flex-1 flex flex-col m-4 w-full shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="h-6 w-6" />
              <span>AI Farming Assistant</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4 p-4">
              {isInitialState ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-8 px-4 md:px-8 lg:px-16 max-w-4xl mx-auto w-full">
                  <div className="flex flex-col items-center space-y-6">
                    <BrainCircuit className="h-24 w-24 text-primary" />
                    <h2 className="text-4xl font-bold tracking-tight">Welcome to EcoDairy AI Assistant</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                      Ask me anything about your dairy farm, from cow health to milk production optimization.
                      I'm here to help you make informed decisions for your farm.
                    </p>
                  </div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg prose prose-sm ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: ({ node, ...props }) => (
                              <h1 className="text-xl font-bold mt-4 mb-2" {...props} />
                            ),
                            h2: ({ node, ...props }) => (
                              <h2 className="text-lg font-bold mt-3 mb-2" {...props} />
                            ),
                            h3: ({ node, ...props }) => (
                              <h3 className="text-base font-bold mt-2 mb-1" {...props} />
                            ),
                            p: ({ node, ...props }) => (
                              <p className="mb-2" {...props} />
                            ),
                            ul: ({ node, ...props }) => (
                              <ul className="list-disc pl-4 mb-2" {...props} />
                            ),
                            ol: ({ node, ...props }) => (
                              <ol className="list-decimal pl-4 mb-2" {...props} />
                            ),
                            li: ({ node, ...props }) => (
                              <li className="mb-1" {...props} />
                            ),
                            strong: ({ node, ...props }) => (
                              <strong className="font-bold" {...props} />
                            ),
                            em: ({ node, ...props }) => (
                              <em className="italic" {...props} />
                            ),
                            code: ({ node, ...props }) => (
                              <code className="bg-gray-100 rounded px-1 py-0.5" {...props} />
                            ),
                            pre: ({ node, ...props }) => (
                              <pre className="bg-gray-100 rounded p-2 overflow-x-auto" {...props} />
                            ),
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      ) : (
                        message.content
                      )}
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-lg flex items-center space-x-2">
                    <span className="flex space-x-1">
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your cows, farming practices, or market information..."
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Send
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 