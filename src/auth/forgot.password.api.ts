import { Router, type Request, type Response } from 'express';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a new router instance
const router = Router();

// Define the request body type
interface ForgotPasswordRequest extends Request {
  body: {
    username: string;
  }
}

// POST /api/auth/forgot-password
router.post("/forgot-password", async (req: ForgotPasswordRequest, res: Response) => {
  const { username } = req.body;

  if (username !== process.env.ADMIN_EMAIL && username !== process.env.ADMIN_USERNAME) {
    return res.status(400).send("Invalid email");
  }

  // Send email with a reset link
  await sendResetEmail(process.env.ADMIN_EMAIL);
  res.json({ success: true });
});

function sendResetEmail(email: string | undefined): Promise<void> {
  if (!email) {
    throw new Error("Email is required");
  }
  // TODO: Implement email sending logic here
  console.log(`Sending reset email to: ${email}`);
  return Promise.resolve();
}

export default router;