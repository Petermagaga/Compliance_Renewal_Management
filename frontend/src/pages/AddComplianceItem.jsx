import { useState } from "react";
import api from "../services/api";

function AddComplianceItem() {
  const [form, setForm] = useState({
    company: 1,
    department: 1,
    name: "",
    category: "license",
    issue_date: "",
    expiry_date: "",
    responsible_person: "",
    status: "active",
    priority: "medium"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/compliance/items/", form);
      alert("Compliance item created");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Add Compliance Item</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Name"
          onChange={(e) => setForm({...form, name: e.target.value})}
        />

        <input
          className="border p-2 w-full"
          type="date"
          onChange={(e) => setForm({...form, issue_date: e.target.value})}
        />

        <input
          className="border p-2 w-full"
          type="date"
          onChange={(e) => setForm({...form, expiry_date: e.target.value})}
        />

        <input
          className="border p-2 w-full"
          placeholder="Responsible Person"
          onChange={(e) => setForm({...form, responsible_person: e.target.value})}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddComplianceItem;