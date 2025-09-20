const express = require("express");
const mysql = require("mysql2");
const app = express();
const connectDB = require("./db"); // Import DB connection
const { uploadOnCloudinary } = require("./cloudinary"); // Cloudinary upload
const Project = require("./projects.model"); // Project model
const Contact = require("./contact.model"); // Contact model
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middlewares
app.set("view engine", "ejs");

const path = require("path");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const axios = require("axios");
const multer = require("multer");
const storage = multer.memoryStorage(); // store file in memory buffer
const upload = multer({ storage: storage });

// Routes
app.get("/", async (req, res) => {
  res.render("home"); // ✅ fixed
});

app.get("/about", async (req, res) => {
  res.render("about"); // ✅ fixed
});

app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.render("projects", { projects }); // ✅ fixed
  } catch (error) {
    res.status(500).send("Error fetching projects");
  }
});

app.get("/aaa", async (req, res) => {
  console.log("Request received at /aaa");
  res.render("form"); // ✅ fixed
});

// New route to display all contact messages from the database
app.get("/bbb", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ receivedAt: -1 });
    res.render("messages", { messages }); // ✅ fixed
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Error fetching messages.");
  }
});

app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).send("All fields are required.");
    }

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    console.log("Received and saved a new contact message:");
    console.log(newContact);

    res.redirect("/contact?success=true"); // Redirect with a success parameter
  } catch (error) {
    console.error("Error handling contact form:", error);
    res.status(500).send("Something went wrong!");
  }
});

app.get("/skills", async (req, res) => {
  res.render("skills"); // ✅ fixed
});

app.get("/contact", async (req, res) => {
  res.render("contact"); // ✅ fixed
});

// Handle project upload
app.post("/projectUpload", upload.single("banner"), async (req, res) => {
  try {
    const { name, liveLink, githubLink, description, technologies } = req.body;

    // Upload banner to Cloudinary
    const fileBuffer = req.file?.buffer;
    const bannerUpload = await uploadOnCloudinary(fileBuffer, {
      folder: "portfolio_projects",
    });

    const newProject = new Project({
      name,
      banner: bannerUpload?.secure_url,
      liveLink: liveLink || "",
      githubLink,
      description,
      technologies: technologies.split(",").map((tech) => tech.trim()),
    });

    newProject
      .save()
      .then((savedProject) => {
        res.redirect("/projects"); // redirect to projects page
      })
      .catch((err) => res.status(500).send("Error saving project: " + err));
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});