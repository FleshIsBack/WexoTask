import React from 'react'
import { Link } from 'react-router-dom'
import NoImage from '../../assests/NoImage.avif'
type Props = {}

const Navbar = (props: Props) => {
    return (
        <nav className="navbar navbar-expand-lg sticky-top px-5" style={{ background: "#000000d9" }}>
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    <img style={{ height: 75, width: 75 }} src={NoImage} alt="Movie" />
                </Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                        <li className="nav-item mx-3">
                            <Link to="/" className="text-white text-decoration-none">Home</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link to="/movies" className="text-white text-decoration-none">Movies</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link to="/series" className="text-white text-decoration-none">Series</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>

    )
}
export default Navbar
