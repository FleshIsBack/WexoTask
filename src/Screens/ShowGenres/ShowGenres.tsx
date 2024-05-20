import React, { useState } from 'react'
import './ShowGenres.css'
import Comedy from '../../assests/genres/Comedy.png'
import Action from '../../assests/genres/Action.webp'
import Drama from '../../assests/genres/Drama.webp'
import Horror from '../../assests/genres/Horror.jpg'
import Romance from '../../assests/genres/Romance.webp'
import Thriller from '../../assests/genres/Thriller.jpg'
import { Link } from 'react-router-dom'

type Props = {}
interface Genre {
  backgroundImage: string;
  genre: string;
}

const ShowGenres = (props: Props) => {
  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const handleImageLoad = (genre: string) => {
    setLoadedImages(prevLoadedImages => [...prevLoadedImages, genre]);
  }

  const genres: Genre[] = [
    {
      backgroundImage: Action,
      genre: 'Action'
    },
    {
      backgroundImage: Comedy,
      genre: 'Comedy'
    },
    {
      backgroundImage: Drama,
      genre: 'Drama'
    },
    {
      backgroundImage: Horror,
      genre: 'Horror'
    },
    {
      backgroundImage: Romance,
      genre: 'Romance'
    },
    {
      backgroundImage: Thriller,
      genre: 'Thriller'
    }
  ];

  return (
    <div className='container-fluid' style={{ minHeight: "100vh" }}>
      <div className='row mt-5'>
        <h1 className='text-center mb-4'>Genres</h1>

        {
          genres.map((genre, index) => (
            <div key={index} className='col-12 col-sm-6 col-md-4 col-lg-3'>
              <Link to={`/genres/${genre.genre.toLowerCase()}`}>
                <div className='genre-container rounded-4'>
                  <img
                    src={genre.backgroundImage}
                    alt={genre.genre}
                    className={`img-fluid genreImage rounded-4 ${loadedImages.includes(genre.genre) ? 'loaded' : ''}`}
                    onLoad={() => handleImageLoad(genre.genre)}
                  />
                  <div className="genre-overlay">
                    <div className='genre-name'>{genre.genre}</div>
                  </div>
                </div>
              </Link>

            </div>
          ))
        }
      </div>
    </div>
  )
}
export default ShowGenres
