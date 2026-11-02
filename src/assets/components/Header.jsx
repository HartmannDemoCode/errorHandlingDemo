import React from 'react';

function Header({ user }) {
  return <div>Logged in as: {user?.username || 'Guest'}</div>;
}

export default Header;