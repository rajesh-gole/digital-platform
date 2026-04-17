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
    <div className="min-h-screen bg-gray-100">

      {/* Mobile Header */}
      <div className="p-4 md:hidden">
        <h1 className="text-2xl font-bold">My Bookings</h1>
      </div>

      {/* Mobile Tabs */}
      <div className="flex md:hidden overflow-x-auto gap-2 px-4 pb-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-white border"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex">

        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 bg-white shadow-lg min-h-screen p-5">

          <h2 className="text-xl font-bold mb-6">My Bookings</h2>

          <div className="flex flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-left px-4 py-3 rounded-lg font-medium ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-6">

          <div className="hidden md:block mb-6">
            <h1 className="text-3xl font-bold">{activeTab}</h1>
            <p className="text-gray-500">
              View all your {activeTab.toLowerCase()}
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-4">
            {renderComponent()}
          </div>

        </div>

      </div>

    </div>
  );
};

export default MyBookings;