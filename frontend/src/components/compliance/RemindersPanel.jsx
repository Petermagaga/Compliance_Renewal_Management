function RemindersPanel({ items = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">
        Upcoming Reminders
      </h2>

      <div className="space-y-5">
        <div className="border rounded-xl p-4">
          <p className="font-semibold">Fire Safety Certificate</p>
          <p className="text-sm text-gray-500">Expires in 7 days</p>
        </div>

        <div className="border rounded-xl p-4">
          <p className="font-semibold">Food Permit</p>
          <p className="text-sm text-gray-500">Expires in 14 days</p>
        </div>

        <div className="border rounded-xl p-4">
          <p className="font-semibold">NEMA License</p>
          <p className="text-sm text-gray-500">Expires in 54 days</p>
        </div>
      </div>
    </div>
  );
}

export default RemindersPanel;