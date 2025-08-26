import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import adminRoute from "./route/admin.route.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Get the directory name in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;
const mongo_uri = process.env.MONGO_URI;

// ✅ Connect to MongoDB
mongoose
  .connect(mongo_uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) =>
    console.log("❌ Error connecting to MongoDB:", error.message)
  );

// API routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);

// Serve static files from the React app build directory
const clientBuildPath = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientBuildPath));

// Catch-all handler to send the React app for any non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
