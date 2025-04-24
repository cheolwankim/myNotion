const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000", // 개발용
      "https://my-notion2-5a8hwmtza-cheolwan-kims-projects.vercel.app", // ✅ 배포용 프론트 주소
    ],
    credentials: true,
  })
);
app.use(express.json());

// routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/api/docs", require("./routes/docRoutes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`✅ Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));
