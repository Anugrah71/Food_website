export default function StrengthBar({ password }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "#e74c3c", "#f39c12", "#2ecc71", "#27ae60"];

  if (!password) return null;
  return (
    <div className="mb-5 -mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-1.5 flex-1 rounded-full"
            style={{ backgroundColor: i <= score ? colors[score] : "#e5e7eb" }} />
        ))}
      </div>
      <p className="text-xs font-medium" style={{ color: colors[score] }}>{labels[score]} password</p>
    </div>
  );
}