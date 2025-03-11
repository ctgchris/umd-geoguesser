import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex justify-center space-x-4 text-sm">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/past" className="hover:underline">Past Puzzles</Link>
          <Link to="/about" className="hover:underline">About</Link>
        </div>
        <div className="mt-2 text-xs">
          &copy; 2025 UMD GeoGuesser. This is an unofficial, project not affiliated with or endorsed by the University of Maryland.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
