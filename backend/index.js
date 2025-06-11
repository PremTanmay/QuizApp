const express = require("express");
console.log("hhh");

const { dbConnect } = require("./config/dbConnect");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
console.log("hhh");

app.use(express.json());
app.use(cookieParser());
// app.use((req, res, next) => {
//   console.log("CORS Origin:", req.headers.origin);
//   next();
// });
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

dbConnect()
  .then(() => {
    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
console.log("heyyy");
