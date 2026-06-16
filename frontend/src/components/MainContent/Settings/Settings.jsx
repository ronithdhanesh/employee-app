import ProfileSection from "./ProfileSection";
import PersonalInfoForm from "./PersonalInfoForm";

export default function Settings() {
  return (
    <main className="flex-1 p-8">
      <div className="space-y-6">

        <div>
          <h1 className="text-3xl font-bold">
            Settings
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your account settings
          </p>
        </div>

        <ProfileSection />

        <PersonalInfoForm />

      </div>
    </main>
  );
}