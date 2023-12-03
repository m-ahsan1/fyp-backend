const express = require("express");
const mongoose = require("mongoose");
const blogsRoutes = require("./routes/blogsRoutes");
const listingsRoutes = require("./routes/listingsRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes")
<<<<<<< Updated upstream
const userRoutes = require("./routes/userRoutes");
=======
const notificationRoutes = require("./routes/notificationRoutes");
>>>>>>> Stashed changes
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
  .then(() => console.log("Database Connected!"))
  .catch((error) => {
    // Handle errors
    console.error("Error:", error);
  });

// create routes in the routes folder, import and add here
app.use("/api/blogs", blogsRoutes);
app.use("/api/listings", listingsRoutes);
app.use("/api/analytics", analyticsRoutes);
<<<<<<< Updated upstream
app.use("/api/users", userRoutes);
=======
app.use("/api/notification", notificationRoutes);
>>>>>>> Stashed changes

// Define the port to listen on
const PORT = process.env.PORT || 3001;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
