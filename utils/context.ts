import { createContext } from 'react';

export const CurrentUserContext = createContext({} as any)
export const CurrentChatContext = createContext("")
export const SetCurrentChatContext = createContext({} as React.Dispatch<React.SetStateAction<string>>)

