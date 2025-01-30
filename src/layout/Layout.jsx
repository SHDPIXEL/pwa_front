import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Header from '../components/Header';
import { BottomNavBar } from '../components/BottomNavBar';

const Layout = ({ title }) => {
  return (
    <div className="min-h-screen bg-gray-50 poppins-regular">

      <div className="max-w-md mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
