import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductDetails,
  updateProduct,
} from "../../redux/slices/productsSlice";

const EditProductPage = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const {id} = useParams();
 const { selectedProduct, loading, error } = useSelector((state) => state.products);
 const [productEdits, setProductEdits] = useState({});
 const [ uploading, setUploading ] = useState(false);
 const [uploadError, setUploadError] = useState("");

 const productData = selectedProduct ? {
  ...selectedProduct,
  collection: selectedProduct.collections || "",
  sizes: selectedProduct.sizes || [],
  colors: selectedProduct.colors || [],
  images: selectedProduct.images || [],
  ...productEdits[id],
} : null;

 useEffect(() => {
  if (id) {
   dispatch(fetchProductDetails(id));
  }
 }, [dispatch, id]);

 const updateProductField = (name, value) => {
  setProductEdits((edits) => ({
   ...edits,
   [id]: {
    ...edits[id],
    [name]: value,
   },
  }));
 };

 const handleChange = (e) => {
  const { name, value } = e.target;
  updateProductField(name, value);
 }

 const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
   setUploading(true);
   setUploadError("");
   const {data} = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
    formData
   );
   updateProductField("images", [
    ...productData.images,
    { url: data.url, altext: "" },
   ]);
   setUploading(false);
  } catch (error) {
   console.error(error);
   setUploadError(error.response?.data?.message || "Image upload failed.");
   setUploading(false);
  }
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await dispatch(updateProduct({
   id,
   productData: {
    ...productData,
    collections: productData.collection,
   },
  }));

  if (updateProduct.fulfilled.match(result)) {
   navigate("/admin/products");
  }
 };
 
 if (loading) return <p>Loading...</p>;
 if (error) return <p>Error: {error}</p>;
 if (!productData || String(selectedProduct._id) !== String(id)) {
  return <p>Loading product...</p>;
 }

 return (
  <div className="mx-auto max-w-5xl p-6 shadow-md rounded-md">
   <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
   <form onSubmit={handleSubmit}>
    {/*Name */}
    <div>
     <label className="block font-semibold mb-2">Product Name</label>
     <input 
      type="text" 
      name="name"
      value={productData.name}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-md py-2 px-4"
      required
     />
    </div>
    {/*Description */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">Description</label>
     <textarea 
      name="description"
      value={productData.description}
      className="w-full border border-gray-300 rounded-md py-2 px-4"
      onChange={handleChange}
      rows="4"
      required
     />
    </div>
    {/*Price */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">Price</label>
     <input
      type="number"
      name="price"
      value={productData.price}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-md py-2 px-4"
      required
     />
    </div>
    {/*SKU */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">SKU</label>
     <input
      type="text"
      name="sku"
      value={productData.sku}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-md py-2 px-4"
      required
     />
    </div>
    {/*Count in Stock */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">Count in Stock</label>  
     <input
      type="number"
      name="countInStock"  
      value={productData.countInStock}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-md py-2 px-4"
      required
     />
    </div>
    {/*Category */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">Category</label>
     <input
      type="text"
      name="category"
      value={productData.category}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-md py-2 px-4"
      required
     />
    </div>
    <div className="mb-6">
      <label className="block font-semibold mb-2">Collection</label>
      <input
       type="text"
       name="collection"
       value={productData.collection}
       onChange={handleChange}
       className="w-full border border-gray-300 rounded-md py-2 px-4"
       required
      />
    </div>
    {/*Sizes */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">Sizes (comma-separated)</label>  
     <input
      type="text"
      name="sizes"  
      value={productData.sizes.join(", ")}
      onChange={(e) => updateProductField("sizes", e.target.value.split(",").map(size => size.trim()))}
      className="w-full border border-gray-300 rounded-md py-2 px-4"
      required
     />
    </div>
    {/*Colors */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">Colors (comma-separated)</label>  
     <input
      type="text"
      name="colors"  
      value={productData.colors.join(", ")}
      onChange={(e) => updateProductField("colors", e.target.value.split(",").map(color => color.trim()))}
      className="w-full border border-gray-300 rounded-md py-2 px-4"
      required
     />
    </div>
    {/*Image Uploads*/}
    <div className="mb-6">
     <label className="block font-semibold mb-2">Upload Images</label>
     <input
      type="file"
      onChange={handleImageUpload}
     />
     { uploading && <p>Uploading image...</p> }
     { uploadError && <p className="text-red-500">{uploadError}</p> }
     <div className="flex gap-4 mt-4">
      {productData.images.map((image, index) => (
       <div key={index}>
        <img 
         src={image.url} 
         alt={image.altext || "Product Image"} 
         className="w-20 h-20 object-cover rounded-md shadow-md"
        />
       </div>
      ))}
     </div>
    </div>
    <button 
     type="submit" 
     className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors">
     Update Product
    </button>
   </form>
  </div>
 )
}

export default EditProductPage