import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getmovieById } from '../../Services/Movies';
import NoImage from '../../assests/NoImage.avif';
import './MovieInfoScreen.css';
import { useMovies } from '../../Context/WatchListContext'; // Adjust the path as necessary

type Props = {};

const MovieInfoScreen = (props: Props) => {
    const { movieId } = useParams<{ movieId: string }>();
    const [movieInfo, setMovieInfo] = useState<any>({});
    const [isLoading, setIsLoading] = useState(true);
    const { movies, setMovies } = useMovies();
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const navigate = useNavigate(); // useNavigate hook for navigation

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const data = await getmovieById(movieId ?? '');
            setMovieInfo(data);
            setIsLoading(false);
        };
        fetchData();
    }, [movieId]);

    useEffect(() => {
        if (movieInfo.id) {
            const isMovieInWatchlist = movies.includes(movieInfo.id);
            setIsInWatchlist(isMovieInWatchlist);
        }
    }, [movies, movieInfo]);

    const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSeason = event.target.value;
        const selectedItem = movieInfo.plprogram$seriesTvSeasons.find(
            (item: any) => item.plprogram$seasonNumber.toString() === selectedSeason
        );

        let seasonId = selectedItem.plprogram$id;
        const prefix = 'http://data.entertainment.tv.theplatform.eu/entertainment/data/TvSeason/';
        if (seasonId.includes(prefix)) {
            seasonId = seasonId.replace(prefix, '');
        }

        navigate(`/shows/${seasonId}/season/${selectedSeason}`, { state: { item: selectedItem } });
    };

    const handleAddToWatchlist = () => {
        setMovies((prevMovies) => {
            if (!prevMovies.includes(movieInfo.id)) {
                return [...prevMovies, movieInfo.id];
            }
            return prevMovies;
        });
    };

    const handleRemoveFromWatchlist = () => {
        setMovies((prevMovies) => {
            return prevMovies.filter(movieId => movieId !== movieInfo.id);
        });
    };



    return (
        <div className='movie-info-container'>
            <div className='backdrop'>
                <img className='backdrop-image' src={movieInfo.poster || NoImage} alt={movieInfo.title} />
            </div>
            {!isLoading ? <div className='overlay'>
                <div className='container mt-5 p-4 text-light'>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h1>{movieInfo.title}</h1>
                        {isInWatchlist ? (
                            <button className='btn btn-danger' onClick={handleRemoveFromWatchlist}>
                                Remove from Watchlist
                            </button>
                        ) : (
                            <button className='btn btn-primary' onClick={handleAddToWatchlist}>
                                Add to Watchlist
                            </button>
                        )}
                    </div>
                    <p>{movieInfo.plprogram$year}</p>
                    <p>{movieInfo.description}</p>
                    <h3>Actors</h3>
                    <p>
                        {movieInfo.plprogram$credits
                            ?.filter((item: any) => item.plprogram$creditType === 'actor')
                            .map((item: any) => item.plprogram$personName)
                            .join(', ')}
                    </p>
                    <h3>Directors</h3>
                    <p>
                        {movieInfo.plprogram$credits
                            ?.filter((item: any) => item.plprogram$creditType === 'director')
                            .map((item: any) => item.plprogram$personName)
                            .join(', ')}
                    </p>
                    <div className='row'>
                        {movieInfo.plprogram$programType === 'series' ? (
                            <div className='col-12 col-md-4 col-lg-3'>
                                <select className='form-select' onChange={handleSeasonChange} defaultValue="">
                                    <option value="" disabled>
                                        Select Season
                                    </option>
                                    {movieInfo.plprogram$seriesTvSeasons?.map((item: any, index: number) => (
                                        <option key={index} value={item.plprogram$seasonNumber}>
                                            {item.plprogram$tvSeasonNumber}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div> : <div className="loading-container">
                <div className="spinner"></div>
            </div>}
        </div>
    );
};

export default MovieInfoScreen;
