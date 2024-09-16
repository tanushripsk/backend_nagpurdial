// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json()); // Not needed for file uploads but good for other APIs

mongoose
  .connect("mongodb://localhost/photo-gallery", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

// Define the image schema
const imageSchema = new mongoose.Schema({
  filename: String,
  path: String,
  contentType: String,
  businessName: String,
  address: String,
  mobileNumber: String,
});
const Image = mongoose.model("Image", imageSchema);

// Route to handle image and form data upload
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (req.fileValidationError) {
      return res.status(400).json({ message: req.fileValidationError });
    }
    console.log("Received file:", req.file);
    console.log("Received body:", req.body);

    const { businessName, address, mobileNumber } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Validate form data
    if (!businessName || !address || !mobileNumber) {
      return res.status(400).json({ message: "All form fields are required" });
    }

    // Create a new Image document
    const newImage = new Image({
      filename: req.file.filename,
      path: req.file.path,
      contentType: req.file.mimetype,
      businessName,
      address,
      mobileNumber,
    });
    await newImage.save();
    res
      .status(201)
      .json({ message: "Image and business details uploaded successfully!" });
  } catch (error) {
    console.error("Error uploading image and details:", error);
    res.status(500).json({ message: "Error uploading image and details" });
  }
});

// Route to get all images
app.get("/images", async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ message: "Error fetching images" });
  }
});

// Route to search images by business name or address
app.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }
    const images = await Image.find({
      $or: [
        { businessName: { $regex: query, $options: "i" } },
        { address: { $regex: query, $options: "i" } },
      ],
    });
    res.json(images);
  } catch (error) {
    console.error("Error searching images:", error);
    res.status(500).json({ message: "Error searching images" });
  }
});

// Serve static files from 'uploads' directory
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
