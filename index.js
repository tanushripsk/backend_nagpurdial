const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const Locations = require("./models/Locations");
var jwt = require("jsonwebtoken");
const jwt_key = "gayatrimam@123";

const app = express();

// Ensure the uploads directory exists
const fs = require("fs");
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const buildpath = path.join(__dirname, "../build");
app.use(express.static(buildpath));

// Middleware
app.use(
  cors({
    origin: "*", // Allow all origins
  })
);
app.use(express.json());
app.use(bodyParser.json());

// MongoDB connection
//"mongodb+srv://psktanushri22dhote:Tanushri@22@nagpurdial.jmqri.mongodb.",
mongoose.connect("mongodb://localhost:27017/NagpurDial1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Schema and model for file uploads
const uploadSchema = new mongoose.Schema({
  files: [
    {
      filename: String,
      path: String,
      contentType: String,
    },
  ],
  firstname: String,
  middlename: String,
  lastname: String,
  email: String,
  number: String,
  businessname: String,
  description: String,
  location: String,
  pincode: String,
});
const Upload = mongoose.model("Upload", uploadSchema);

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// Routes for search by locations
app.post("/api/search", async (req, res) => {
  const { locationsName } = req.body;
  try {
    const locations = await Locations.find({
      name: { $regex: locationsName, $options: "i" }, // Case-insensitive search by component name
    });
    res.json(locations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Routes for search by business name and address as well
app.post("/api/location", async (req, res) => {
  const { locationsName } = req.body;
  if (typeof locationsName !== "string" || locationsName.trim() === "") {
    return res.status(400).json({ message: "Invalid input" });
  }
  try {
    const locations = await Locations.find({
      $or: [
        { description: { $regex: locationsName, $options: "i" } },
        { name: { $regex: locationsName, $options: "i" } },
      ],
    });
    res.json(locations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to handle file upload
app.post("/freelisting", upload.array("files"), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("Please upload one or more files");
    }

    const filesArray = req.files.map((file) => ({
      filename: file.filename,
      path: file.path,
      contentType: file.mimetype,
    }));

    // Create a new Upload document
    const newUpload = new Upload({
      files: filesArray,
      businessname: req.body.name,
      description: req.body.description,
      firstname: req.body.firstname,
      middlename: req.body.middlename,
      lastname: req.body.lastname,
      email: req.body.email,
      number: req.body.number,
      location: req.body.location,
      pincode: req.body.pincode,
    });
    await newUpload.save();
    res.send("Files uploaded successfully");
  } catch (error) {
    console.error("Error uploading files:", error);
    res.status(500).send("Failed to upload files");
  }
});

// schema for login
app.use(bodyParser.json());
const userSchema = new mongoose.Schema({
  email: String,
  number: String,
});
const User = mongoose.model("User", userSchema);

// Login route
app.post("/login", async (req, res) => {
  try {
    const { email, number } = req.body;
    if (!email || !number) {
      return res.status(400).send("Email and number are required");
    }
    const user = await User.findOne({ email, number });
    if (!user) {
      return res.status(401).send("Invalid email or number");
    }
    res.status(200).send("Login successful");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error during request:", err);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
