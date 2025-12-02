const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
  res.json({ message: "Hello World!" });
});

router.post('/sum', (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a + b });
});

// NEW: user route
router.get('/user/:id', (req, res) => {
  const id = req.params.id;

  // invalid id
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid ID format" });
  }

  // not found
  if (parseInt(id) < 1) {
    return res.status(404).json({ error: "User not found" });
  }

  // success
  res.json({
    id: parseInt(id),
    name: "User " + id
  });
});

module.exports = router;
