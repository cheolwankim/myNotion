const express = require("express");
const router = express.Router();
const Doc = require("../models/Doc");

// 문서 생성
router.post("/", async (req, res) => {
  try {
    const { title, userId } = req.body;

    const newDoc = new Doc({
      title,
      user: userId, // ✅ 작성자 이메일을 저장
    });

    const saved = await newDoc.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: "문서 생성 실패" });
  }
});

// 문서 목록 조회
router.get("/:userId", async (req, res) => {
  try {
    const docs = await Doc.find({ user: req.params.userId });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: "문서 조회 실패" });
  }
});

// 문서 1개 조회
router.get("/item/:id", async (req, res) => {
  try {
    const doc = await Doc.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "문서를 찾을 수 없습니다" });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: "문서 조회 실패" });
  }
});

// 문서 수정
router.put("/:id", async (req, res) => {
  const { title, content, userEmail } = req.body;

  try {
    const doc = await Doc.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: "문서 없음" });

    if (doc.user !== userEmail) {
      return res.status(403).json({ error: "수정 권한 없음" });
    }

    const updated = await Doc.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "문서 수정 실패" });
  }
});


// 문서 삭제 (POST로 변경하여 이메일도 body에 포함)
router.post("/delete", async (req, res) => {
  const { id, userEmail } = req.body;

  try {
    const doc = await Doc.findById(id);
    if (!doc) return res.status(404).json({ message: "문서를 찾을 수 없습니다." });

    if (doc.user !== userEmail) {
      return res.status(403).json({ message: "삭제 권한이 없습니다." });
    }

    await doc.deleteOne();
    res.json({ message: "삭제 성공" });
  } catch (err) {
    res.status(500).json({ error: "문서 삭제 실패", message: err.message });
  }
});






module.exports = router;
