import { Users } from "lucide-react";

export default function DirectoryHeader() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-slate-100 p-3">
          <Users size={22} />
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            Directory
          </h1>

          <p className="text-slate-500">
            Find and connect with colleagues
          </p>
        </div>
      </div>
    </div>
  );
}