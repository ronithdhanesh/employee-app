import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { PickerDay } from "@mui/x-date-pickers";

export default function CalendarWidget({ leaves }) {
  const getLeaveForDate = (date) => {
    return leaves.find((leave) => {
      const current = dayjs(date);
      const start = dayjs(leave.startDate);
      const end = dayjs(leave.endDate);

      return (
        current.isSame(start, "day") ||
        current.isSame(end, "day") ||
        (current.isAfter(start) && current.isBefore(end))
      );
    });
  };

  const ServerDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;

    const leave = getLeaveForDate(day);
    let sx = {};

    if (leave && !outsideCurrentMonth) {
      switch (leave.status) {
        case "Approved":
          sx = {
            backgroundColor: "#22c55e",
            color: "white",
            "&:hover": {
              backgroundColor: "#16a34a", 
            },
          };
          break;

        case "Pending":
          sx = {
            backgroundColor: "#f59e0b",
            color: "white",
            "&:hover": {
              backgroundColor: "#d97706", 
            },
          };
          break;

        case "Rejected":
          sx = {
            backgroundColor: "#ef4444",
            color: "white",
            "&:hover": {
              backgroundColor: "#dc2626", 
            },
          };
          break;
      }
    }

    return (
      <PickerDay
        {...other}
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
        sx={sx}
      />
    );
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">
        Calendar
      </h2>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          slots={{
            day: ServerDay,
          }}
        />
      </LocalizationProvider>


      <div className="mt-4 border-t border-slate-100 pt-4 flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#22c55e] shadow-xs" />
          <span className="text-slate-600">Approved Leave</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#f59e0b] shadow-xs" />
          <span className="text-slate-600">Pending Request</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ef4444] shadow-xs" />
          <span className="text-slate-600">Rejected Leave</span>
        </div>
      </div>
    </div>
  );
}