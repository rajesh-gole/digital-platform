import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),

    name: !isLogin
      ? Yup.string().required("Name is required")
      : Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validationSchema,
    onSubmit: (values) => {
      if (isLogin) {
        console.log("Login Data", values);
      } else {
        console.log("Signup Data", values);
      }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Create Account"}
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">

          {!isLogin && (
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formik.errors.name && formik.touched.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}
            </div>
          )}

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already registered?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 ml-2 font-medium"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>

      </div>

    </div>
  );
};

export default Login;