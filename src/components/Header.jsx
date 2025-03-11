import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { currentUser, signInWithGoogle, logout } = useAuth();

  return (
    <header className="bg-white shadow-md p-4 flex flex-col md:flex-row justify-between items-center">
      <div className="mb-2 md:mb-0">
        <Link to="/" className="text-2xl font-bold text-[#000000] hover:text-black transition-colors duration-200">
          UMD GeoGuesser
        </Link>
      </div>
      
      <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
        <Link 
          to="/" 
          className="px-4 py-2 rounded-full bg-[#E21833] text-white hover:bg-[#8B0000] transition-colors duration-200 text-sm font-semibold shadow-sm"
        >
          Today's Puzzle
        </Link>
        <Link 
          to="/past" 
          className="px-4 py-2 rounded-full bg-[#E21833] text-white hover:bg-[#8B0000] transition-colors duration-200 text-sm font-semibold shadow-sm"
        >
          Past Puzzles
        </Link>
        
        {currentUser ? (
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
            <span className="text-black font-medium">{currentUser.displayName}</span>
            <button 
              onClick={logout} 
              className="px-4 py-2 rounded-full bg-transparent text-black hover:bg-black hover:text-white transition-colors duration-200 text-sm font-semibold shadow-sm border border-black"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button 
            onClick={signInWithGoogle} 
            className="px-4 py-2 rounded-full bg-transparent text-black hover:bg-black hover:text-white transition-colors duration-200 text-sm font-semibold shadow-sm border border-black"
          >
            Sign In with Google
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
