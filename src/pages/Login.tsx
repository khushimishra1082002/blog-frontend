import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";
import ErrorMessages from "./ErrorMessages";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/AuthServices"

interface LoginValues {
  email: string;
  password: string;
}

interface LoginProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [hide, setHide] = useState<boolean>(true);
  const initialValues: LoginValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (
    values: LoginValues,
    onSubmitProps: FormikHelpers<LoginValues>,
  ) => {
    try {
      const response = await loginUser(values);

      if (response.success) {
        alert(response.message);
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
        navigate("/");
      } else {
        alert(response.message);
      }
    } catch (error: any) {
      alert(error.message || "An unexpected error occurred.");
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(4, "Must contain at least 8 characters")
      .required("Required"),
  });

  return (
    <>
      <div className=" border border-black/10 p-6 md:p-10 rounded-md ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className=""
        >
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(formik) => (
              <Form className="grid gap-5">
                <div className=" flex flex-col items-center justify-center">
                  <div className="flex items-center">
                    <img
                      className="w-14"
                      src="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
                    />
                    <h1 className=" text-base md:text-xl font-Poppins">
                      Login Your Account
                    </h1>
                  </div>
                </div>

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
            shadow-lg hover:scale-105
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

                {/* Create Account Link */}
                <div className="flex justify-center gap-2">
                  <span className="font-RobotoFlex">
                    Don't have an account?
                  </span>
                  <motion.button
                    onClick={() => navigate("/LoggedInPage?type=register")}
                    className="hover:underline text-[15px] font-RobotoFlex text-cyan-500 font-medium"
                    whileHover={{ scale: 1.05, color: "#06b6d4" }}
                  >
                    Register
                  </motion.button>
                </div>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
