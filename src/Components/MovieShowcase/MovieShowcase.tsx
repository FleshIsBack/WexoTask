import React, { useEffect, useState } from 'react';
import { get3RandomMovies } from '../../Services/Movies';
import NoImage from '../../assests/NoImage.avif';
import './MovieShowcase.css'; // Importing the custom CSS

type Props = {};

const MovieShowcase: React.FC<Props> = (props: Props) => {
    const [movies, setMovies] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await get3RandomMovies();
            setMovies(data);
        };
        fetchData();
    }, []);

    return (
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {movies.map((movie, index) => (
                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={movie.id}>
                        <img
                            className="custom-img"
                            src={movie.imageUrl || NoImage}
                            alt={movie.title}
                        />
                        <div className="carousel-caption d-md-block">
                            <h5>{movie.title}</h5>
                            <MovieDescription description={movie.description} />
                        </div>
                        <div className="shadow-overlay"></div>
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

const MovieDescription: React.FC<{ description: string }> = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <p>
            {isExpanded ? description : `${description.substring(0, 200)}...`}
            {description.length > 300 && (
                <button className="read-more btn" onClick={toggleReadMore}>
                    {isExpanded ? ' Read Less' : ' Read More'}
                </button>
            )}
        </p>
    );
};

export default MovieShowcase;
