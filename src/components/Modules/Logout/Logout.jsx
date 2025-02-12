// LogoutButton.jsx
import React from 'react';
import { useAuthContext } from "@asgardeo/auth-react";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const LogoutButton = () => {
  const { signOut } = useAuthContext();

  const handleLogout = () => {
    signOut();
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      <LogoutOutlinedIcon/>
    </button>
  );
};

export default LogoutButton;
