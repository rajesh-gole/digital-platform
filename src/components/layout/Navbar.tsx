import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // MENU STATES
  const [menuOpen, setMenuOpen] = useState(false);
  const [rechargeOpen, setRechargeOpen] = useState(false);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [hotelOpen, setHotelOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  // MOCK AUTH (replace with Redux/Context later)
  const isLoggedIn = true;

  const user = {
    name: "Rajesh Gole",
  };

  const getInitial = (name: string) => {
    return name?.charAt(0).toUpperCase() || "?";
  };

  // CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setRechargeOpen(false);
        setTicketOpen(false);
        setHotelOpen(false);
        setMenuOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
    setRechargeOpen(false);
    setTicketOpen(false);
    setHotelOpen(false);
    setMenuOpen(false);
    setProfileOpen(false);
  };

  return (
    <nav
      ref={navRef}
      className="bg-white shadow-md px-6 py-4 flex items-center justify-between relative"
    >
      {/* LOGO */}
      <div
        onClick={() => handleNavigate("/")}
        className="text-2xl font-bold text-blue-600 cursor-pointer"
      >
        Smartboat Ecosystem
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8">

        {/* Recharge */}
        <div className="relative">
          <button
            onClick={() => {
              setRechargeOpen(!rechargeOpen);
              setTicketOpen(false);
              setHotelOpen(false);
            }}
            className="flex items-center gap-1 hover:text-blue-600 font-medium"
          >
            Recharge & Bills <span>▾</span>
          </button>

          {rechargeOpen && (
            <div className="absolute top-10 left-0 bg-white border shadow-lg rounded-lg w-56 z-50">
              <div onClick={() => handleNavigate("/mobile-recharge")} className="px-4 py-3 hover:bg-gray-100 cursor-pointer">Mobile Recharge</div>
              <div onClick={() => handleNavigate("/dth-recharge")} className="px-4 py-3 hover:bg-gray-100 cursor-pointer">DTH Recharge</div>
              <div onClick={() => handleNavigate("/electricity-bill")} className="px-4 py-3 hover:bg-gray-100 cursor-pointer">Electricity Bill</div>
            </div>
          )}
        </div>

        {/* Tickets */}
        <div className="relative">
          <button
            onClick={() => {
              setTicketOpen(!ticketOpen);
              setRechargeOpen(false);
              setHotelOpen(false);
            }}
            className="flex items-center gap-1 hover:text-blue-600 font-medium"
          >
            Ticket Booking <span>▾</span>
          </button>

          {ticketOpen && (
            <div className="absolute top-10 left-0 bg-white border shadow-lg rounded-lg w-56 z-50">
              <div onClick={() => handleNavigate("/bus-tickets")} className="px-4 py-3 hover:bg-gray-100 cursor-pointer">Bus Tickets</div>
              <div onClick={() => handleNavigate("/train-tickets")} className="px-4 py-3 hover:bg-gray-100 cursor-pointer">Train Tickets</div>
              <div onClick={() => handleNavigate("/flight-tickets")} className="px-4 py-3 hover:bg-gray-100 cursor-pointer">Flight Tickets</div>
            </div>
          )}
        </div>

        {/* Hotel Booking */}
        <div className="relative">
          <button
            onClick={() => {
              setHotelOpen(!hotelOpen);
              setRechargeOpen(false);
              setTicketOpen(false);
            }}
            className="flex items-center gap-1 hover:text-blue-600 font-medium"
          >
            Hotel Booking <span>▾</span>
          </button>

          {hotelOpen && (
            <div className="absolute top-10 left-0 bg-white border shadow-lg rounded-lg w-56 z-50">
              <div onClick={() => handleNavigate("/hotels")} className="px-4 py-3 hover:bg-gray-100 cursor-pointer">Search Hotels</div>
              <div onClick={() => handleNavigate("/hotel-booking")} className="px-4 py-3 hover:bg-gray-100 cursor-pointer">My Bookings</div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT SIDE (AUTH) */}
      <div className="flex items-center gap-4">

        {!isLoggedIn ? (
          <button
            onClick={() => handleNavigate("/login")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        ) : (
          <div className="relative">

            {/* AVATAR */}
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold cursor-pointer"
            >
              {getInitial(user.name)}
            </div>

            {/* DROPDOWN */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-lg z-50">

                <div
                  onClick={() => handleNavigate("/profile")}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  Profile
                </div>

                <div
                  onClick={() => handleNavigate("/my-bookings")}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                >
                  My Bookings
                </div>

                <div
                  onClick={() => {
                    console.log("logout");
                    setProfileOpen(false);
                  }}
                  className="px-4 py-3 hover:bg-gray-100 text-red-500 cursor-pointer"
                >
                  Logout
                </div>

              </div>
            )}

          </div>
        )}

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
            ☰
          </button>
        </div>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md md:hidden z-50">

          <div className="border-b">
            <div className="px-4 py-3 font-medium">Recharge & Bills</div>
            <div onClick={() => handleNavigate("/mobile-recharge")} className="px-6 py-2 hover:bg-gray-100">Mobile Recharge</div>
            <div onClick={() => handleNavigate("/dth-recharge")} className="px-6 py-2 hover:bg-gray-100">DTH Recharge</div>
            <div onClick={() => handleNavigate("/electricity-bill")} className="px-6 py-2 hover:bg-gray-100">Electricity Bill</div>
          </div>

          <div className="border-b">
            <div className="px-4 py-3 font-medium">Ticket Booking</div>
            <div onClick={() => handleNavigate("/bus-tickets")} className="px-6 py-2 hover:bg-gray-100">Bus Tickets</div>
            <div onClick={() => handleNavigate("/train-tickets")} className="px-6 py-2 hover:bg-gray-100">Train Tickets</div>
            <div onClick={() => handleNavigate("/flight-tickets")} className="px-6 py-2 hover:bg-gray-100">Flight Tickets</div>
          </div>

          <div className="border-b">
            <div className="px-4 py-3 font-medium">Hotel Booking</div>
            <div onClick={() => handleNavigate("/hotels")} className="px-6 py-2 hover:bg-gray-100">Search Hotels</div>
            <div onClick={() => handleNavigate("/hotel-booking")} className="px-6 py-2 hover:bg-gray-100">My Bookings</div>
          </div>

          <div
            onClick={() => handleNavigate("/login")}
            className="px-4 py-3 text-blue-600 font-medium"
          >
            Login
          </div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;