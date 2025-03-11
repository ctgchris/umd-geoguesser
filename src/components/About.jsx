// src/components/About.jsx
import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 text-black">
      <div className="flex flex-col items-center mb-8">
        <img
          src="/images/umd-logo.png"
          alt="University of Maryland Logo"
          className="h-24 mb-4"
        />
        <h1 className="text-3xl font-bold">About UMD GeoGuesser</h1>
      </div>
      
      <p className="mb-4">
        Test your knowledge of the UMD campus by identifying locations from photos. Make your guess on the map and see how close you get!
      </p>
      
      <h2 className="text-2xl font-semibold mb-2">Features</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Daily campus location puzzles</li>
        <li>Interactive map guessing</li>
        <li>Score tracking</li>
        <li>Location hints</li>
        <li>Access to all past puzzles</li>
        <li>Private Admin Dashboard</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mb-2">Developer</h2>
      <p className="mb-4">
        UMD GeoGuesser is inspired by daily games like Wordle and Aniguesser, combining the fun of GeoGuesser with a UMD twist. Built to help others explore campus through photos I've collected over my years here, it's a daily challenge to test how well you know UMD.
      </p>
      
      <h2 className="text-2xl font-semibold mb-2">Contact</h2>
      <p className="mb-4">
        Questions or feedback? Email me at <a href="mailto:umdgeoguesser@gmail.com" className="underline">umdgeoguesser@gmail.com</a>
      </p>
    </div>
  );
};

export default About;
