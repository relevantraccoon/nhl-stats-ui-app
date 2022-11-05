import React from "react";
import { FaGithubSquare, FaEnvelope, FaMobile } from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="footer">
      <p>
        This a remix of the <a href="#">NHL leaders stats page</a>. I've used
        the NHL API for the data. For the app, I've used React and SCSS.
      </p>
      <div id="social-media-icons">
        <FaGithubSquare className="social-media-icon" />
        <FaEnvelope className="social-media-icon" />
        <FaMobile className="social-media-icon" />
      </div>
    </footer>
  );
};

export default Footer;
