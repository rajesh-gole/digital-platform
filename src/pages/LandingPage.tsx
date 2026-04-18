import { useEffect, useState } from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import { Link } from "react-router-dom";

const images = [img1, img2, img3, img4];

// const images = [
//   "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
//   "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
//   "https://images.unsplash.com/photo-1522199710521-72d69614c702",
// ];

const texts = [
  "Recharge Instantly",
  "Pay Bills Securely",
  "Travel Without Hassle",
  "Book Flights Easily",
];

const LandingPage = () => {
  const [index, setIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  /* Image Slider */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* Typing Animation */
  useEffect(() => {
    let i = 0;
    const currentText = texts[textIndex];

    const typing = setInterval(() => {
      setDisplayText(currentText.slice(0, i));
      i++;

      if (i > currentText.length) {
        clearInterval(typing);

        setTimeout(() => {
          setTextIndex((prev) => (prev + 1) % texts.length);
        }, 2000);
      }
    }, 70);

    return () => clearInterval(typing);
  }, [textIndex]);

  // const scrollToServices = () => {
  //   document
  //     .getElementById("services")
  //     ?.scrollIntoView({ behavior: "smooth" });
  // };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50">

      {/* Background */}
      <div className="absolute w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-10 top-0 left-0"></div>
      <div className="absolute w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-10 bottom-0 right-0"></div>

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row items-center gap-10">

        {/* LEFT */}
        <div className="flex-1 text-center md:text-left">

          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold mb-6">
            India's Most Trusted Recharge Platform
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            {displayText}
            <span className="text-blue-600">...</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg max-w-lg mx-auto md:mx-0">
            Recharge mobile, pay electricity bills, and book bus, train,
            and flight tickets in one secure platform.
          </p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl relative z-10">

            <Link
              to="/mobile-recharge"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold shadow hover:scale-105 hover:shadow-lg transition text-center block"
            >
              Mobile Recharge
            </Link>

            <Link
              to="/dth-recharge"
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg font-semibold shadow hover:scale-105 hover:shadow-lg transition text-center block"
            >
              DTH Recharge
            </Link>

            <Link
              to="/flight-tickets"
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow hover:scale-105 hover:shadow-lg transition text-center block"
            >
              Flight Booking
            </Link>

            <Link
              to="/hotels"
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-lg font-semibold shadow hover:scale-105 hover:shadow-lg transition text-center block"
            >
              Hotel Booking
            </Link>

          </div>

          <div className="mt-8 text-sm text-gray-500">
            Trusted by <span className="font-semibold text-gray-700">10M+ users</span> across India 🇮🇳
          </div>

        </div>

        {/* IMAGE SLIDER */}
        <div className="flex-1 w-full">

          <div className="relative w-full h-[220px] sm:h-[300px] md:h-[350px] rounded-2xl overflow-hidden shadow-lg">

            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="travel"
                className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

          </div>

        </div>

      </div>

      {/* SERVICES */}

    <div id="services" className="max-w-6xl mx-auto px-6 pb-24">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {/* Mobile Recharge */}
        <Link
          to="/mobile-recharge"
          className="group p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center block"
        >
          <div className="text-4xl group-hover:scale-110 transition">📱</div>
          <p className="mt-3 font-semibold">
            Mobile Recharge
          </p>
        </Link>

        {/* DTH Recharge */}
        <Link
          to="/dth-recharge"
          className="group p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center block"
        >
          <div className="text-4xl group-hover:scale-110 transition">📺</div>
          <p className="mt-3 font-semibold">
            DTH Recharge
          </p>
        </Link>

        {/* Flight Tickets */}
        <Link
          to="/flight-tickets"
          className="group p-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center block"
        >
          <div className="text-4xl group-hover:scale-110 transition">✈️</div>
          <p className="mt-3 font-semibold">
            Flight Booking
          </p>
        </Link>

        {/* Hotels */}
        <Link
          to="/hotels"
          className="group p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center block"
        >
          <div className="text-4xl group-hover:scale-110 transition">🏨</div>
          <p className="mt-3 font-semibold">
            Hotel Booking
          </p>
        </Link>

      </div>

    </div>

    </div>
  );
};

export default LandingPage;