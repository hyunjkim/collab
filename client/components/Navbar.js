import React from 'react';

/**
 * COMPONENT
 */
const Navbar = (props) => {
  const {children} = props;
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">COLLAB</a>
      </nav>
      <hr/>
      {children}
      </div>
    )
}

module.exports = Navbar;
