const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

app.get("/", (req,res) => {
 res.send("WELCOME TO SHOPSPHERE API");
})

//API Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

const startServer = async () => {
 await connectDB();

 app.listen(PORT, ()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
 })
};

startServer();