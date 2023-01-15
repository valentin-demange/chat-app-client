import { createContext } from 'react';
import { Chat, User } from './customTypes';

interface ChatContext {
    currentChatId: number;
    setCurrentChatId: any;
  }

  interface UserContext {
    user: User;
    token: string;
  }

export const UserContext = createContext({} as UserContext)
export const ChatContext = createContext({} as ChatContext)
export const SocketContext = createContext({} as any)

