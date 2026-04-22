import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import bg_img from "../assets/bg_img3.png";

const operators = [
  {
    name: "Tata Play",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Tata_Play_2022_logo.svg/960px-Tata_Play_2022_logo.svg.png",
  },
  {
    name: "Airtel Digital TV",
    logo: "https://static.wikia.nocookie.net/logopedia/images/f/fd/Airtel_Digital_TV_2015.png",
  },
  {
    name: "Dish TV",
    logo: "https://static.wikia.nocookie.net/logopedia/images/1/19/DishTV_logo_%282025%29.svg",
  },
  {
    name: "Sun Direct",
    logo: "https://static.wikia.nocookie.net/logopedia/images/f/f6/Sun_Direct-HD.png",
  },
  {
    name: "DD Free Dish",
    logo: "https://play-lh.googleusercontent.com/9A2D-notPDABU1fBH1soYbBnIeK9oPrmBvU4l7PuxNZcIi0YC7anW57NunL9jmeRRQ",
  },
];

const validationSchema = Yup.object({
  operator: Yup.string().required("Select operator"),
  customerId: Yup.string().required("Customer ID required"),
  amount: Yup.number().min(50).required("Enter amount"),
});

const DTHRecharge = () => {
  const [loading, setLoading] = useState(false);

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

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-md">

        {/* Glass Card */}
        <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl p-6 md:p-8">

          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            📺 DTH Recharge
          </h2>

          <Formik
            initialValues={{
              operator: "",
              customerId: "",
              amount: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              setLoading(true);

              setTimeout(() => {
                console.log(values);
                alert("Recharge Successful");
                setLoading(false);
              }, 2000);
            }}
          >
            {({ setFieldValue, values }) => (
              <Form className="space-y-5">

                {/* Operator */}
                <div>
                  <p className="font-semibold mb-3 text-gray-700">
                    Select Operator
                  </p>

                  <div className="grid grid-cols-3 gap-3">
                    {operators.map((op) => (
                      <button
                        key={op.name}
                        type="button"
                        onClick={() => setFieldValue("operator", op.name)}
                        className={`rounded-xl border p-3 flex flex-col items-center justify-center transition-all duration-300
                        ${
                          values.operator === op.name
                            ? "border-blue-600 bg-blue-50 shadow-md scale-105"
                            : "border-gray-200 hover:bg-blue-50 hover:scale-105"
                        }`}
                      >
                        <img
                          src={op.logo}
                          alt={op.name}
                          className="h-8 object-contain mb-1"
                        />

                        <span className="text-xs text-center font-medium">
                          {op.name}
                        </span>
                      </button>
                    ))}
                  </div>

                  <ErrorMessage
                    name="operator"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Customer ID */}
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Customer ID / VC Number
                  </label>

                  <Field
                    name="customerId"
                    placeholder="Enter VC Number"
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 mt-1 outline-none transition"
                  />

                  <ErrorMessage
                    name="customerId"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                {/* Amount */}
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Recharge Amount
                  </label>

                  <Field
                    name="amount"
                    type="number"
                    placeholder="Enter amount"
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg p-3 mt-1 outline-none transition"
                  />

                  <ErrorMessage
                    name="amount"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
                >
                  {loading ? "Processing..." : "Recharge Now"}
                </button>

              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default DTHRecharge;