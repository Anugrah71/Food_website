import { useNavigate } from "react-router-dom";
import PasswordCard, { CheckIcon } from "../../components/ui/PasswordCard";

export default function LinkSendSuccess() {
  const navigate = useNavigate();

  return (
    <PasswordCard>
      <div className="text-center py-4">
        <div className="w-20 h-20 bg-gradient-to-br from-[#7b2fbe] to-[#9b59b6] rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-purple-200">
          <CheckIcon />
        </div>
        <h2 className="text-2xl font-black text-[#3d1a6e] mb-2">Link has send!</h2>
        <p className="text-sm text-[#8e6db0] mb-8">Check you gmail account</p>
        <button
          onClick={() => navigate("/")}
          className="w-full py-3.5 bg-gradient-to-r from-[#7b2fbe] to-[#9b59b6] text-white font-bold rounded-xl shadow-md"
        >
          Go to My Account
        </button>
      </div>
    </PasswordCard>
  );
}