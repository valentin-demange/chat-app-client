import { createContext } from 'react';
import { Chat, User } from './customTypes';

interface ChatContext {
    currentChatId: number;
    setCurrentChatId: any;
  }

  interface LoginContext {
    user: User;
    token: string;
  }

export const LoginContext = createContext({} as LoginContext)
export const ChatContext = createContext({} as ChatContext)
export const SocketContext = createContext({} as any)

