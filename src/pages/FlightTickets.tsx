import { useMemo, useState } from "react";
import { Formik, Form } from "formik";

const airports = [
  { city: "Delhi", code: "DEL", name: "Indira Gandhi International Airport" },
  { city: "Mumbai", code: "BOM", name: "Chhatrapati Shivaji Airport" },
  { city: "Kolkata", code: "CCU", name: "Netaji Subhash Airport" },
  { city: "Bangalore", code: "BLR", name: "Kempegowda International Airport" },
  { city: "Chennai", code: "MAA", name: "Chennai International Airport" },
  { city: "Hyderabad", code: "HYD", name: "Rajiv Gandhi International Airport" },
  { city: "Pune", code: "PNQ", name: "Pune Airport" },
  { city: "Goa", code: "GOI", name: "Goa International Airport" },
];

const formatAirport = (a: any) => `${a.city} (${a.code})`;

const FlightTickets = () => {
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);

  const [tripType, setTripType] = useState<"oneway" | "round">("oneway");

  // 👇 instant state (NO Formik lag)
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const [travelClass, setTravelClass] = useState("Economy");

  // airport dropdown state
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);

  const [selected, setSelected] = useState({
    from: airports[0],
    to: airports[1],
  });


  const filteredFrom = airports.filter((a) =>
    formatAirport(a).toLowerCase().includes(fromSearch.toLowerCase())
  );

  const filteredTo = airports.filter((a) =>
    formatAirport(a).toLowerCase().includes(toSearch.toLowerCase())
  );

  const updatePassenger = (type: keyof typeof passengers, delta: number) => {
    setPassengers((prev) => {
      const next = { ...prev, [type]: prev[type] + delta };

      if (next.adults < 1) next.adults = 1;
      if (next.children < 0) next.children = 0;
      if (next.infants < 0) next.infants = 0;

      if (next.adults + next.children + next.infants > 9) {
        return prev;
      }

      if (travelClass === "Business") {
        if (next.infants > 1) next.infants = 1;
        if (next.children > 8) next.children = 8;
      }

      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6">

        <h1 className="text-2xl font-bold mb-4">✈️ Flight Booking</h1>

        {/* Trip Type */}
        <div className="flex gap-3 mb-5">
          {["oneway", "round"].map((t) => (
            <button
              key={t}
              onClick={() => setTripType(t as any)}
              className={`px-4 py-2 rounded-full border ${
                tripType === t ? "bg-blue-600 text-white" : ""
              }`}
            >
              {t === "oneway" ? "One Way" : "Round Trip"}
            </button>
          ))}
        </div>

        <Formik
          initialValues={{
            depart: "",
            return: "",
          }}
          onSubmit={(values) => {
            console.log({
              ...values,
              from: selected.from,
              to: selected.to,
              passengers,
              travelClass,
            });
            alert("Searching Flights...");
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="space-y-5">

              {/* FROM / TO */}
              <div className="grid grid-cols-2 gap-4">

                {/* FROM */}
                <div className="border rounded-xl p-3 relative">
                  <label className="text-xs text-gray-500">From</label>

                  <div
                    onClick={() => setShowFrom(!showFrom)}
                    className="font-semibold cursor-pointer"
                  >
                    {formatAirport(selected.from)}
                  </div>

                  {showFrom && (
                    <div className="absolute z-10 bg-white border w-full mt-2 rounded-lg shadow-lg">
                      <input
                        className="w-full p-2 border-b"
                        placeholder="Search airport..."
                        value={fromSearch}
                        onChange={(e) => setFromSearch(e.target.value)}
                      />

                      <div className="max-h-40 overflow-auto">
                        {filteredFrom.map((a) => (
                          <div
                            key={a.code}
                            onClick={() => {
                              setSelected((p) => ({ ...p, from: a }));
                              setShowFrom(false);
                            }}
                            className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                          >
                            {formatAirport(a)} - {a.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* TO */}
                <div className="border rounded-xl p-3 relative">
                  <label className="text-xs text-gray-500">To</label>

                  <div
                    onClick={() => setShowTo(!showTo)}
                    className="font-semibold cursor-pointer"
                  >
                    {formatAirport(selected.to)}
                  </div>

                  {showTo && (
                    <div className="absolute z-10 bg-white border w-full mt-2 rounded-lg shadow-lg">
                      <input
                        className="w-full p-2 border-b"
                        placeholder="Search airport..."
                        value={toSearch}
                        onChange={(e) => setToSearch(e.target.value)}
                      />

                      <div className="max-h-40 overflow-auto">
                        {filteredTo.map((a) => (
                          <div
                            key={a.code}
                            onClick={() => {
                              setSelected((p) => ({ ...p, to: a }));
                              setShowTo(false);
                            }}
                            className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                          >
                            {formatAirport(a)} - {a.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Swap */}
              <div className="text-center">
                <button
                  type="button"
                  className="text-blue-600 text-sm"
                  onClick={() =>
                    setSelected((p) => ({ from: p.to, to: p.from }))
                  }
                >
                  ⇅ Swap
                </button>
              </div>

              {/* DATE */}
              <div className="grid grid-cols-2 gap-4">

                <div className="border p-3 rounded-xl">
                  <label className="text-xs text-gray-500">Depart</label>
                  <input
                    type="date"
                    min={today}
                    className="w-full font-semibold"
                    onChange={(e) =>
                      setFieldValue("depart", e.target.value)
                    }
                  />
                </div>

                <div
                  className={`border p-3 rounded-xl ${
                    tripType === "oneway" ? "opacity-40" : ""
                  }`}
                >
                  <label className="text-xs text-gray-500">Return</label>
                  <input
                    type="date"
                    disabled={tripType === "oneway"}
                    min={values.depart || today}
                    className="w-full font-semibold"
                    onChange={(e) =>
                      setFieldValue("return", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* PASSENGER (NO SEARCHING UI BUG FIXED) */}
              <div className="border p-4 rounded-xl">

                <p className="font-semibold mb-3">
                  Passenger & Class
                </p>

                <p className="text-sm text-gray-600 mb-3">
                  {passengers.adults} Adults, {passengers.children} Children,{" "}
                  {passengers.infants} Infants • {travelClass}
                </p>

                <PassengerRow
                  label="Adults"
                  value={passengers.adults}
                  onAdd={() => updatePassenger("adults", 1)}
                  onRemove={() => updatePassenger("adults", -1)}
                  disableRemove={passengers.adults === 1}
                />

                <PassengerRow
                  label="Children"
                  value={passengers.children}
                  onAdd={() => updatePassenger("children", 1)}
                  onRemove={() => updatePassenger("children", -1)}
                />

                <PassengerRow
                  label="Infants"
                  value={passengers.infants}
                  onAdd={() => updatePassenger("infants", 1)}
                  onRemove={() => updatePassenger("infants", -1)}
                />

                <select
                  className="w-full mt-4 border p-2 rounded-lg"
                  value={travelClass}
                  onChange={(e) => setTravelClass(e.target.value)}
                >
                  <option>Economy</option>
                  <option>Premium Economy</option>
                  <option>Business</option>
                </select>
              </div>

              <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold">
                Search Flights
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

/* PASSENGER COMPONENT */
const PassengerRow = ({
  label,
  value,
  onAdd,
  onRemove,
  disableRemove,
}: any) => {
  return (
    <div className="flex justify-between items-center py-2">
      <span>{label}</span>

      <div className="flex items-center gap-3">
        <button
          onClick={onRemove}
          disabled={disableRemove}
          className="px-2 border rounded disabled:opacity-30"
        >
          -
        </button>

        <span>{value}</span>

        <button
          onClick={onAdd}
          className="px-2 border rounded"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default FlightTickets;