// ZaymaContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Transaction = {
  id: string;
  title: string;
  amount: number;
};

type AuthContextType = {
  user: string | null;
  login: (password: string) => boolean;
  signup: (email: string, password: string) => void;
  logout: () => void;
  balance: number;
  transactions: Transaction[];
  sendMoney: (amount: number, to: string) => void;
  withdrawMoney: (amount: number) => void;
};

const ZaymaContext = createContext<AuthContextType | undefined>(undefined);

export const ZaymaProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [emailStore, setEmailStore] = useState('');
  const [passwordStore, setPasswordStore] = useState('');
  const [balance, setBalance] = useState(5000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const signup = (email: string, password: string) => {
    setEmailStore(email);
    setPasswordStore(password);
    setUser(email);
  };

  const login = ( password: string) => {
    const match = password === passwordStore;
    if (match) setUser(emailStore);
    return match;
  };

  const logout = () => {
    setUser(null);
  };

  const sendMoney = (amount: number, to: string) => {
    setBalance(prev => prev - amount);
    setTransactions(prev => [
      { id: Date.now().toString(), title: `Sent to ${to}`, amount: -amount },
      ...prev,
    ]);
  };

  const withdrawMoney = (amount: number) => {
    setBalance(prev => prev - amount);
    setTransactions(prev => [
      { id: Date.now().toString(), title: 'Withdraw', amount: -amount },
      ...prev,
    ]);
  };

  return (
    <ZaymaContext.Provider value={{ user, signup, login, logout, balance, transactions, sendMoney, withdrawMoney }}>
      {children}
    </ZaymaContext.Provider>
  );
};

export const useZayma = () => {
  const context = useContext(ZaymaContext);
  if (!context) throw new Error('useZayma must be used within ZaymaProvider');
  return context;
};
