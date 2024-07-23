import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bg from "../assets/REGISTER BG.jpg";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const next = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  
  const formik = useFormik({
    initialValues: {
      userName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      phoneNumber: Yup.string()
        .matches(/^[0-9-]+$/, "Invalid phone number")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      setSubmitting(true);
    
      try {
        const response = await axios.post(
          `${API_URL}/register`,
          values, 
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        toast.success("Registration successful!");
        next("/");
      } catch (error) {
        console.error("Error:", error);
        toast.error("User already exists or registration failed");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="flex justify-center min-h-screen">
          <div className="hidden bg-cover lg:block lg:w-2/5">
            <img src={bg} alt="" className="w-full h-full object-cover" />
          </div>

          <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div className="w-full">
              <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                Get your free account now.
              </h1>

              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Let’s get you all set up so you can verify your personal account
                and begin setting up your profile.
              </p>

              <form
                onSubmit={formik.handleSubmit}
                className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
              >
                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Username
                  </label>
                  <input
                    type="text"
                    name="userName"
                    placeholder="John"
                    className={`block w-full px-5 py-3 mt-2 text-gray-700 bg-white border ${
                      formik.touched.userName && formik.errors.userName
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.userName}
                  />
                  {formik.touched.userName && formik.errors.userName ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.userName}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Phone number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="XXX-XX-XXXX-XXX"
                    className={`block w-full px-5 py-3 mt-2 text-gray-700 bg-white border ${
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumber}
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.phoneNumber}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="@example.com"
                    className={`block w-full px-5 py-3 mt-2 text-gray-700 bg-white border ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className={`block w-full px-5 py-3 mt-2 text-gray-700 bg-white border ${
                      formik.touched.password && formik.errors.password
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Enter your password"
                    className={`block w-full px-5 py-3 mt-2 text-gray-700 bg-white border ${
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                  />
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.confirmPassword}
                    </div>
                  ) : null}
                </div>

            

                <button
                  type="submit"
                  className="flex items-center justify-between w-28 px-6 py-3 mt-6 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 col-span-1 md:col-span-2"
                  disabled={submitting}
                >
                  <span>{submitting ? "Submitting..." : "Sign Up"}</span>
                </button>
              </form>
              <div className="mt-5">
                You have an account?{" "}
                <Link to="/" className="text-blue-500">
                  {" "}
                  Login here{" "}
                </Link>
              </div>

              <ToastContainer />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterForm;
