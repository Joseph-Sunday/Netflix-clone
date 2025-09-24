import "../css/App.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="container-fluid mt-lg px-md-4 d-flex flex-column w-md-50">
        <div className="d-flex align-items-baseline gap-4 m-2 my-3 text-light fs-1 footer-socials">
          <span className="bi bi-facebook"></span>
          <span className="bi bi-instagram"></span>
          <span className="bi bi-youtube"></span>
        </div>

        <div className="d-flex gap-5 align-items-start">
          <div className="d-md-flex justify-content-between align-items-center gap-5">
            <div className="my-2 fs-sml footer-links">
              <Link
                to="#"
                className="link d-block"
              >
                Audio Description
              </Link>

              <Link
                to="#"
                className="link d-block"
              >
                Investor Relations
              </Link>
              <Link
                to="#"
                className="link d-block"
              >
                Legal Notices
              </Link>
            </div>

            <div className="footer-links fs-sml my-1">
              <Link
                to="#"
                className="link d-block"
              >
                Help Center
              </Link>
              <Link
                to="#"
                className="link d-block"
              >
                Jobs
              </Link>
              <Link
                to="#"
                className="link d-block"
              >
                Cookie Preferences
              </Link>
            </div>
          </div>

          <div className="my-2 d-md-flex justify-content-between align-items-center gap-5">
            <div className="footer-links fs-sml">
              <Link
                to="#"
                className="link d-block"
              >
                Gift Cards
              </Link>
              <Link
                to="#"
                className="link d-block"
              >
                Terms of Use
              </Link>
              <Link
                to="#"
                className="link d-block"
              >
                Coporate Information
              </Link>
            </div>

            <div className="my-1 fs-sml footer-links">
              <Link
                to="#"
                className="link d-block"
              >
                Media Center
              </Link>
              <Link
                to="#"
                className="link d-block"
              >
                Privacy
              </Link>
              <Link
                to="#"
                className="link d-block"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-links fs-sml">
          <i></i>
          <p className="link text-decoration-none">1997-2025 Netflix, Inc.</p> 
        </div>
      </footer>
    </>
  );
};

export default Footer;
