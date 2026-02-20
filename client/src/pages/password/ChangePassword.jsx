import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "../../components/ui/PasswordInput";
import StrengthBar from "../../components/ui/StrengthBar";
import PasswordCard, { BackIcon } from "../../components/ui/PasswordCard";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";




export default function ChangePassword() {
  const [old, setOld] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { userEmail } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError("");
 
    if (newPass.length < 8)
      return setError("New password must be at least 8 characters.");

    if (newPass !== confirm)
      return setError("Passwords do not match.");

    try {
      setLoading(true);
// console.log(">>>>",userEmail)
      await api.patch(
        `/api/change-current-pass`,
        { email: userEmail, password: newPass,oldPassword:old }
      );

      navigate("/password-success");

    } catch (err) {
      setError("Invalid or expired reset link.");
      console.log("error",err)
    } finally {
      setLoading(false);
    }
  };
  return (
    <PasswordCard>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-black text-[#3d1a6e] mb-1">Change Password</h1>
        <p className="text-sm text-[#8e6db0]">Keep your account secure with a strong password</p>
      </div>

      <form onSubmit={handleSubmit}>
        <PasswordInput
          label="Current Password"
          value={old}
          onChange={(e) => setOld(e.target.value)}
          placeholder="Enter current password"
        />

        <PasswordInput
          label="New Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          placeholder="Enter new password"
        />
        <StrengthBar password={newPass} />

        <PasswordInput
          label="Confirm New Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Re-enter new password"
        />

        {confirm && (
          <p className={`text-xs font-medium -mt-3 mb-4 ${newPass === confirm ? "text-green-500" : "text-red-400"}`}>
            {newPass === confirm ? "✓ Passwords match" : "✗ Passwords do not match"}
          </p>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-gradient-to-r from-[#7b2fbe] to-[#9b59b6] text-white font-bold rounded-xl transition-all duration-200 shadow-md disabled:opacity-70 mb-6"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

        <div className="flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={() => navigate(-1)} 
            className="flex items-center gap-1.5 text-[#8e6db0] hover:text-[#7b2fbe] transition-colors font-medium"
          >
            <BackIcon /> Back
          </button>
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-[#7b2fbe] hover:text-[#5a1fa0] font-semibold transition-colors"
          >
            Forgot Password?
          </button>
        </div>
      </form>
    </PasswordCard>
  );
}