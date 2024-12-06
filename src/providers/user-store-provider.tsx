// src/providers/user-store-provider.tsx
'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'
import { type UserStore, createUserStore, defaultUserState } from '@/stores/user-store'

export type UserStoreApi = ReturnType<typeof createUserStore>

const UserStoreContext = createContext<UserStoreApi | undefined>(undefined);

interface UserStoreProviderProps {
  children: ReactNode;
}

export const UserStoreProvider = ({ children }: UserStoreProviderProps) => {
  const storeRef = useRef<UserStoreApi>();

  if (!storeRef.current) {
    storeRef.current = createUserStore(defaultUserState);
  }

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  );
}

export const useUserStore = <T,>(selector: (state: UserStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext);

  if (!userStoreContext) {
    throw new Error('useUserStore must be used within a UserStoreProvider');
  }

  return useStore(userStoreContext, selector);
};
