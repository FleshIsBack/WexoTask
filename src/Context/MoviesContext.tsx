import React, { createContext, useState, ReactNode, useEffect } from 'react';
import Movie from '../model/Movie';
import { GetAllSeries } from '../Services/Movies';



interface MovieContextProps {
    movies: Movie[];
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

const MovieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    useEffect(() => {
        GetAllSeries().then((res: any[]) => {
            const filteredMovies = res.map((movie: any) => ({
                id: movie.id,
                title: movie.title,
                releaseYear: movie.plprogram$year,
                thumbnailLarge: movie.plprogram$thumbnails?.['orig-93x165']?.plprogram$url,
                thumbnailMedium: movie.plprogram$thumbnails?.['orig-93x165']?.plprogram$url,
                thumbnailSmall: movie.plprogram$thumbnails?.['orig-93x165']?.plprogram$url,
                categories: movie.plprogram$tags.map((tag: any) => tag.plprogram$title),
                credits: movie.plprogram$credits.map((credit: any) => ({ name: credit.plprogram$creditType, role: credit.plprogram$creditType })),
                rating: movie.plprogram$ratings.map((rating: any) => ({ rating: rating.plprogram$ratingValue, source: rating.plprogram$scheme })),
                description: movie.description,
                imdbId: movie.tdc$imdbId,
                contentType: movie.plprogram$programType
            }));
            setMovies(filteredMovies);
            console.log('Movies:', filteredMovies);
        });
    }, [])


    return (
        <MovieContext.Provider value={{ movies, setMovies }}>
            {children}
        </MovieContext.Provider>
    );
};

export { MovieContext, MovieProvider };
