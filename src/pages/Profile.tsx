import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const Profile = () => {
  const [preview, setPreview] = useState("");

const getInitial = (name : any) => {
  if (!name) return "?";
  return name.charAt(0).toUpperCase();
};

  const formik = useFormik({
    initialValues: {
      name: "Rajesh Gole",
      email: "rajesh@gmail.com",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email required"),
      phone: Yup.string().min(10, "Enter valid phone"),
    }),
    onSubmit: (values) => {
      console.log("Profile Data:", values);
    }
  });

// const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
//   if (!e.target.files || e.target.files.length === 0) return;

//   const file = e.target.files[0];
//   setPreview(URL.createObjectURL(file));
// };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl">

        <h2 className="text-2xl font-bold text-center mb-6">
          My Profile
        </h2>

        <div className="flex justify-center mb-6">
        {preview ? (
            <img
            src={preview}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border"
            />
        ) : (
            <div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
            {getInitial(formik.values.name)}
            </div>
        )}

        <input
            type="file"
            className="absolute opacity-0 cursor-pointer"
        />
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-4">

          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full border p-3 rounded-lg"
            />
            {formik.errors.name && (
              <p className="text-red-500 text-sm">
                {formik.errors.name}
              </p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full border p-3 rounded-lg"
            />
            {formik.errors.email && (
              <p className="text-red-500 text-sm">
                {formik.errors.email}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              className="w-full border p-3 rounded-lg"
            />
          </div>


          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Update Profile
          </button>

        </form>
      </div>

    </div>
  );
};

export default Profile;