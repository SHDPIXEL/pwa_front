import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; 

const Layout = () => {

  return (
    <div className="min-h-screen bg-gray-50 poppins-regular">
      <div className="max-w-md mx-auto w-full bg-white shadow-md min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
