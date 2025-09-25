import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../css/App.css";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    return window.removeEventListener("scroll", handleScroll);
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate("/search");
  };

  return (
    <>
      <nav
        className={` navbar navbar-custom ${
          scrolled ? "scrolled" : ""
        } navbar-expand-md navbar-dark bg-black fixed-top px-lg-4 py-1`}
      >
        <div className="container-fluid">
          <Link
            to="/"
            className="navbar-brand my-netflix-red fw-800 navbar-brand-arc fs-5"
          >
            NETFLIX
          </Link>
          {/* <button
            className="navbar-toggler text-light fs-sml me-auto mx-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navmenu"
          >
            Browse <span className="bi bi-caret-down-fill"></span>
          </button> */}
          <div className="d-none d-md-block me-auto mx-3" id="navmenu">
            <ul className="navbar-nav me-auto">
              <li className="nav-item fs-sml">
                <Link to="/" className="nav-link active">
                  Home
                </Link>
              </li>
              <li className="nav-item fs-sml">
                <Link to="#" className="nav-link less-white">
                  Series
                </Link>
              </li>
              <li className="nav-item fs-sml">
                <Link to="#" className="nav-link less-white">
                  Films
                </Link>
              </li>
              <li className="nav-item fs-sml">
                <Link to="#" className="nav-link less-white">
                  Games
                </Link>
              </li>
              <li className="nav-item fs-sml">
                <Link to="#" className="nav-link less-white">
                  My List
                </Link>
              </li>
              <li className="nav-item fs-sml">
                <Link to="#" className="nav-link less-white">
                  Browse by Language
                </Link>
              </li>
            </ul>
          </div>
          <div className="btn-group d-md-none me-auto mx-2">
            <button
              className="btn-custom btn-sm dropdown-toggle fs-sml"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Browse
            </button>
            <ul className="dropdown-menu bg-black wdt-sml">
              <li className="link">
                <Link to="/" className="dropdown-item text-light fs-sml">
                  Home
                </Link>
              </li>
              <li className="link">
                <Link to="" className="dropdown-item text-light fs-sml">
                  Series
                </Link>
              </li>
              <li className="link">
                <Link to="" className="dropdown-item text-light fs-sml">
                  Films
                </Link>
              </li>
              <li className="link">
                <Link to="" className="dropdown-item text-light fs-sml">
                  Games
                </Link>
              </li>
              <li className="link">
                <Link to="" className="dropdown-item text-light fs-sml">
                  My List
                </Link>
              </li>
              <li className="link">
                <Link to="" className="dropdown-item text-light fs-sml">
                  Browse by Langauge
                </Link>
              </li>
            </ul>
          </div>
          {location.pathname !== "/search" && (
            <Link
              to="/search"
              onClick={handleSearchClick}
              className="text-light fs-5"
            >
              <span className="bi bi-search-heart-fill"></span>
            </Link>
          )}

          <Link to="#" className="text-light fs-5 mx-3 d-none d-md-block">
            <span className="bi bi-bell-fill"></span>
          </Link>
          <Link
            to="#"
            className={`text-light fs-5 ${
              location.pathname === "/search" ? "d-block" : "d-none d-md-block"
            }`}
          >
            <span className="bi bi-caret-down-fill d-md-block"></span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
