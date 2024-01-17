import React from 'react';
import Logo from '../Logo/Logo';
function Navbar({children}) {
  return (
    <nav className='nav-bar'>
      <Logo />
      {children}
      </nav>
  )
}

export default Navbar;