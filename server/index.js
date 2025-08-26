import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import adminRoute from "./route/admin.route.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;
const mongo_uri = process.env.MONGO_URI;

// ✅ Connect to MongoDB
mongoose
  .connect(mongo_uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) =>
    console.log("❌ Error connecting to MongoDB:", error.message)
  );

// defining route
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/admin", adminRoute);

app.get("/", (req, res) => {
  res.send("Server is running...");
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
