import React from 'react'
import { Link } from 'react-router-dom'
import NoImage from '../../assests/NoImage.avif'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './Navbar.css'

type Props = {}

const Navbar = (props: Props) => {
    return (
        <nav className="navbar navbar-expand-lg sticky-top px-5 navbar-dark bg-dark" style={{ background: "#000000d9" }}>
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img style={{ height: 75, width: 75 }} src={NoImage} alt="Movie" />
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="color navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse text-center" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                        <li className="nav-item mx-3">
                            <Link to="/" className="text-white text-decoration-none nav-link">Home</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link to="/genres" className="text-white text-decoration-none nav-link">Genres</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link to="/movies" className="text-white text-decoration-none nav-link">Movies</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link to="/series" className="text-white text-decoration-none nav-link">Series</Link>
                        </li>
                    </ul>
                    <form className="" >
                        <Link to="/watchlist" className="btn btn-outline-success mx-auto">Watch List</Link>
                    </form>
                </div>
            </div>
        </nav>
    )
}
export default Navbar
