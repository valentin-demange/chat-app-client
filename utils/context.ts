import { User } from 'firebase/auth';
import { createContext } from 'react';

export const CurrentUserContext = createContext({} as User)
export const CurrentChatContext = createContext("")
export const SetCurrentChatContext = createContext({} as React.Dispatch<React.SetStateAction<string>>)

