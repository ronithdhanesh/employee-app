import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function PersonalInfoForm() {

  const [employee, setEmployee] =
    useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {

    const employeeId =
      localStorage.getItem("employeeId");

    const res = await api.get(
      `/employee/get/${employeeId}`
    );

    setEmployee(res.data);

    setForm({
      firstName: res.data.firstName,
      lastName: res.data.lastName,
      phone: res.data.phone || "",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api.patch(
        `/employee/update/${employee._id}`,
        form
      );

      alert(
        "Profile updated successfully"
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Personal Information
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <div>
          <label>
            First Name
          </label>

          <input
            value={form.firstName}
            onChange={(e) =>
              setForm({
                ...form,
                firstName:
                  e.target.value,
              })
            }
            className="mt-2 w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label>
            Last Name
          </label>

          <input
            value={form.lastName}
            onChange={(e) =>
              setForm({
                ...form,
                lastName:
                  e.target.value,
              })
            }
            className="mt-2 w-full rounded-xl border p-3"
          />
        </div>

        <div>
          <label>
            Phone
          </label>

          <input
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone:
                  e.target.value,
              })
            }
            className="mt-2 w-full rounded-xl border p-3"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-slate-900 px-6 py-3 text-white"
        >
          Save Changes
        </button>

      </form>

    </div>
  );
}