const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
  res.json({ message: "Hello World!" });
});

router.post('/sum', (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a + b });
});

// --- API MỚI CỦA V3 ---
router.post('/multiply', (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a * b });
});

router.get('/user/:id', (req, res) => {
    const idParam = req.params.id;
    const id = parseInt(idParam);
    if (isNaN(id)) return res.status(400).json({ error: "Invalid ID format" });
    if (id === 0) return res.status(404).json({ error: "User not found" });
    res.json({ id: id, name: `User ${id}` });
});

module.exports = router;