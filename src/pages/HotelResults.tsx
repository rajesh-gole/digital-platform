import { useLocation } from "react-router-dom";

const hotels = [
  {
    id: 1,
    name: "Hotel Grand Palace",
    city: "Kolkata",
    price: 2499,
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  },
  {
    id: 2,
    name: "Royal Stay Inn",
    city: "Kolkata",
    price: 1899,
    rating: 4.0,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
  },
  {
    id: 3,
    name: "City Comfort Hotel",
    city: "Kolkata",
    price: 1499,
    rating: 3.8,
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
  },
];

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
};

const HotelResults = () => {
  const location = useLocation();
  const { city, checkIn, checkOut, adults, rooms } = location.state || {};

  return (
    <div className="bg-gray-100 min-h-screen p-4">

      {/* SEARCH SUMMARY */}
      <div className="max-w-6xl mx-auto bg-white p-4 rounded-lg shadow mb-6 flex justify-between items-center">

        <div>
          <h2 className="font-semibold text-lg">{city}</h2>

          <p className="text-sm text-gray-500">
            {formatDate(checkIn)} → {formatDate(checkOut)} | {rooms} Room | {adults} Adults
          </p>
        </div>

        <button className="border px-4 py-2 rounded-lg hover:bg-gray-100">
          Modify Search
        </button>
      </div>

      {/* FILTER + RESULTS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* FILTER SIDEBAR */}
        <div className="bg-white p-4 rounded-lg shadow h-fit">

          <h3 className="font-semibold mb-3">Filters</h3>

          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Price</p>
            <input type="range" min="500" max="5000" className="w-full" />
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Rating</p>

            <label className="block text-sm">
              <input type="checkbox" /> 4★ & above
            </label>

            <label className="block text-sm">
              <input type="checkbox" /> 3★ & above
            </label>
          </div>
        </div>

        {/* HOTEL LIST */}
        <div className="md:col-span-3 space-y-4">

          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-lg shadow flex flex-col md:flex-row overflow-hidden"
            >

              {/* IMAGE */}
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full md:w-60 h-48 object-cover"
              />

              {/* DETAILS */}
              <div className="p-4 flex flex-col flex-1 justify-between">

                <div>
                  <h3 className="font-semibold text-lg">
                    {hotel.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {hotel.city}
                  </p>

                  <p className="text-green-600 text-sm mt-1">
                    ⭐ {hotel.rating} Very Good
                  </p>
                </div>

                <div className="flex justify-between items-center mt-4">

                  <div>
                    <p className="text-sm text-gray-500">
                      per night
                    </p>

                    <p className="text-xl font-bold text-blue-600">
                      ₹{hotel.price}
                    </p>
                  </div>

                  <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                    View Rooms
                  </button>
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default HotelResults;