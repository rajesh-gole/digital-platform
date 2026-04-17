import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

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

const plans = [199, 239, 299, 399, 719, 999];

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

  const formik = useFormik({
    initialValues: {
      mobile: "",
      type: "prepaid", // ✅ DEFAULT PREPAID
      operator: "",
      amount: "",
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 md:p-10"
      >

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-gray-800">
          Mobile Recharge / Pay Bill
        </h1>

        <p className="text-gray-500 mt-1">
          Fast & secure recharge experience
        </p>

        {/* PREPAID / POSTPAID */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => formik.setFieldValue("type", "prepaid")}
            className={`px-4 py-2 rounded-lg border ${
              formik.values.type === "prepaid"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            Prepaid
          </button>

          <button
            type="button"
            onClick={() => {
              formik.setFieldValue("type", "postpaid");
              setShowPlans(false); // ❌ hide plans in postpaid
            }}
            className={`px-4 py-2 rounded-lg border ${
              formik.values.type === "postpaid"
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
          >
            Postpaid
          </button>
        </div>

        {/* MOBILE */}
        <div className="mt-6">
          <label className="text-sm text-gray-600">
            Mobile Number (10 digits)
          </label>

          <input
            value={formik.values.mobile}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 10);
              formik.setFieldValue("mobile", val);
            }}
            className="w-full mt-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter 10-digit mobile number"
          />

          {formik.errors.mobile && (
            <p className="text-red-500 text-sm">{formik.errors.mobile}</p>
          )}
        </div>

        {/* OPERATOR */}
        <div className="mt-6">
          <label className="text-sm text-gray-600">Select Operator</label>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
            {operators.map((op) => (
              <div
                key={op.name}
                onClick={() => formik.setFieldValue("operator", op.name)}
                className={`border rounded-lg p-3 flex flex-col items-center cursor-pointer hover:shadow-md transition ${
                  formik.values.operator === op.name
                    ? "border-blue-500 bg-blue-50"
                    : ""
                }`}
              >
                {/* ✅ FIXED LOGO */}
                <img
                  src={op.logo}
                  alt={op.name}
                  className="h-10 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                {/* <span className="text-sm mt-1">{op.name}</span> */}
              </div>
            ))}
          </div>

          {formik.errors.operator && (
            <p className="text-red-500 text-sm">
              {formik.errors.operator}
            </p>
          )}
        </div>

        {/* AMOUNT - ONLY PREPAID */}
        {formik.values.type === "prepaid" && (
          <div className="mt-6 flex gap-3">
            <input
              name="amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />

            <button
              type="button"
              onClick={() => setShowPlans(true)}
              className="px-4 py-3 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Browse Plans
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
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl w-96">

              <h2 className="text-lg font-bold mb-4">Select Plan</h2>

              <div className="grid grid-cols-2 gap-3">
                {plans.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      formik.setFieldValue("amount", p);
                      setShowPlans(false);
                    }}
                    className="border rounded-lg py-2 hover:bg-blue-50"
                  >
                    ₹{p}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowPlans(false)}
                className="mt-4 w-full text-sm text-red-500"
              >
                Close
              </button>

            </div>
          </div>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Proceed to Recharge
        </button>

      </form>
    </div>
  );
};

export default MobileRecharge;