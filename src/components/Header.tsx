import React from 'react';

interface HeaderProps {
  category?: string;
  title?: string;
}

const Header = ({ category, title }: HeaderProps) => {
  return (
    <div className="mb-10">
      <p className="text-gray-400">{category}</p>
      <p className="text-3xl font-extrabold tracking-light text-slate-900">{title}</p>
    </div>
  );
};

export default Header;
