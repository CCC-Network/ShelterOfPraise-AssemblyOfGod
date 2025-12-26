import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("/api/auth/login", { username, password });
      // store token or redirect
      localStorage.setItem("token", res.data.token);
      window.location.href = "/admin/dashboard";
    } catch (err: any) {
      setMessage("Invalid username/email or password.");
    }
  };

  const handleForgotPassword = async () => {
    setMessage("");
    try {
      await axios.post("/api/auth/forgot-password", { username });
      setMessage("Reset link sent to the registered email.");
    } catch (err: any) {
      setMessage("Failed to send reset email.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded p-8 w-80"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>

        <label className="block mb-2 text-sm">Username / Email</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="admin@shelterofpraise.org"
          className="border rounded w-full p-2 mb-4"
          required
        />

        <label className="block mb-2 text-sm">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="border rounded w-full p-2 mb-4"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>

        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-blue-500 hover:underline mt-3 block mx-auto"
        >
          Forgot password?
        </button>

        {message && (
          <p className="text-center text-red-500 text-sm mt-4">{message}</p>
        )}
      </form>
    </div>
  );
}
