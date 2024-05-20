import React, { useEffect, useState } from 'react';
import { getMoviesByGenreInRange, getMoviesInRange, getSeriesInRange, getShowsByGenreInRange } from '../../Services/Movies';
import { Link, useParams } from 'react-router-dom';
import NoImage from '../../assests/NoImage.avif';
import MovieCard from '../../Components/MovieCard/MovieCard';
import './ListShows.css'; // Make sure to import your CSS for the loading animation

type Props = {
    movie: boolean;
};

const ListShows = (props: Props) => {
    const [loadedImages, setLoadedImages] = useState<string[]>([]);
    const [shows, setShows] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const { movieId } = useParams<{ movieId: string }>();
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            if (props.movie) {
                const data = await getMoviesInRange(`${page * 20 - 19}-${page * 20}`);
                setShows(prevShows => [...prevShows, ...data]);
            } else {
                const data = await getSeriesInRange(`${page * 20 - 19}-${page * 20}`);
                setShows(prevShows => [...prevShows, ...data]);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [movieId, page]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
                return;
            }
            setPage(prevPage => prevPage + 1);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);


    const handleImageLoad = (genre: string) => {
        setLoadedImages(prevLoadedImages => [...prevLoadedImages, genre]);
    };

    const LoadingCard = ({ genre }: { genre: string }) => (
        <div className=''>
            <div className={`loadingBox ${loadedImages.includes(genre) ? 'fade-out' : ''}`}></div>
        </div>
    );

    return (
        <div className='container-fluid' style={{ minHeight: "100vh" }}>
            <div className='row mt-5'>
                <h1 className='text-center mb-4'>
                    {props.movie ? 'Movies' : 'Series'}
                </h1>
                <div className='col-12'>
                    <div className='row'>
                        {
                            shows.map((item, index) => (
                                <div key={index} className='col-12 col-sm-6 col-md-3 col-lg-2 mb-4'>
                                    <MovieCard item={item} isMovies={true} NoImage={NoImage} isMovie={false} key={0} />
                                </div>
                            ))
                        }
                        {isLoading && Array.from({ length: 20 }).map((_, index) => (
                            <div key={index} className='col-12 col-sm-6 col-md-3 col-lg-2 mb-4'>
                                <LoadingCard key={index} genre={movieId ?? ''} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListShows;
