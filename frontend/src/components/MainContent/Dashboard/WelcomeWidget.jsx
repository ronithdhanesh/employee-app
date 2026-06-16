export default function WelcomeWidget() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <p className="text-sm text-slate-500">
        Welcome Back 👋
      </p>

      <h2 className="mt-2 text-3xl font-bold">
        John Doe
      </h2>

      <p className="mt-1 text-slate-500">
        Software Engineer • Engineering
      </p>
    </div>
  );
}