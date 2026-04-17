import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const operators = [
  {
    name: "Tata Play",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Tata_Play_2022_logo.svg/960px-Tata_Play_2022_logo.svg.png?_=20220126181240",
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
    <div className="min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-6">

        <h2 className="text-2xl font-bold mb-6">📺 DTH Recharge</h2>

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
            <Form className="space-y-4">

              {/* Operator Selection */}
              <div>
                <p className="font-medium mb-2">Select Operator</p>

                <div className="grid grid-cols-3 gap-3">
                  {operators.map((op) => (
                    <button
                      key={op.name}
                      type="button"
                      onClick={() => setFieldValue("operator", op.name)}
                      className={`border rounded-lg p-3 flex flex-col items-center hover:bg-blue-50
                        ${
                          values.operator === op.name
                            ? "border-blue-500 bg-blue-50"
                            : ""
                        }`}
                    >
                      <img
                        src={op.logo}
                        alt={op.name}
                        className="h-8 object-contain mb-1"
                      />

                      <span className="text-xs text-center">
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
                <label className="text-sm font-medium">
                  Customer ID / VC Number
                </label>

                <Field
                  name="customerId"
                  placeholder="Enter VC Number"
                  className="w-full border rounded-lg p-2 mt-1"
                />

                <ErrorMessage
                  name="customerId"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="text-sm font-medium">
                  Recharge Amount
                </label>

                <Field
                  name="amount"
                  type="number"
                  placeholder="Enter amount"
                  className="w-full border rounded-lg p-2 mt-1"
                />

                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
              >
                {loading ? "Processing..." : "Recharge Now"}
              </button>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DTHRecharge;