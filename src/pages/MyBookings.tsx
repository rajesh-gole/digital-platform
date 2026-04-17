import { useState } from "react";
import MobileRechargeTable from "./MobileRechargeTable";
import DTHRechargeTable from "./DTHRechargeTable";
import HotelBookingsTable from "./HotelBookingsTable";
import FlightBookingsTable from "./FlightBookingsTable";

const tabs = [
  "Mobile Recharge",
  "DTH Recharge",
  "Hotel Bookings",
  "Flight Bookings",
];

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("Mobile Recharge");

  const renderComponent = () => {
    switch (activeTab) {
      case "Mobile Recharge":
        return <MobileRechargeTable />;
      case "DTH Recharge":
        return <DTHRechargeTable />;
      case "Hotel Bookings":
        return <HotelBookingsTable />;
      case "Flight Bookings":
        return <FlightBookingsTable />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto mb-6">
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="text-gray-500">All your transactions in one place</p>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto flex gap-3 mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-white border hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div className="max-w-7xl mx-auto bg-white shadow rounded-xl p-4">
        {renderComponent()}
      </div>

    </div>
  );
};

export default MyBookings;