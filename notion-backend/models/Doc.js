const mongoose = require("mongoose");

const docSchema = new mongoose.Schema({
  title: String,
  content: String, // ✅ TipTap HTML 저장
  user: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Doc", docSchema);
