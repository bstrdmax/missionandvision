import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="inline-flex items-center gap-3 bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm">
        <SparklesIcon className="w-6 h-6 text-purple-500" />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
          Mission & Values Creator
        </h1>
      </div>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
        Define your company's strategic compass. Fill in your business details and let AI craft a powerful mission statement and core values.
      </p>
    </header>
  );
};

export default Header;