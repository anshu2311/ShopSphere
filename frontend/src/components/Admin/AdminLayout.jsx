import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const [isSideBarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSideBarOpen);
  }
  
  return (
   <div  className="min-h-screen flex flex-col md:flex-row relative">
    {/*Mobile toggle button */}
    <div className="flex md:hidden p-4 bg-gray-900 text-white z-20">
      <button onClick={toggleSidebar} className="flex items-center">
        <FaBars size={24} />
        <h1 className="ml-4 text-xl font-medium">Admin Dashboard</h1>
      </button>
    </div>
      {/* overlay for mobile sidebar*/}
      {isSideBarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden" onClick={toggleSidebar}>
        </div>
      )}
    {/* sidebar */}
    <div className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative transform ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:translate-x-0 md:static md:block z-20`}>
      {/* Sidebar content goes here */}
      <AdminSidebar />
    </div>  
    {/* main content */}
    <div className="flex-grow p-6 overflow-auto">
      <Outlet />
      {/* Main content goes here */}
    </div>
  </div>
  )
}

export default AdminLayout