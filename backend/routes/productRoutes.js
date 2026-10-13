const express = require("express");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// @route POST /api/products
// @desc Create a new product
//@access Private/Admin
router.post("/", protect, admin, async (req, res) => {
 try {
  const {
   name, 
   description, 
   price, 
   discountPrice, 
   countInStock,
   category,
   brand,
   sizes,
   colors,
   collections,
   material,
   gender,
   images,
   isFeatured,
   isPublished,
   tags,
   dimensions,
   weight,
   sku,
  } = req.body;
  
  const product = new Product({
   name, 
   description, 
   price, 
   discountPrice, 
   countInStock,
   category,
   brand,
   sizes,
   colors,
   collections,
   material,
   gender,
   images,
   isFeatured,
   isPublished,
   tags,
   dimensions,
   weight,
   sku,
   user: req.user._id, //Reference to the admin user who added the product
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
 } catch (error) {
  console.error(error);
  res.status(500).send("Server Error");
 }
});

// @route PUT /api/products/:id
//@desc Update an existing product ID
// @access Private/admin
router.put("/:id", protect, admin, async (req, res) => {
 try {
  const {
   name, 
   description, 
   price, 
   discountPrice, 
   countInStock,
   category,
   brand,
   sizes,
   colors,
   collections,
   material,
   gender,
   images,
   isFeatured,
   isPublished,
   tags,
   dimensions,
   weight,
   sku,
  } = req.body;

  //find product by ID 
  const product = await Product.findById(req.params.id);

  if(product) {
   //Update product fields
   if (name !== undefined) product.name = name;
   if (description !== undefined) product.description = description;
   if (price !== undefined) product.price = price;
   if (discountPrice !== undefined) product.discountPrice = discountPrice;
   if (countInStock !== undefined) product.countInStock = countInStock;
   if (category !== undefined) product.category = category;
   if (sizes !== undefined) product.sizes = sizes;
   if (colors !== undefined) product.colors = colors;
   if (brand !== undefined) product.brand = brand;
   if (collections !== undefined) product.collections = collections;
   if (material !== undefined) product.material = material;
   if (gender !== undefined) product.gender = gender;
   if (images !== undefined) product.images = images;
   if (isFeatured !== undefined) product.isFeatured = isFeatured;
   if (isPublished !== undefined) product.isPublished = isPublished;
   if (tags !== undefined) product.tags = tags;
   if (dimensions !== undefined) product.dimensions = dimensions;
   if (weight !== undefined) product.weight = weight;
   if (sku !== undefined) product.sku = sku;

   //save the update product to the DB
   const updatedProduct = await product.save();
   res.json(updatedProduct);
  } else {
   res.status(404).json({ message: "Product not found" });
  }
 } catch (error) {
  console.error(error);
  res.status(500).send("Server Error");
 }
});

// @route DELETE /api/product/:id
// @desc delete a product by ID
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => { 
 try {
 //Find the product ID
  const product = await Product.findById(req.params.id);

  if(product) {
   //remove the product from DB 
   await product.deleteOne();
   res.json({message: "Product Removed"});
  } else {
   res.status(404).json({message: "Product not found"});
  }
 } catch (error) {
  console.error(error);
  res.status(500).send("Server Error")
 }
});

// @route GET /api/products
// @desc get all products with optional query filters
// @access public
router.get("/", async (req, res) => {
 try {
  const {
   collection,
   size,
   color,
   gender, 
   minPrice,
   maxPrice,
   sortBy,
   search,
   category,
   material,
   brand,
   limit
  } = req.query;

  let query = {};

  // Filter logic
  if (collection && collection.toLocaleLowerCase() !== "all") {
   query.collection = collection;
  }
  
  if (category && category.toLocaleLowerCase() !== "all") {
   query.category = category;
  }
  
  if(material) {
   query.material = { $in: material.split(",") };
  }

  if(brand) {
   query.brand = { $in: brand.split(",") };
  }

  if(size) {
   query.sizes = { $in: size.split(",") };
  }

  if (color) {
   query.colors = { $in: [color] };
  }

  if(gender){
   query.gender = gender;
  }

  if (minPrice || maxPrice) {
   query.price = {};
   if (minPrice) query.price.$gte = Number(minPrice);
   if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  if (search) {
   query.$or = [
    { name: { $regex: search, $options: "i" } },
    { description: { $regex: search, $options: "i" } },
   ]
  }

  // Sort Logic 
  let sort = {};
  if(sortBy) {
   switch (sortBy) {
    case "priceAsc": 
     sort = {price: 1};
     break;
    case "priceDesc":
     sort = {price: -1};
     break;
    case "popularity":
     sort = {rating: -1};
     break;
    default:
     break;
   }
  }

  //Fetch products and apply sorting and limit
  let product = await Product.find(query)
   .sort(sort)
   .limit(Number(limit) || 0);
  res.json(product);
 } catch (error) {
  console.error(error);
  res.status(500).send("Server Error");
 }
});

// @route GET /api/products/best-seller
// @desc Retrieve the product with highest rating
// @access Public
router.get("/best-seller", async (req, res) => {
 try {
  const bestSeller = await Product.findOne().sort({ rating: -1});
  if (bestSeller) {
   res.json(bestSeller);
  } else {
   res.status(404).json({messgae: "No best seller found" });
  }
 } catch (error) {
  console.error(error);
  res.status(500).send("Server Error");
 }
});

// @route GET /api/products/new-arrivals
// @desc Retrieve latest 8 products - creation date
// @access Public
router.get("/new-arrivals", async (req, res) => {
 try {
  //fetch latest 8 product from DB
  const newArrivals = await Product.find().sort({ createdAt: -1}).limit(8);
  res.json(newArrivals);
 } catch (error) {
  console.error(error);
  res.status(500).send("Server Error");
 }
});


// @route GET /api/products/:id
// @desc Get a single product by ID
// @access public
router.get("/:id", async (req, res) => {
 try {
  const product = await Product.findById(req.params.id);
  if(product) {
   res.json(product);
  } else {
   res.status(404).json({ message: "Product Not Found" });
  }
 } catch (error) {
  console.error(error);
  res.status(500).send("Server Error");
 }
});

// @route GET /api/products/similar/:id
// @desc Retrieve similar products based on the current product's gender and category
//@access Public
router.get("/similar/:id", async (req, res) => {
 const { id } =req.params;
 
 try {
  const product = await Product.findById(id);

  if(!product) {
   return res.status(404).json({message: "Product Not Found"});
  }

  const similarProducts = await Product.find({
   _id: {$ne: id}, //Excluded the searcched product
   gender: product.gender,
   category: product.category,
  }).limit(4);

  res.json(similarProducts);

 } catch (error) {
  console.error(error);
  res.status(500).send("Server Error")
 }
});

module.exports = router;