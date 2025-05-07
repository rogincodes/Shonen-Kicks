import "../styles.css";

export default function Footer() {
  return (
    <footer>
      <div className="social-logos">
        <a
          href="mailto:cartallarogin@gmail.com"
          target="blank"
          className="email"
        >
          <i className="fa fa-envelope"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/rogin-cartalla/"
          target="blank"
          className="linkedin"
        >
          <i className="fa fa-linkedin" aria-hidden="true"></i>
        </a>
        <a
          href="https://github.com/rogincodes"
          target="blank"
          className="github"
        >
          <i className="fa fa-github"></i>
        </a>
      </div>
      <p className="footer-text">© 2025 Shonen Kicks. All rights reserved.</p>
    </footer>
  );
}
