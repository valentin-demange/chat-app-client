import { createContext } from 'react';
import { Chat, User } from './customTypes';

interface ChatContext {
    currentChat: Chat;
    setCurrentChat: any;
  }

export const UserContext = createContext({} as User)
export const ChatContext = createContext({} as ChatContext)
export const SocketContext = createContext({} as any)

