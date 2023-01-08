export interface Message {
    chatId: number;
    createdAt: string;
    id: number;
    message: string;
    userId: number;
  }

  export interface Chat {
    id: number;
    name: string;
    type: string;
  }

  export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }