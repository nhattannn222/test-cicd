const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
  res.json({ message: "Hello World!" });
});

router.post('/sum', (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a + b });
});

module.exports = router;
