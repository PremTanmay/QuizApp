require("dotenv").config();
const express = require("express");
const { dbConnect } = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const authRouter = require("./routes/authRouter");
const quizRouter = require("./routes/quizRouter");

app.use("/", authRouter);
app.use("/", quizRouter);

const PORT = process.env.PORT || 8000;

dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
