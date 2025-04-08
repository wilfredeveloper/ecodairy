export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}

const CHAT_HISTORY_KEY = "ecodairy_chat_history";

export const chatHistory = {
  getSessions(): ChatSession[] {
    if (typeof window === "undefined") return [];
    const history = localStorage.getItem(CHAT_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  },

  getSession(id: string): ChatSession | null {
    const sessions = this.getSessions();
    return sessions.find(session => session.id === id) || null;
  },

  saveSession(session: ChatSession) {
    const sessions = this.getSessions();
    const existingIndex = sessions.findIndex(s => s.id === session.id);
    
    if (existingIndex >= 0) {
      sessions[existingIndex] = session;
    } else {
      sessions.push(session);
    }

    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(sessions));
  },

  deleteSession(id: string) {
    const sessions = this.getSessions().filter(session => session.id !== id);
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(sessions));
  },

  createNewSession(title: string): ChatSession {
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.saveSession(newSession);
    return newSession;
  }
}; 