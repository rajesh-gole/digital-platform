import { useState } from "react";
import { useNavigate } from "react-router-dom";

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
};

const getToday = () => {
  const d = new Date();
  return d.toISOString().split("T")[0];
};

const getTomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
};

const Hotels = () => {
  const [city, setCity] = useState("");

  const [checkIn, setCheckIn] = useState(getToday());
  const [checkOut, setCheckOut] = useState(getTomorrow());

  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const [guestOpen, setGuestOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
  navigate("/hotel-results", {
    state: {
      city,
      checkIn,
      checkOut,
      rooms,
      adults,
      children,
    },
  });
};

  const handleCheckInChange = (value: string) => {
    setCheckIn(value);

    const inDate = new Date(value);
    const outDate = new Date(checkOut);

    if (outDate <= inDate) {
      const nextDay = new Date(inDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(nextDay.toISOString().split("T")[0]);
    }
  };

  const minCheckout = () => {
    const d = new Date(checkIn);
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  const nights =
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
    (1000 * 60 * 60 * 24);

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4">

      {/* SEARCH CARD */}
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-xl p-6 grid md:grid-cols-5 gap-4">

        {/* CITY */}
        <div>
          <label className="text-sm text-gray-500">City / Hotel</label>

          <input
            type="text"
            placeholder="Enter City or Hotel"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded-lg px-3 py-3 mt-1"
          />
        </div>

        {/* CHECKIN */}
        <div>
          <label className="text-sm text-gray-500">Check-In</label>

          <div className="border rounded-lg p-2">
            <div className="font-semibold">
              {formatDate(new Date(checkIn))}
            </div>

            <input
              type="date"
              min={getToday()}
              value={checkIn}
              onChange={(e) => handleCheckInChange(e.target.value)}
              className="w-full text-sm mt-1 outline-none"
            />
          </div>
        </div>

        {/* CHECKOUT */}
        <div>
          <label className="text-sm text-gray-500">Check-Out</label>

          <div className="border rounded-lg p-2">
            <div className="font-semibold">
              {formatDate(new Date(checkOut))}
            </div>

            <input
              type="date"
              min={minCheckout()}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full text-sm mt-1 outline-none"
            />

            <div className="text-xs text-gray-500 mt-1">
              {nights} Night{nights > 1 ? "s" : ""}
            </div>
          </div>
        </div>

        {/* GUESTS */}
        <div className="relative">
          <label className="text-sm text-gray-500">Rooms & Guests</label>

          <div
            onClick={() => setGuestOpen(!guestOpen)}
            className="border rounded-lg px-3 py-3 cursor-pointer"
          >
            {rooms} Room, {adults} Adults, {children} Children
          </div>

          {guestOpen && (
            <div className="absolute bg-white shadow-lg border rounded-lg w-full mt-2 p-4 z-50">

              {/* ROOMS */}
              <div className="flex justify-between items-center mb-3">
                <span>Rooms</span>

                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => rooms > 1 && setRooms(rooms - 1)}
                    className="px-2 border rounded"
                  >
                    -
                  </button>

                  <span>{rooms}</span>

                  <button
                    onClick={() => setRooms(rooms + 1)}
                    className="px-2 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* ADULTS */}
              <div className="flex justify-between items-center mb-3">
                <span>Adults</span>

                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => adults > 1 && setAdults(adults - 1)}
                    className="px-2 border rounded"
                  >
                    -
                  </button>

                  <span>{adults}</span>

                  <button
                    onClick={() => setAdults(adults + 1)}
                    className="px-2 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CHILDREN */}
              <div className="flex justify-between items-center">
                <span>Children</span>

                <div className="flex gap-3 items-center">
                  <button
                    onClick={() =>
                      children > 0 && setChildren(children - 1)
                    }
                    className="px-2 border rounded"
                  >
                    -
                  </button>

                  <span>{children}</span>

                  <button
                    onClick={() => setChildren(children + 1)}
                    className="px-2 border rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() => setGuestOpen(false)}
                className="bg-blue-600 text-white w-full mt-4 py-2 rounded"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* SEARCH BUTTON */}
        <div className="flex items-end">
          <button  onClick={handleSearch} className="bg-blue-600 w-full text-white py-3 rounded-lg hover:bg-blue-700 font-semibold">
            Search Hotels
          </button>
        </div>

      </div>

      {/* FEATURE SECTION */}
      <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">
            Best Price Guarantee
          </h3>

          <p className="text-gray-500 text-sm">
            Find the best hotel deals across thousands of hotels.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">
            Easy Cancellation
          </h3>

          <p className="text-gray-500 text-sm">
            Free cancellation on many hotels with flexible booking.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">
            Trusted by Travelers
          </h3>

          <p className="text-gray-500 text-sm">
            Millions of travelers book hotels every year.
          </p>
        </div>

      </div>

    </div>
  );
};

export default Hotels;