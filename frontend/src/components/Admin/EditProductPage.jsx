import {useState, useEffect} from "react";

const EditProductPage = () => {
 const [productData, setProductData] = useState({
  name: "",
  description: "",
  price: 0,
  sku: "",
  countInStock: 0,
  category: "",
  brand: "",
  sizes: [],
  colors: [],
  collection: "",
  material: "",
  gender: "",
  images: [
   {
    url: "https://picsum.photos/150?random=1",
   },
   {
    url: "https://picsum.photos/150?random=2",
   },
  ],
 });

 const handleChange = (e) => {
  const { name, value } = e.target;
  setProductData({
   ...productData,
   [name]: value,
  });
 }

 const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  console.log("Uploading image:", file);
 };

 const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Updated Product Data:", productData);
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
    {/*Sizes */}
    <div className="mb-6">
     <label className="block font-semibold mb-2">Sizes (comma-separated)</label>  
     <input
      type="text"
      name="sizes"  
      value={productData.sizes.join(", ")}
      onChange={(e) => setProductData({...productData, sizes: e.target.value.split(",").map(size => size.trim())})}
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
      onChange={(e) => setProductData({...productData, colors: e.target.value.split(",").map(color => color.trim())})}
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