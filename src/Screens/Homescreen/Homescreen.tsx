import React, { useEffect, useState, useCallback } from 'react';
import MovieShowcase from '../../Components/MovieShowcase/MovieShowcase';
import { getMoviesByGenreInRange, getSeriesByGenreInRange } from '../../Services/Movies';
import NoImage from '../../assests/NoImage.avif';
import MovieCard from '../../Components/MovieCard/MovieCard';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './Homescreen.css';
import { Link } from 'react-router-dom';

type Props = {};

const Homescreen: React.FC<Props> = () => {
    const [moviesByGenre, setMoviesByGenre] = useState<{ [key: string]: any[] }>({});
    const [isMovies, setIsMovies] = useState(true); // State to toggle between movies and series
    const [loadingGenres, setLoadingGenres] = useState<{ [key: string]: boolean }>({});
    const [range, setRange] = useState<{ [key: string]: string }>({}); // Adjusted initial range for each genre
    const [initialLoading, setInitialLoading] = useState(true); // State for initial loading
    const [fadeOut, setFadeOut] = useState<{ [key: string]: boolean }>({});

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 7
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 3
        }
    };

    const genres = [
        "Action",
        "Comedy",
        "Thriller",
        "War",
        "Romance",
        "Drama",
        "Crime",
        "Documentary",
        "Horror",
    ];

    useEffect(() => {
        const fetchData = async () => {
            const dataByGenre: { [key: string]: any[] } = {};
            const initialRange = "1-7"; // Initial range for the first fetch

            for (const genre of genres) {
                const data = isMovies
                    ? await getMoviesByGenreInRange(genre, initialRange)
                    : await getSeriesByGenreInRange(genre, initialRange);
                dataByGenre[genre] = data;
                setRange(prevRange => ({ ...prevRange, [genre]: initialRange }));
            }

            setMoviesByGenre(dataByGenre);
            setInitialLoading(false); // Set initial loading to false after fetching data
        };

        fetchData();
    }, [isMovies]);

    const fetchMoreData = async (genre: string) => {
        setFadeOut(prev => ({ ...prev, [genre]: true }));

        setTimeout(async () => {
            setLoadingGenres(prev => ({ ...prev, [genre]: true }));

            const currentRange = range[genre];
            const [start, end] = currentRange.split('-').map(Number);
            const newRange = `${end + 1}-${end + 5}`; //
            const newMovies = isMovies
                ? await getMoviesByGenreInRange(genre, newRange)
                : await getSeriesByGenreInRange(genre, newRange);

            setMoviesByGenre(prevMoviesByGenre => ({
                ...prevMoviesByGenre,
                [genre]: [...(prevMoviesByGenre[genre] || []), ...newMovies]
            }));

            setRange(prevRange => ({ ...prevRange, [genre]: newRange }));
            setLoadingGenres(prev => ({ ...prev, [genre]: false }));
            setFadeOut(prev => ({ ...prev, [genre]: false }));
        }, 2000);
    };

    const handleSlideEnd = useCallback((currentSlide: number, genre: string) => {
        const totalItems = moviesByGenre[genre]?.length || 0;
        const itemsPerSlide = responsive.desktop.items;
        const totalPages = Math.ceil(totalItems / itemsPerSlide);

        // Only fetch more data if the user has reached the last slide
        if (currentSlide + 1 >= totalPages && !loadingGenres[genre]) {
            fetchMoreData(genre);
        }
    }, [moviesByGenre, loadingGenres]);

    const LoadingCard = ({ genre }: { genre: string }) => (
        <div className='col-12'>
            <div className='mb-4 mx-3'>
                <div className={`loadingBox ${fadeOut[genre] ? 'fade-out' : ''}`}></div>
            </div>
        </div>
    );

    return (
        <div className='container-fluid min-vh-100'>
            <div className='row'>
                <div className='col-12'>
                    <MovieShowcase />
                </div>
                <div className='col-12 mb-3 d-flex justify-content-center mt-5'>
                    <button
                        className='btn btn-primary mx-2'
                        onClick={() => {
                            setRange({}); // Reset range when switching
                            setIsMovies(true);
                            setInitialLoading(true); // Set initial loading when switching
                        }}
                    >
                        Movies
                    </button>
                    <button
                        className='btn btn-secondary mx-2'
                        onClick={() => {
                            setRange({}); // Reset range when switching
                            setIsMovies(false);
                            setInitialLoading(true); // Set initial loading when switching
                        }}
                    >
                        Series
                    </button>
                </div>

                {genres.map((genre, key) => (
                    <div className='row' key={key}>
                        <Link to={`/genres/${genre.toLowerCase()}`} className='text-decoration-none'>
                            <h2 className='col-12 ms-5 text-decoration-none text-light'>{genre}</h2>
                        </Link>
                        {initialLoading ? (
                            <Carousel
                                responsive={responsive}
                                infinite={false} // Set to false to avoid infinite looping issues
                                swipeable={false}
                                draggable={false}
                                className='col-12'
                            >
                                {Array.from({ length: 7 }).map((_, index) => (
                                    <LoadingCard key={index} genre={genre} />
                                ))}
                            </Carousel>
                        ) : (
                            <>
                                {moviesByGenre[genre] && moviesByGenre[genre].length > 0 ? (
                                    <Carousel
                                        responsive={responsive}
                                        infinite={false} // Set to false to avoid infinite looping issues
                                        swipeable={false}
                                        draggable={false}
                                        beforeChange={(previousSlide, { currentSlide }) => handleSlideEnd(currentSlide, genre)}
                                        className='col-12'
                                    >
                                        {moviesByGenre[genre].map((item, index) => (
                                            <MovieCard item={item} key={index} isMovies={isMovies} NoImage={NoImage} isMovie={false} />
                                        ))}
                                        {loadingGenres[genre] && <LoadingCard genre={genre} />}
                                    </Carousel>
                                ) : (
                                    <div className='col-12'>No data available</div> // Handle case where there are no movies
                                )}
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homescreen;
