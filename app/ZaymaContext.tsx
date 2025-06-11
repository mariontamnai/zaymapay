import React, { createContext, useState, useContext } from 'react';

type Transaction = {
  id: string;
  title: string;
  amount: number;
};

type ZaymaContextType = {
  balance: number;
  transactions: Transaction[];
  sendMoney: (title: string, amount: number) => void;
  withdrawMoney: (title: string, amount: number) => void;
};

const ZaymaContext = createContext<ZaymaContextType | null>(null);

export const ZaymaProvider = ({ children }: { children: React.ReactNode }) => {
  const [balance, setBalance] = useState(5000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const sendMoney = (title: string, amount: number) => {
    if (amount <= balance) {
      setBalance(prev => prev - amount);
      setTransactions(prev => [
        { id: Date.now().toString(), title, amount: -amount },
        ...prev,
      ]);
    }
  };

  const withdrawMoney = (title: string, amount: number) => {
    if (amount <= balance) {
      setBalance(prev => prev - amount);
      setTransactions(prev => [
        { id: Date.now().toString(), title, amount: -amount },
        ...prev,
      ]);
    }
  };

  return (
    <ZaymaContext.Provider value={{ balance, transactions, sendMoney, withdrawMoney }}>
      {children}
    </ZaymaContext.Provider>
  );
};

export const useZayma = () => {
  const context = useContext(ZaymaContext);
  if (!context) throw new Error('ZaymaContext not found');
  return context;
};
