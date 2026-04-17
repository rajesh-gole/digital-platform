import Navbar from "../components/layout/Navbar";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-16 md:py-24">

        {/* Badge */}
        <div className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
          India's Most Trusted Recharge & Booking Platform
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight max-w-3xl">
          Recharge, Pay Bills & Book Tickets
          <br />
          <span className="text-blue-600">All in One Place</span>
        </h1>

        {/* Sub Text */}
        <p className="mt-5 text-gray-600 text-base md:text-lg max-w-2xl">
          Fast, secure and seamless experience for mobile recharge, DTH, electricity bills,
          bus, train and flight bookings.
        </p>

        {/* Feature Cards */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">

          <div className="p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
            📱 <p className="mt-2 font-medium">Mobile Recharge</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
            💡 <p className="mt-2 font-medium">Bill Payments</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
            🚌 <p className="mt-2 font-medium">Bus Tickets</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
            ✈️ <p className="mt-2 font-medium">Flight Booking</p>
          </div>

        </div>

        {/* Trust Section */}
        <div className="mt-12 text-sm text-gray-500">
          Trusted by 10M+ users across India 🇮🇳
        </div>

      </div>
    </div>
  );
};

export default LandingPage;