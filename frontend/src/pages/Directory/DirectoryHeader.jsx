import { Users } from "lucide-react";

export default function DirectoryHeader() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-800">
          <Users size={22} className="text-slate-900 dark:text-slate-100" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Directory
          </h1>

          <p className="text-slate-500 dark:text-slate-400">
            Find and connect with colleagues
          </p>
        </div>
      </div>
    </div>
  );
}