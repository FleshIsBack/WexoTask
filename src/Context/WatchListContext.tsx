import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the type for the context
interface MoviesContextType {
    movies: string[];
    setMovies: React.Dispatch<React.SetStateAction<string[]>>;
}

// Create the context with a default value
const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

// Create a provider component
export const MoviesProvider = ({ children }: { children: ReactNode }) => {
    const [movies, setMovies] = useState<string[]>([]);

    return (
        <MoviesContext.Provider value={{ movies, setMovies }}>
            {children}
        </MoviesContext.Provider>
    );
};

// Custom hook to use the MoviesContext
export const useMovies = (): MoviesContextType => {
    const context = useContext(MoviesContext);
    if (context === undefined) {
        throw new Error('useMovies must be used within a MoviesProvider');
    }
    return context;
};
