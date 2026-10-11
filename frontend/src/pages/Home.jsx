import { useEffect, useState } from "react"
import Hero from "../components/Layout/Hero"
import FeaturedCollection from "../components/Products/FeaturedCollection"
import FeatureSection from "../components/Products/FeatureSection"
import GenderCollectionSelection from "../components/Products/GenderCollectionSelection"
import NewArrivals from "../components/Products/NewArrivals"
import ProductDetails from "../components/Products/ProductDetails"
import { ProductGrid } from "../components/Products/ProductGrid"
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const {products, loading, error} = useSelector((state) => state.products);
  const [bestSSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // Fetch products for a specific collection 
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );
    // fetch best seller product
    const fetchBestSeller = async () => {
     try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
      );
      setBestSellerProduct(response.data);
     } catch (error) {
      console.error(error);
     }
    };
    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
     <Hero />
     <GenderCollectionSelection />
     <NewArrivals />
     {/*Best seller */}
     <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSSellerProduct ? (
        <ProductDetails productId={bestSSellerProduct._id} />
      ) : (
          <p className="text-center">Loading best seller product...</p>
      )}

     <div className="container mx-auto">
      <h2 className="text-3xl text-center font-bold mb-4">
        Top Wears For Women
      </h2>
      <ProductGrid products={products} loading={loading} error={error} />
     </div>

     <FeaturedCollection />
     <FeatureSection />
    </div>
  )
}

export default Home