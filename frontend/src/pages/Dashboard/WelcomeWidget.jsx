export default function WelcomeWidget({name, position, department}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Welcome Back 👋
      </p>

      <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
        {name}
      </h2>

      <p className="mt-1 text-slate-500 dark:text-slate-400">
        {position} • {department}
      </p>
    </div>
  );
}