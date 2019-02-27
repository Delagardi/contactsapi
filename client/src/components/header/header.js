import React from 'react';
import Search from '../search';

const Header = () => {
  return (
    <div className="container d-flex justify-content-between align-items-center">
      <div>
        <h2>Contact list</h2>
      </div>
      <div>
        <Search/>
      </div>
    </div>
  );
}

export default Header;