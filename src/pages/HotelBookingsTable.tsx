const data = [
  {
    id: "HT301",
    hotel: "The Grand Palace",
    location: "Kolkata",
    amount: 3500,
    status: "Success",
    date: "2026-03-28",
  },
  {
    id: "HT302",
    hotel: "Sea View Resort",
    location: "Digha",
    amount: 2800,
    status: "Failed",
    date: "2026-04-01",
  },
];

const HotelBookingsTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Hotel</th>
            <th className="p-3 text-left">Location</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{item.id}</td>
              <td className="p-3">{item.hotel}</td>
              <td className="p-3">{item.location}</td>
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

export default HotelBookingsTable;