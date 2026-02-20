import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordCard, { MailIcon, CheckIcon } from "../../components/ui/PasswordCard";
import api from "../../api/axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
    const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
// console.log("email",email)
      await api.post(
        `/api/sendRestPassLink`,
        { email }
      );

      navigate("/link-send-success");

    } catch (err) {
      setError("Invalid or expired reset link.");
      console.log("error",err)
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <PasswordCard>
        <div className="text-center py-4">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-green-100">
            <CheckIcon />
          </div>
          <h2 className="text-2xl font-black text-[#3d1a6e] mb-2">Check Your Email</h2>
          <p className="text-sm text-[#8e6db0] mb-1">We've sent a password reset link to</p>
          <p className="text-sm font-bold text-[#7b2fbe] mb-6">{email}</p>
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3.5 bg-gradient-to-r from-[#7b2fbe] to-[#9b59b6] text-white font-bold rounded-xl shadow-md"
          >
            Back to Login
          </button>
          <button onClick={() => setSent(false)} className="mt-3 w-full py-2.5 border-2 border-[#d9c5f0] text-[#7b2fbe] font-semibold rounded-xl hover:bg-[#f3e8ff] transition-colors text-sm">
            Resend Email
          </button>
        </div>
      </PasswordCard>
    );
  }

  return (
    <PasswordCard>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-[#7b2fbe] to-[#9b59b6] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-200 text-white">
          <MailIcon />
        </div>
        <h1 className="text-2xl font-black text-[#3d1a6e] mb-1">Forgot Password?</h1>
        <p className="text-sm text-[#8e6db0]">Enter your email and we'll send you a reset link.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-[#5a2d8a] mb-1.5">Email Address</label>
          <div className="relative flex items-center">
            <span className="absolute left-3 text-[#9b59b6]"><MailIcon /></span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-[#d9c5f0] bg-white text-[#3d1a6e] placeholder-[#c4a8e0] focus:outline-none focus:border-[#7b2fbe] text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !email}
          className="w-full py-3.5 bg-gradient-to-r from-[#7b2fbe] to-[#9b59b6] text-white font-bold rounded-xl shadow-md disabled:opacity-50 mb-4"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

       
      </form>
    </PasswordCard>
  );
}