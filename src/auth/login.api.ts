// POST /api/auth/login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    // Replace with values from database or .env
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
  
    const isMatch = username === ADMIN_EMAIL || username === ADMIN_USERNAME;
    if (!isMatch) return res.status(401).send("Invalid credentials");
  
    const validPass = await bcrypt.compare(password, storedPasswordHash);
    if (!validPass) return res.status(401).send("Invalid credentials");
  
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET!, { expiresIn: "1h" });
    res.json({ token });
  });
  