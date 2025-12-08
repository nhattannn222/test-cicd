const express = require('express');
const router = express.Router();

// ---------------------- HELLO ----------------------
router.get('/hello', (req, res) => {
  res.json({ message: "Hello World!" });
});

// ---------------------- LOGIN ----------------------
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // --- CASE 5,6,7: Empty ---
  if (!username && !password) {
    return res.status(400).json({ error: "Username and password required" });
  }
  if (!username) {
    return res.status(400).json({ error: "Username required" });
  }
  if (!password) {
    return res.status(400).json({ error: "Password required" });
  }

  // --- Trim spaces ---
  const user = username.trim();
  const pass = password.trim();

  // --- CASE 8,9: Only spaces ---
  if (user === "" || pass === "") {
    return res.status(400).json({ error: "Username/password cannot be only spaces" });
  }

  // --- CASE 12: Double quotes ---
  if (user.includes('"') || pass.includes('"')) {
    return res.status(400).json({ error: "Double quote not allowed" });
  }

  // --- CASE 14-17: XSS, HTML, special chars ---
  const unsafeRegex = /[<>/'";]/;
  if (unsafeRegex.test(user) || unsafeRegex.test(pass)) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  // --- CASE 18-21: Length check ---
  if (user.length < 2 || user.length > 255) {
    return res.status(401).json({ error: "Invalid username length" });
  }
  if (pass.length < 2 || pass.length > 255) {
    return res.status(401).json({ error: "Invalid password length" });
  }

  // --- CASE 16-17: Alphanumeric only for user/pass ---
  if (!/^[a-zA-Z0-9_]+$/.test(user)) {
    return res.status(401).json({ error: "Invalid username characters" });
  }
  if (!/^[a-zA-Z0-9_]+$/.test(pass)) {
    return res.status(401).json({ error: "Invalid password characters" });
  }

  // --- CASE 1: Happy path ---
  if (user === "datuan" && pass === "datuan") {
    return res.status(200).json({
      data: {
        access_token: "mock_token_123"
      }
    });
  }

  // --- CASE 2,3,4,10-13,16-22: Wrong credentials or SQL Injection ---
  return res.status(401).json({ error: "Invalid username or password" });
});


module.exports = router;
