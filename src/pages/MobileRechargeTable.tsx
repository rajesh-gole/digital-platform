const data = [
  {
    id: "MR101",
    number: "9876543210",
    operator: "Jio",
    amount: 239,
    status: "Success",
    date: "2026-04-10",
  },
  {
    id: "MR102",
    number: "9123456780",
    operator: "Airtel",
    amount: 199,
    status: "Pending",
    date: "2026-04-12",
  },
];

const getStatusColor = (status: any) => {
  if (status === "Success") return "text-green-600";
  if (status === "Pending") return "text-yellow-600";
  return "text-red-600";
};

const MobileRechargeTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Number</th>
            <th className="p-3 text-left">Operator</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{item.id}</td>
              <td className="p-3">{item.number}</td>
              <td className="p-3">{item.operator}</td>
              <td className="p-3">₹{item.amount}</td>
              <td className={`p-3 font-medium ${getStatusColor(item.status)}`}>
                {item.status}
              </td>
              <td className="p-3">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MobileRechargeTable;