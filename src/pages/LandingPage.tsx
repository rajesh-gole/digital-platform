import { useEffect, useState } from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import { Link } from "react-router-dom";

const images = [img1, img2, img3, img4];

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
    <div className="min-h-screen relative overflow-hidden bg-cyan-50">

  {/* Background */}
  <div className="absolute w-96 h-96 bg-cyan-200 rounded-full blur-3xl opacity-10 top-0 left-0"></div>
  <div className="absolute w-96 h-96 bg-cyan-300 rounded-full blur-3xl opacity-10 bottom-0 right-0"></div>

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row items-center gap-10">

        {/* LEFT */}
        <div className="flex-1 text-center md:text-left">

      <div className="inline-block bg-gradient-to-r from-amber-400/20 to-yellow-400/20 text-amber-800 px-5 py-1.5 rounded-full text-sm font-semibold mb-6 backdrop-blur-md border border-amber-300 shadow">
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

    {/* <div id="services" className="max-w-6xl mx-auto px-6 pb-24">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        <Link
          to="/mobile-recharge"
          className="group p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center block"
        >
          <div className="text-4xl group-hover:scale-110 transition">📱</div>
          <p className="mt-3 font-semibold">
            Mobile Recharge
          </p>
        </Link>

        <Link
          to="/dth-recharge"
          className="group p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center block"
        >
          <div className="text-4xl group-hover:scale-110 transition">📺</div>
          <p className="mt-3 font-semibold">
            DTH Recharge
          </p>
        </Link>

        <Link
          to="/flight-tickets"
          className="group p-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 text-center block"
        >
          <div className="text-4xl group-hover:scale-110 transition">✈️</div>
          <p className="mt-3 font-semibold">
            Flight Booking
          </p>
        </Link>

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

    </div> */}

{/* WHY CHOOSE US */}

<div className="max-w-7xl mx-auto px-6 pb-24">

  <div className="text-center mb-14">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
      Why Choose Our Platform
    </h2>
    <p className="text-gray-600 mt-3">
      Fast, secure and reliable services trusted by millions.
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

    {/* Card */}
    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition text-center">
      <div className="text-4xl mb-3">⚡</div>
      <h3 className="font-semibold text-lg">Instant Recharge</h3>
      <p className="text-blue-100 text-sm mt-2">
        Complete recharge within seconds with zero hassle.
      </p>
    </div>

    {/* Card */}
    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition text-center">
      <div className="text-4xl mb-3">🔒</div>
      <h3 className="font-semibold text-lg">Secure Payments</h3>
      <p className="text-purple-100 text-sm mt-2">
        Advanced encryption ensures safe transactions.
      </p>
    </div>

    {/* Card */}
    <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition text-center">
      <div className="text-4xl mb-3">💰</div>
      <h3 className="font-semibold text-lg">Best Cashback</h3>
      <p className="text-emerald-100 text-sm mt-2">
        Enjoy exciting offers and cashback on every recharge.
      </p>
    </div>

    {/* Card */}
    <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition text-center">
      <div className="text-4xl mb-3">📞</div>
      <h3 className="font-semibold text-lg">24/7 Support</h3>
      <p className="text-indigo-100 text-sm mt-2">
        Our support team is always ready to help you.
      </p>
    </div>

  </div>

</div>

{/* SPECIAL OFFERS */}

<div className="bg-gradient-to-r from-cyan-600 to-purple-600 py-20">

  <div className="max-w-6xl mx-auto px-6 text-center text-white">

    <h2 className="text-3xl md:text-4xl font-bold">
      Exclusive Recharge Offers
    </h2>

    <p className="mt-4 text-indigo-100">
      Save more with exciting cashback and special deals.
    </p>

    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

      <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
        <div className="text-4xl">🎁</div>
        <h3 className="mt-3 font-semibold text-lg">
          ₹50 Cashback
        </h3>
        <p className="text-gray-500 text-sm mt-2">
          Get cashback on your first mobile recharge.
        </p>
      </div>

      <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
        <div className="text-4xl">✈️</div>
        <h3 className="mt-3 font-semibold text-lg">
          Flight Discount
        </h3>
        <p className="text-gray-500 text-sm mt-2">
          Flat ₹500 off on your first flight booking.
        </p>
      </div>

      <div className="bg-white text-gray-900 p-6 rounded-2xl shadow-lg hover:scale-105 transition">
        <div className="text-4xl">🏨</div>
        <h3 className="mt-3 font-semibold text-lg">
          Hotel Deals
        </h3>
        <p className="text-gray-500 text-sm mt-2">
          Save up to 30% on hotel bookings.
        </p>
      </div>

    </div>

  </div>

</div>

    </div>
  );
};

export default LandingPage;