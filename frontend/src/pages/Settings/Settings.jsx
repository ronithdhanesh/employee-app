import { useEffect, useState } from "react";
import api from "../../api/axios"
import ProfileSection from "./ProfileSection";
import PersonalInfoForm from "./PersonalInfoForm";

export default function Settings() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    setError("");
    setLoading(true);

    try {
      const res = await api.get("/auth/me");
      setEmployee(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load profile."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex-1 p-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="mt-2 text-slate-500">
            Manage your account settings
          </p>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            Loading profile...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
            {error}
          </div>
        ) : (
          <>
            <ProfileSection employee={employee} />
            <PersonalInfoForm
              employee={employee}
              onProfileUpdated={fetchProfile}
            />
          </>
        )}
      </div>
    </main>
  );
}