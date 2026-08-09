import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from './components/Layout/UserLayout';

const App = () => {
  return (
    <BrowserRouter>
    {
      /*
      www.shopsphere.com/home
      www.shopsphere.com/products
      and so on
      */
    }
      <Routes>
        <Route path="/" element={<UserLayout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
