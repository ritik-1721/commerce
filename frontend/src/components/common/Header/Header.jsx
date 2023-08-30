import React, { useState } from 'react';
import AuthModal from "../modal/AuthModal";
import NavBar from "./nav/NavBar";
import SideBar from "./nav/SideBar";








export default function Header() {

  

  const handleMenuItemClick = (subitems) => {
    setMenuHistory([...menuHistory, menuItems]); // Push current menu items to history
    setMenuItems(subitems);
  };

  const handleBackClick = () => {
    if (menuHistory.length > 0) {
      const previousMenu = menuHistory.pop(); // Pop the last item from history
      setMenuItems(previousMenu);
      setMenuHistory([...menuHistory]); // Update history
    }
  };

  return <header>
    
    {/* <div className="flex h-screen bg-gray-100">
      <nav className="w-64 p-4 bg-white shadow-lg">
        {menuHistory.length > 0 && (
          <button onClick={handleBackClick} className="mb-4">
            Back
          </button>
        )}
        <Menu items={menuItems} onItemClick={handleMenuItemClick} />
      </nav>
      
    </div> */}
<AuthModal/><NavBar/><SideBar/></header>;
}
