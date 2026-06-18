const announcements = [
  {
    title: "Company Retreat",
    date: "20 June 2026",
  },
  {
    title: "New Leave Policy",
    date: "25 June 2026",
  },
  {
    title: "Office Holiday",
    date: "30 June 2026",
  },
];

export default function AnnouncementsWidget() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <h2 className="mb-4 text-xl font-semibold">
        Announcements
      </h2>

      <div className="space-y-4">
        {announcements.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"
          >
            <h3 className="font-medium">
              {item.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {item.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}