import { Link } from 'react-router-dom'
import {
 HiOutlineShoppingCart, 
 HiOutlineUser, 
 HiBars3BottomRight
} from 'react-icons/hi2';
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';
import { useState } from 'react';

const Navbar = () => {
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
   <>
   <nav className="container mx-auto flex justify-between items-center py-4 px-6">
   {/*leftLogo*/}
   <div>
    <Link to="/" className="text-2xl font-medium">
     ShopSphere
    </Link>
   </div>
   {/*center navigation links*/}
   <div className="hidden md:flex space-x-6">
    <Link
     to="#"
     className="text-gray-700 hover:text-black text-sm front-medium uppercase"
     >
      Men
    </Link>
    <Link
     to="#"
     className="text-gray-700 hover:text-black text-sm front-medium uppercase"
     >
      Women
    </Link>
    <Link
     to="#"
     className="text-gray-700 hover:text-black text-sm front-medium uppercase"
     >
      Top Wear
    </Link>
    <Link
     to="#"
     className="text-gray-700 hover:text-black text-sm front-medium uppercase"
     >
      Buttom Wear
    </Link>
   </div>
   {/*right icons*/}
   <div className="flex items-cener space-x-4">
    <Link to="profile" className="hover:text-black">
     <HiOutlineUser className="h-6 w-6 text-gray-700" />
    </Link>
    <button 
     onClick={toggleCartDrawer} 
     className="relative hover:text-black"
     >
     <HiOutlineShoppingCart className="h-6 w-6 text-gray-700" />
     <span className="absolute -top-1 bg-rabbit-red text-white text-xs rounded-full px-2 py-0.5">
      3
     </span>
    </button>
    {/* Search*/}
    <div className="overflow-hidden">
      <SearchBar />
    </div>
    <button className="md:hidden">
     <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
    </button>
   </div>
   </nav>
   <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
   </>
  )
}

export default Navbar