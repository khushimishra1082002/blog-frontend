import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LonginAdmin } from "../services/AdminService";
import ErrorMessages from "../pages/ErrorMessages";

interface LoginValues {
  email: string;
  password: string;
}

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [hide, setHide] = useState<boolean>(true);

  const initialValues: LoginValues = { email: "", password: "" };

  const onSubmit = async (
    values: LoginValues,
    onSubmitProps: FormikHelpers<LoginValues>,
  ) => {
    try {
      const response = await LonginAdmin(values);

      alert(response.message);
      localStorage.removeItem("loggingOut");
      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      alert(error.response?.data?.message || "Invalid email or password");
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(4, "Must contain at least 4 characters")
      .required("Required"),
  });

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-8 md:p-2"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/beautiful-illustration-with-smoke-colorful-background_265989-17893.jpg?semt=ais_user_personalization&w=740&q=80')",
      }}
    >
      <div
        className=" p-8 rounded
        bg-white w-full max-w-md"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center mb-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
              alt="admin icon"
              className="w-12 h-12 rounded-full mb-2"
            />
            <h1 className="text-xl font-semibold text-gray-800 font-Inter">
              Admin Login
            </h1>
            <p className="text-gray-900 text-sm font-Roboto">
              Enter your credentials to access the dashboard
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(formik) => (
              <Form className="grid gap-5">
                {/* Email Field */}
                <motion.div
                  className="flex flex-col gap-1"
                  animate={
                    formik.errors.email && formik.touched.email
                      ? { x: [0, -5, 5, -5, 0] }
                      : {}
                  }
                  transition={{ duration: 0.2 }}
                >
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    className="py-3 rounded-md bg-gray-50 border-none text-sm font-RobotoFlex"
                  />
                  <div className="error">
                    <ErrorMessage name="email" component={ErrorMessages} />
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div
                  className="relative flex flex-col gap-1"
                  animate={
                    formik.errors.password && formik.touched.password
                      ? { x: [0, -5, 5, -5, 0] }
                      : {}
                  }
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative">
                    <Field
                      name="password"
                      placeholder="Enter Your Password"
                      type={hide ? "password" : "text"}
                      className="w-full  pr-10 
                      py-3 rounded-md bg-gray-50 border-none text-sm font-RobotoFlex"
                    />
                    {hide ? (
                      <AiFillEyeInvisible
                        onClick={() => setHide(!hide)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-2xl cursor-pointer"
                      />
                    ) : (
                      <AiFillEye
                        onClick={() => setHide(!hide)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-2xl cursor-pointer"
                      />
                    )}
                  </div>
                  <div className="error">
                    <ErrorMessage name="password" component={ErrorMessages} />
                  </div>
                </motion.div>
                {/* Submit Button */}
                <motion.button
                  whileHover={
                    !formik.isValid || formik.isSubmitting ? {} : { scale: 1.1 }
                  }
                  whileTap={
                    !formik.isValid || formik.isSubmitting ? {} : { scale: 0.9 }
                  }
                  className={`bg-sky-500 text-white px-4 py-2 w-full
                           hover:bg-sky-600 duration-500 font-Roboto rounded font-semibold
                           shadow-lg hover:scale-100
                              ${
                                !formik.isValid || formik.isSubmitting
                                  ? "opacity-50 cursor-not-allowed"
                                  : "cursor-pointer"
                              }`}
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Login
                </motion.button>
              </Form>
            )}
          </Formik>

          <p className="text-center text-gray-400 text-xs mt-4">
            © 2026 Your Company. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
