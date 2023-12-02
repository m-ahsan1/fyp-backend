const express = require("express");
const mongoose = require("mongoose");
const blogsRoutes = require("./routes/blogsRoutes");
const cors = require("cors");

// Create an Express app
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, res.method);
  next();
});

// Aik he database use karni, no need to create multiple instead create collections in it
mongoose
  .connect("mongodb://127.0.0.1:27017/bidding-bazaar")
  .then(() => console.log("Database Connected!"));

// create routes in the routes folder, import and add here
app.use("/api/blogs", blogsRoutes);

// Define the port to listen on
const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
