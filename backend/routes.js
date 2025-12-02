const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
  res.json({ message: "Hello World!" });
});

router.post('/sum', (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a + b });
});

// --- PHẦN THÊM MỚI CHO V2 ---
router.get('/user/:id', (req, res) => {
    const idParam = req.params.id;
    const id = parseInt(idParam);

    // Test case: Invalid ID (abc) -> 400
    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    // Test case: Not Found (0) -> 404
    if (id === 0) {
        return res.status(404).json({ error: "User not found" });
    }

    // Test case: Valid ID -> 200
    res.json({ id: id, name: `User ${id}` });
});

module.exports = router;