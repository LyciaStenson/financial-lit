'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type BonusScoreContextType = {
    bonus: string[];
    setBonus: (value: string[]) => void;
};

const BonusScoreContext = createContext<BonusScoreContextType | undefined>(undefined);

const BonusScoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [bonus, setBonus] = useState<string[]>(() => {
        if (typeof window !== 'undefined') {
            const storedValue = localStorage.getItem('bonusScore');
            return storedValue ? JSON.parse(storedValue) : {};
        }
    });

    useEffect(() => {
        localStorage.setItem('bonusScore', JSON.stringify(bonus));
    }, [bonus]);

    return (
        <BonusScoreContext.Provider value={{ bonus, setBonus }}>
            {children}
        </BonusScoreContext.Provider>
    );
};

const useBonusScoreContext = (): BonusScoreContextType => {
    const context = useContext(BonusScoreContext);
    if (!context) {
        throw new Error('useDataContext must be used within an AppProvider');
    }
    return context;
};

export { BonusScoreProvider, useBonusScoreContext };
