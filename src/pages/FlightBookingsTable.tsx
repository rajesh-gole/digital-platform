const data = [
  {
    id: "FL401",
    route: "Kolkata → Delhi",
    airline: "IndiGo",
    amount: 5600,
    status: "Success",
    date: "2026-04-02",
  },
];

const FlightBookingsTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Route</th>
            <th className="p-3 text-left">Airline</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{item.id}</td>
              <td className="p-3">{item.route}</td>
              <td className="p-3">{item.airline}</td>
              <td className="p-3">₹{item.amount}</td>
              <td className="p-3">{item.status}</td>
              <td className="p-3">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightBookingsTable;