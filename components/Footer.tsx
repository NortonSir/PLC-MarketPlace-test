import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-inner mt-8 py-4">
      <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} PLC Marketplace. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;