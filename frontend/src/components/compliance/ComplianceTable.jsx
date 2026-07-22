function ComplianceTable({ items=[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">
        Recent Compliance Items
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500 border-b">
            <tr>
              <th className="pb-3">Item Name</th>
              <th>Category</th>
              <th>Department</th>
              <th>Expiry Date</th>
              <th>Days Left</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-4">{item.name}</td>
                <td>{item.category}</td>
                <td>{item.department}</td>
                <td>{item.expiry}</td>
                <td>{item.daysLeft}</td>
                <td>
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                    {item.status}
                  </span>
                </td>
                <td>
                  <span className="bg-red-100 text-red-500 px-3 py-1 rounded-full text-xs">
                    {item.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComplianceTable;
