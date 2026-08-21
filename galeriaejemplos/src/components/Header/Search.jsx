import React, { useState } from 'react';
import './Header.css';

export default function Search({ onSearch }) {
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    const v = e.target.value;
    setValue(v);
    if (onSearch) onSearch(v);
  };
  return (
    <div className="header-search">
      <input
        type="search"
        placeholder="Buscar ejemplos por nombre o descripción..."
        value={value}
        onChange={handleChange}
        aria-label="Buscar ejemplos"
      />
    </div>
  );
}
