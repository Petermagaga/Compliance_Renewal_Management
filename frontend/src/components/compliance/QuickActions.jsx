function QuickActions() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">
        Quick Actions
      </h2>

      <div className="space-y-4">
        <button className="w-full bg-brand-green text-white py-3 rounded-xl">
          Add Compliance Item
        </button>

        <button className="w-full bg-brand-yellow text-black py-3 rounded-xl">
          Upload Document
        </button>

        <button className="w-full bg-gray-200 py-3 rounded-xl">
          Generate Report
        </button>
      </div>
    </div>
  );
}

export default QuickActions;