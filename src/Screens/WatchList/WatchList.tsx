import React, { useEffect, useState } from 'react';
import NoImage from '../../assests/NoImage.avif';
import MovieCard from '../../Components/MovieCard/MovieCard';
import { useMovies } from '../../Context/WatchListContext'; // Adjust the path as necessary
import { getmovieById } from '../../Services/Movies';

type Props = {}

const WatchList = (props: Props) => {
    const [loadedImages, setLoadedImages] = useState<string[]>([]);
    const [shows, setShows] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { movies } = useMovies();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const data = await Promise.all(movies.map(async (movie) => {
                const modifiedId = movie ? movie?.replace("http://data.entertainment.tv.theplatform.eu/entertainment/data/ProgramAvailability/", "") : undefined;
                const data = await getmovieById(modifiedId ?? ''); // Add nullish coalescing operator
                return data;
            }));
            setShows(data);
            setIsLoading(false);
        };

        fetchData();
    }, [movies]);

    useEffect(() => {
        console.log(shows);
    }, [shows]);

    const LoadingCard = ({ movie }: { movie: string }) => (
        <div className=''>
            <div className={`loadingBox ${loadedImages.includes(movie) ? 'fade-out' : ''}`}></div>
        </div>
    );

    return (
        <div className='container-fluid' style={{ minHeight: "100vh" }}>
            <div className='row mt-5'>
                <h1 className='text-center mb-4'>
                    Your Watchlist
                </h1>
                <div className='col-12'>
                    <div className='row'>
                        {
                            shows.map((item, index) => (
                                <div key={index} className='col-12 col-sm-6 col-md-3 col-lg-2 mb-4'>
                                    <MovieCard item={item} isMovies={true} NoImage={NoImage} isMovie={false} key={index} />
                                </div>
                            ))
                        }
                        {isLoading && Array.from({ length: 20 }).map((_, index) => (
                            <div key={index} className='col-12 col-sm-6 col-md-3 col-lg-2 mb-4'>
                                <LoadingCard key={index} movie={"" ?? ''} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchList;
