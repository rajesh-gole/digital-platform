import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import bg_img from "../assets/bg_img2.png";
type Plan = {
  amount: number;
  category: string;
  data: string;
  calls: string;
  validity: string;
  sms: string;
  details: string;
  extraBenefits?: string[];
};
  const planTabs = [
  "NonStop Hero",
  "Add on Data",
  "Cricket Packs",
  "5G Unlimited",
  "Entertainment",
  "SuperHero",
  "Hero",
  "Unlimited",
  "Yearly Plans",
  "International Roaming",
  "VAS",
  "Plan Voucher",
  "Combo",
  "Top Up",
];
const circles = [
  "All Circles",
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Chennai",
  "Delhi",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Karnataka",
  "Kerala",
  "Kolkata",
  "Madhya Pradesh",
  "Maharashtra",
  "Mumbai",
  "North East",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Tamil Nadu",
  "UP East",
  "UP West",
  "West Bengal",
];

const operators = [
  {
    name: "Jio",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Reliance_Jio_Logo.svg/960px-Reliance_Jio_Logo.svg.png?_=20230708145746",
  },
  {
    name: "Airtel",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Bharti_Airtel_Logo.svg/960px-Bharti_Airtel_Logo.svg.png?_=20220330075648",
  },
  {
    name: "Vi",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Vodafone_Logo.svg/960px-Vodafone_Logo.svg.png?_=20230804152752",
  },
  {
    name: "BSNL",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/BSNL_logo_with_slogan.svg/960px-BSNL_logo_with_slogan.svg.png?_=20220328084045",
  },
];

const plans = [
  // ================= NONSTOP HERO =================
  {
    amount: 199,
    category: "NonStop Hero",
    subCategory: "Best Value",
    data: "1.5GB/day",
    totalData: "42GB total",
    calls: "Unlimited Calls",
    validity: "28 Days",
    sms: "100 SMS/day",
    extraBenefits: ["Free OTT Basic", "Night Unlimited"],
    details: "Balanced plan for daily users with moderate usage.",
  },
  {
    amount: 249,
    category: "NonStop Hero",
    subCategory: "Popular",
    data: "2GB/day",
    totalData: "56GB total",
    calls: "Unlimited Calls",
    validity: "28 Days",
    sms: "100 SMS/day",
    extraBenefits: ["JioTV Access", "Weekend Bonus Data"],
    details: "Popular plan for streaming and social media users.",
  },
  {
    amount: 299,
    category: "NonStop Hero",
    subCategory: "Heavy Use",
    data: "2.5GB/day",
    totalData: "70GB total",
    calls: "Unlimited Calls",
    validity: "28 Days",
    sms: "100 SMS/day",
    extraBenefits: ["HD Streaming", "Gaming Boost"],
    details: "Best for heavy users and gamers.",
  },

  // ================= ADD ON DATA =================
  {
    amount: 101,
    category: "Add on Data",
    subCategory: "Extra Data",
    data: "6GB total",
    totalData: "6GB",
    calls: "NA",
    validity: "30 Days",
    sms: "NA",
    extraBenefits: ["Main pack extension"],
    details: "Extra data for existing users.",
  },
  {
    amount: 149,
    category: "Add on Data",
    subCategory: "Hotspot Pack",
    data: "10GB total",
    totalData: "10GB",
    calls: "NA",
    validity: "30 Days",
    sms: "NA",
    extraBenefits: ["Hotspot enabled"],
    details: "Best for hotspot and backup usage.",
  },
  {
    amount: 209,
    category: "Add on Data",
    subCategory: "Streaming Boost",
    data: "20GB total",
    totalData: "20GB",
    calls: "NA",
    validity: "30 Days",
    sms: "NA",
    extraBenefits: ["4K streaming support"],
    details: "Extra data for OTT and streaming.",
  },

  // ================= 5G UNLIMITED =================
  {
    amount: 239,
    category: "5G Unlimited",
    subCategory: "5G Entry",
    data: "Unlimited 5G",
    totalData: "Unlimited",
    calls: "Unlimited Calls",
    validity: "28 Days",
    sms: "100 SMS/day",
    extraBenefits: ["5G High Speed Access"],
    details: "Unlimited 5G usage for supported devices.",
  },
  {
    amount: 349,
    category: "5G Unlimited",
    subCategory: "Premium 5G",
    data: "Unlimited 5G",
    totalData: "Unlimited",
    calls: "Unlimited Calls",
    validity: "28 Days",
    sms: "100 SMS/day",
    extraBenefits: ["Ultra HD Streaming"],
    details: "High-speed 5G for heavy users.",
  },

  // ================= ENTERTAINMENT =================
  {
    amount: 279,
    category: "Entertainment",
    subCategory: "OTT Pack",
    data: "1.5GB/day",
    totalData: "42GB",
    calls: "Unlimited Calls",
    validity: "28 Days",
    sms: "100 SMS/day",
    extraBenefits: ["Netflix Basic", "JioCinema Premium"],
    details: "Entertainment-focused plan with OTT access.",
  },
  {
    amount: 399,
    category: "Entertainment",
    subCategory: "Full OTT",
    data: "2GB/day",
    totalData: "56GB",
    calls: "Unlimited Calls",
    validity: "56 Days",
    sms: "100 SMS/day",
    extraBenefits: ["Netflix", "Prime Video", "Hotstar"],
    details: "Full OTT bundled plan.",
  },

  // ================= CRICKET PACKS =================
  {
    amount: 99,
    category: "Cricket Packs",
    subCategory: "Sports Pack",
    data: "2GB",
    totalData: "2GB",
    calls: "NA",
    validity: "7 Days",
    sms: "NA",
    extraBenefits: ["Live IPL Access"],
    details: "Short-term cricket streaming pack.",
  },
  {
    amount: 149,
    category: "Cricket Packs",
    subCategory: "Live Sports",
    data: "5GB",
    totalData: "5GB",
    calls: "NA",
    validity: "14 Days",
    sms: "NA",
    extraBenefits: ["HD Sports Streaming"],
    details: "Ideal for live match streaming.",
  },

  // ================= UNLIMITED =================
  {
    amount: 399,
    category: "Unlimited",
    subCategory: "Classic Unlimited",
    data: "1.5GB/day",
    totalData: "42GB",
    calls: "Unlimited Calls",
    validity: "56 Days",
    sms: "100 SMS/day",
    extraBenefits: ["Unlimited Calling"],
    details: "Stable unlimited usage plan.",
  },
  {
    amount: 599,
    category: "Unlimited",
    subCategory: "Premium Unlimited",
    data: "2GB/day",
    totalData: "112GB",
    calls: "Unlimited Calls",
    validity: "84 Days",
    sms: "100 SMS/day",
    extraBenefits: ["OTT Bundle"],
    details: "Long validity unlimited plan.",
  },

  // ================= YEARLY =================
  {
    amount: 2999,
    category: "Yearly Plans",
    subCategory: "Annual Saver",
    data: "2.5GB/day",
    totalData: "912GB",
    calls: "Unlimited Calls",
    validity: "365 Days",
    sms: "100 SMS/day",
    extraBenefits: ["OTT Full Bundle"],
    details: "Best yearly recharge plan.",
  },

  // ================= INTERNATIONAL ROAMING =================
  {
    amount: 1299,
    category: "International Roaming",
    subCategory: "Asia Pack",
    data: "5GB",
    totalData: "5GB",
    calls: "Roaming Calls",
    validity: "10 Days",
    sms: "100 SMS",
    extraBenefits: ["Global Coverage"],
    details: "Roaming pack for Asia travel.",
  },

  // ================= TOP UP =================
  {
    amount: 10,
    category: "Top Up",
    subCategory: "Talktime",
    data: "NA",
    totalData: "NA",
    calls: "Talktime ₹7.47",
    validity: "Unlimited",
    sms: "NA",
    extraBenefits: ["Emergency Usage"],
    details: "Basic talktime recharge.",
  },
];

const validationSchema = Yup.object({
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),
  type: Yup.string().oneOf(["prepaid", "postpaid"]).required(),
  operator: Yup.string().required("Select operator"),
  amount: Yup.number().when("type", {
    is: "prepaid",
    then: (schema) => schema.required("Amount required").min(10),
    otherwise: (schema) => schema.notRequired(),
  }),
});

const MobileRecharge = () => {
  const [showPlans, setShowPlans] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [activeTab, setActiveTab] = useState("NonStop Hero");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);



useEffect(() => {
  const handleClick = () => setShowSuggestions(false);
  window.addEventListener("click", handleClick);
  return () => window.removeEventListener("click", handleClick);
}, []);
  const formik = useFormik({
    initialValues: {
      mobile: "",
      type: "prepaid", // ✅ DEFAULT PREPAID
      circle: "",
      operator: "",
      amount: "",
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

    const filteredPlans = plans.filter(
    (p) => p.category === activeTab
  );

  const filteredSuggestions = plans.filter((p) => {
  const q = searchQuery.toLowerCase();

  return (
    p.amount.toString().includes(q) ||
    p.data.toLowerCase().includes(q) ||
    p.validity.toLowerCase().includes(q) ||
    p.calls.toLowerCase().includes(q)
  );
});



return (
  <div className="h-screen w-full relative flex items-center justify-center px-4 overflow-hidden">

    {/* BACKGROUND IMAGE */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bg_img})`,
      }}
    />

    {/* OVERLAY */}
    <div className="absolute inset-0 bg-black/40" />

    {/* DECORATIVE BLOBS */}
    <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
    <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

    {/* FORM */}
    <form
      onSubmit={formik.handleSubmit}
      className="relative w-full max-w-3xl bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-6 md:p-10 max-h-[95vh] overflow-y-auto"
    >

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-gray-800">
          Mobile Recharge / Pay Bill
        </h1>

        <p className="text-gray-500 mt-1">
          Fast & secure recharge experience
        </p>

{/* PREPAID / POSTPAID */}
<div className="mt-6 flex gap-3 p-1 bg-gray-100 rounded-xl w-fit">

  <button
    type="button"
    onClick={() => formik.setFieldValue("type", "prepaid")}
    className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200
      ${
        formik.values.type === "prepaid"
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
          : "text-gray-600 hover:bg-white"
      }`}
  >
    Prepaid
  </button>

  <button
    type="button"
    onClick={() => {
      formik.setFieldValue("type", "postpaid");
      setShowPlans(false);
    }}
    className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200
      ${
        formik.values.type === "postpaid"
          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
          : "text-gray-600 hover:bg-white"
      }`}
  >
    Postpaid
  </button>

</div>

{/* MOBILE INPUT */}
<div className="mt-6">

  <label className="text-sm font-medium text-gray-700">
    Mobile Number
  </label>

  <div className="relative mt-2">

    <input
      value={formik.values.mobile}
      onChange={(e) => {
        const val = e.target.value.replace(/\D/g, "").slice(0, 10);
        formik.setFieldValue("mobile", val);
      }}
      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white shadow-sm
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      transition"
      placeholder="Enter 10-digit mobile number"
    />

    {/* character counter */}
    <span className="absolute right-3 top-3 text-xs text-gray-400">
      {formik.values.mobile?.length || 0}/10
    </span>

  </div>

  {formik.errors.mobile && (
    <p className="text-red-500 text-sm mt-1">
      {formik.errors.mobile}
    </p>
  )}

</div>

        {/* OPERATOR */}
        <div className="mt-6">
          <label className="text-sm text-gray-600">Select Operator</label>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {operators.map((op) => {
              const isSelected = formik.values.operator === op.name;

              return (
                <div
                  key={op.name}
                  onClick={() => formik.setFieldValue("operator", op.name)}
                  className={`relative flex flex-col items-center justify-center p-4 rounded-xl cursor-pointer transition-all duration-300 
                  border
                  hover:shadow-lg hover:-translate-y-1
                  ${
                    isSelected
                      ? "border-blue-500 bg-gradient-to-br from-blue-50 to-white shadow-xl scale-[1.05] ring-2 ring-blue-400"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  {/* SELECTED BADGE / CHECK ICON */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs shadow-md">
                      ✓
                    </div>
                  )}

                  {/* LOGO */}
                  <img
                    src={op.logo}
                    alt={op.name}
                    className={`h-10 object-contain transition-all duration-300 ${
                      isSelected ? "scale-110" : ""
                    }`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />

                  {/* OPERATOR NAME (optional but improves UX) */}
                  <span
                    className={`text-sm mt-2 font-medium transition ${
                      isSelected ? "text-blue-600" : "text-gray-600"
                    }`}
                  >
                    {op.name}
                  </span>
                </div>
              );
            })}
          </div>

          {formik.errors.operator && (
            <p className="text-red-500 text-sm">
              {formik.errors.operator}
            </p>
          )}
        </div>

        {/* CIRCLE SELECTION (ONLY AFTER OPERATOR SELECTED) */}
        {formik.values.operator && (
          <div className="mt-6">
            <label className="text-sm text-gray-600">
              Select Circle (Optional)
            </label>

            <select
              value={formik.values.circle}
              onChange={(e) => formik.setFieldValue("circle", e.target.value)}
              className="w-full mt-2 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="">-- Select Circle --</option>

              {circles.map((circle) => (
                <option key={circle} value={circle}>
                  {circle}
                </option>
              ))}
            </select>

          </div>
        )}

        {/* AMOUNT - ONLY PREPAID */}
        {formik.values.type === "prepaid" && (
          <div className="mt-6 flex gap-3">
            <div className="relative">

        <input
          name="amount"
          value={searchQuery}
          onChange={(e) => {
            const val = e.target.value
              .slice(0, 8);       // max 8 digits

            setSearchQuery(val);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Search plan: 199, 1.5GB, 28 days..."
          inputMode="numeric"
        />

        {/* SUGGESTIONS DROPDOWN */}
        {showSuggestions && searchQuery && (
          <div className="absolute z-50 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">

            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((p) => (
                <div
                  key={p.amount}
                  onClick={() => {
                    formik.setFieldValue("amount", p.amount);
                    setSearchQuery(p.amount.toString());
                    setShowSuggestions(false);
                  }}
                  className="p-3 hover:bg-blue-50 cursor-pointer transition"
                >
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-800">
                      ₹{p.amount}
                    </span>
                    <span className="text-xs text-blue-600">
                      {p.category}
                    </span>
                  </div>

                  <div className="text-xs text-gray-500 mt-1">
                    {p.data} • {p.validity} • {p.calls}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-3 text-sm text-gray-400">
                No plans found
              </div>
            )}

          </div>
        )}

      </div>

      <button
        type="button"
        onClick={() => setShowPlans(true)}
        className="group flex items-center gap-2 px-4 py-3 rounded-xl 
        bg-gradient-to-r from-blue-600 to-indigo-600 
        text-white font-medium shadow-md 
        hover:shadow-xl hover:-translate-y-0.5 
        transition-all duration-300"
      >
        {/* small icon */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
          alt="plans"
          className="w-5 h-5 group-hover:scale-110 transition"
        />

        <span>Browse Plans</span>
      </button>
          </div>
        )}

        {/* POSTPAID INFO */}
        {formik.values.type === "postpaid" && (
          <div className="mt-6 bg-yellow-50 text-yellow-700 p-3 rounded-lg text-sm">
            📄 Postpaid bill will be fetched automatically after entering number
          </div>
        )}

        {/* PLANS MODAL */}
        {showPlans && formik.values.type === "prepaid" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">

            {/* MODAL BOX */}
            <div className="w-[92%] max-w-md bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden transform transition-all duration-300 scale-100">

              {/* HEADER */}
              <div className="bg-gradient-to-r from-cyan-600 to-indigo-600 p-4">
                <h2 className="text-white text-lg font-semibold text-center">
                  Choose Your Recharge Plan
                </h2>
                <p className="text-blue-100 text-xs text-center mt-1">
                  Select a plan that suits you best
                </p>
              </div>

        {/* TABS */}
        <div className="flex gap-2 overflow-x-auto mt-4 pb-3 mb-3 scrollbar-hide">
          {planTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 whitespace-nowrap rounded-full text-xs font-medium transition-all
                ${
                  activeTab === tab
                    ? "bg-teal-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
              {/* BODY */}
              <div className="p-5 max-h-[60vh] overflow-y-auto">

                {/* PLAN GRID */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredPlans.map((p) => (
                  <div
                    key={p.amount}
                    className="relative group border border-gray-200 rounded-xl p-4 bg-white 
                    hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                  >
                    {/* BACKGROUND GLOW (FIXED Z-INDEX) */}
                    <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition duration-300 -z-10" />

                    {/* CONTENT */}
                    <div className="relative z-10">

                      {/* CATEGORY TAG */}
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">
                        {p.category}
                      </span>

                      {/* PRICE */}
                      <h3 className="text-xl font-bold mt-2 text-gray-800">
                        ₹{p.amount}
                      </h3>

                      {/* DETAILS */}
                      <div className="mt-3 text-sm text-gray-600 space-y-1">
                        <p>📶 {p.data}</p>
                        <p>📞 {p.calls}</p>
                        <p>⏳ {p.validity}</p>
                        <p>💬 {p.sms}</p>
                      </div>

                      {/* ACTIONS */}
                      <div className="mt-4 flex justify-between items-center">

                        {/* SELECT */}
                        <button
                          type="button"
                          onClick={() => {
                            formik.setFieldValue("amount", p.amount);
                            setShowPlans(false);
                            setSearchQuery(p.amount.toString());
                            setShowSuggestions(false);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm 
                          hover:bg-blue-700 transition"
                        >
                          Select
                        </button>

                        {/* DETAILS */}
                        <button
                          type="button"
                          onClick={() => setSelectedPlan(p)}
                          className="text-sm font-medium text-gray-500 hover:text-blue-600 transition"
                        >
                          Show details
                        </button>

                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* PLAN DETAILS MODAL */}
        {selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

            <div className="w-[92%] max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

              {/* HEADER */}
              <div className="bg-gradient-to-r from-cyan-600 to-indigo-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-800 font-medium text-sm">
                    Plan Price
                  </h3>
                  <h1 className="text-3xl font-bold text-gray-900">
                    ₹{selectedPlan.amount}
                  </h1>
                </div>
                <p className="text-xs text-gray-200">
                  {selectedPlan.category}
                </p>
              </div>

              {/* CONTENT */}
              <div className="p-5 space-y-3 text-sm text-gray-700">

                <div className="grid grid-cols-2 gap-3">

                  <div className="bg-gray-50 p-3 rounded-lg">
                    📶 <b>Data</b>
                    <p>{selectedPlan.data}</p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    ⏳ <b>Validity</b>
                    <p>{selectedPlan.validity}</p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    📞 <b>Calls</b>
                    <p>{selectedPlan.calls}</p>
                  </div>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    💬 <b>SMS</b>
                    <p>{selectedPlan.sms}</p>
                  </div>

                </div>

                {/* EXTRA BENEFITS */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <b className="text-blue-600">Extra Benefits</b>
                  <p className="text-gray-600 mt-1">
                    Free access to OTT apps, high-speed data rollover, and unlimited night usage (if applicable).
                  </p>
                </div>

                {/* DESCRIPTION */}
                <div className="text-gray-600">
                  <b className="text-gray-800">About this plan</b>
                  <p className="mt-1">{selectedPlan.details}</p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-3 mt-4">

                  <button
                    onClick={() => {
                      formik.setFieldValue("amount", selectedPlan.amount);
                      setSelectedPlan(null);
                      setShowPlans(false);
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Recharge Now
                  </button>

                  <button
                    onClick={() => setSelectedPlan(null)}
                    className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    Close
                  </button>

                </div>

              </div>
            </div>
          </div>
        )}

                {/* CLOSE BUTTON */}
                <button
                  onClick={() => setShowPlans(false)}
                  className="mt-5 w-full py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition"
                >
                  ✕ Close
                </button>

              </div>
            </div>
          </div>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
          className={`mt-8 w-full py-3 rounded-lg text-white transition
            ${formik.isValid && formik.dirty
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          Proceed to Recharge
        </button>

      </form>
    </div>
  );
};

export default MobileRecharge;
