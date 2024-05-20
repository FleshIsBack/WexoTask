import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

type Props = {
    item: any;
    key: number;
    isMovies: boolean;
    NoImage: string;
    isMovie: boolean;
};

const MovieCard: React.FC<Props> = ({ item, isMovies, NoImage }) => {
    const [loaded, setLoaded] = useState(false);

    const handleImageLoad = () => {
        setLoaded(true);
    };

    const modifiedId = item?.id ? item.id.replace("http://data.entertainment.tv.theplatform.eu/entertainment/data/ProgramAvailability/", "") : undefined;

    return (
        <div className='col-12 '>
            <div className='mb-4 mx-3'>
                <Link to={`/shows/${modifiedId}`}>
                    <div className='img-wrapper'>
                        {!loaded && <div className='loadingBox'></div>}
                        <img
                            className={`img-fluid rounded-5 imagehover ${loaded ? 'loaded' : ''}`}
                            src={
                                item?.thumbnailSmall?.includes("https://prod.cdn.bbaws.net") ||
                                    item?.thumbnailSmall?.includes("http://data.entertainment.tv.theplatform.eu")
                                    ? item.thumbnailSmall
                                    : NoImage
                            }
                            alt={item?.title}
                            onLoad={handleImageLoad}
                        />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default MovieCard;
