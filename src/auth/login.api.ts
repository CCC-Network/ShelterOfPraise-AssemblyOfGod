import { Router, type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a new router instance
const router = Router();

// Define the request body type
interface LoginRequest extends Request {
  body: {
    username: string;
    password: string;
  }
}

// POST /api/auth/login
router.post("/login", async (req: LoginRequest, res: Response) => {
  try {
    const { username, password } = req.body;
    const { ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD_HASH, JWT_SECRET } = process.env;

    // Validate required environment variables
    if (!ADMIN_EMAIL || !ADMIN_USERNAME || !ADMIN_PASSWORD_HASH || !JWT_SECRET) {
      return res.status(500).send("Server configuration error");
    }

    // Check username/email
    const isMatch = username === ADMIN_EMAIL || username === ADMIN_USERNAME;
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    // Check password
    const validPass = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!validPass) {
      return res.status(401).send("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("An error occurred during login");
  }
});

export default router;