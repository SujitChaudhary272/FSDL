const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const MAX_PORT_ATTEMPTS = 10;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in .env file.");
  process.exit(1);
}

// Reuse one MongoDB client for the full app lifecycle.
mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 30000,
  })
  .then(() => {
    console.log("Connected to MongoDB successfully.");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });

const registrationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address."],
    },
    eventName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
  },
  {
    timestamps: true,
  }
);

const Registration = mongoose.model("Registration", registrationSchema);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, eventName } = req.body;

    if (!name || !email || !eventName) {
      return res.status(400).json({
        success: false,
        message: "Name, Email, and Event Name are required.",
      });
    }

    const registration = await Registration.create({
      name,
      email,
      eventName,
    });

    return res.status(201).json({
      success: true,
      message: "Registration saved successfully.",
      data: {
        id: registration._id,
        name: registration.name,
        email: registration.email,
        eventName: registration.eventName,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error while saving registration.",
    });
  }
});

app.get("/api/registrations", async (req, res) => {
  try {
    const registrations = await Registration.find({}, { __v: 0 })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error while fetching registrations.",
    });
  }
});

function startServer(port, attempt = 0) {
  const server = app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE" && attempt < MAX_PORT_ATTEMPTS) {
      const nextPort = port + 1;
      console.warn(`Port ${port} is busy. Retrying on ${nextPort}...`);
      startServer(nextPort, attempt + 1);
      return;
    }

    console.error("Server failed to start:", error.message);
    process.exit(1);
  });
}

startServer(PORT);
