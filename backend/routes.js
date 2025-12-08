const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
  res.json({ message: "Hello World!" });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // === CASE 5: Both empty ===
  if (!username && !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  // === CASE 7: Missing username ===
  if (!username) {
    return res.status(400).json({ error: "Username required" });
  }

  // === CASE 6: Missing password ===
  if (!password) {
    return res.status(400).json({ error: "Password required" });
  }

  // === CASE 8 & 9: Space in username or password ===
  if (/\s/.test(username)) {
    return res.status(400).json({ error: "Username cannot contain spaces" });
  }
  if (/\s/.test(password)) {
    return res.status(400).json({ error: "Password cannot contain spaces" });
  }

  // === CASE 12: Double quotes — expected 400 ===
  if (/"/.test(username) || /"/.test(password)) {
    return res.status(400).json({ error: "Double quote not allowed" });
  }

  // === CASE 14 & 15: HTML/XSS Injection (<> tags) ===
  if (/<.*?>/.test(username) || /<.*?>/.test(password)) {
    return res.status(401).json({ error: "HTML/XSS detected" });
  }

  // === CASE 10,11,13: SQL Injection patterns → 401 ===
  const sqlPatterns = [
    /'/, /--/, / OR /i, /1=1/, /DROP/i, /;/,
  ];
  if (sqlPatterns.some(p => p.test(username) || p.test(password))) {
    return res.status(401).json({ error: "SQL Injection detected" });
  }

  // === CASE 18 & 20: Username length invalid ===
  if (username.length < 2 || username.length > 255) {
    return res.status(401).json({ error: "Invalid username length" });
  }

  // === CASE 19 & 21: Password length invalid ===
  if (password.length < 2 || password.length > 255) {
    return res.status(401).json({ error: "Invalid password length" });
  }

  // === CASE 16: Username contains special characters → 401 ===
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return res.status(401).json({ error: "Invalid username characters" });
  }

  // === CASE 17: Password contains special chars → 401 ===
  if (!/^[a-zA-Z0-9_]+$/.test(password)) {
    return res.status(401).json({ error: "Invalid password characters" });
  }

  // === CASE 1: Happy path ===
  if (username === "datuan" && password === "datuan") {
    return res.status(200).json({ message: "Login success!" });
  }

  // === CASE 2,3,4,22: Wrong credentials ===
  return res.status(401).json({ error: "Invalid username or password" });
});


module.exports = router;