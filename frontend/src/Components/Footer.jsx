import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 text-center">
      <div className="container mx-auto">
        <p className="text-lg">
          &copy; 2024 E-RakthKosh System. All rights reserved.
        </p>
        <p className="text-lg">
          Built with <span>❤️</span> using React and Tailwind CSS.
        </p>
        <p className="text-lg">
          Stay connected:
          <a href="mailto:info@erakthkosh.com" className="text-blue-500 ml-1">
            info@erakthkosh.com
          </a>
        </p>
        <p className="text-lg">
          Address: 1234 Blood Drive, Citystream, Bloodland.
        </p>
        <p className="text-lg">
          Follow us on social media:
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 ml-1"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 ml-1"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 ml-1"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
