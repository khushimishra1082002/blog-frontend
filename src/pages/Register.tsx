import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";
import ErrorMessages from "./ErrorMessages";
import axios from "axios";
import conf from "../config/Conf";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/AuthServices";

interface RegisterValues {
  name: string;
  email: string;
  password: string;
  role: string;
  image: File | null;
}

interface RegisterProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register: React.FC<RegisterProps> = ({ setIsLoggedIn }) => {
  const [hide, setHide] = useState<boolean>(true);
  const navigate = useNavigate();

  const initialValues: RegisterValues = {
    name: "",
    email: "",
    password: "",
    role: "user",
    image: null,
  };

  const onSubmit = async (
    values: RegisterValues,
    onSubmitProps: FormikHelpers<RegisterValues>
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("role", values.role);
      if (values.image) {
        formData.append("image", values.image);
      }

      const response = await registerUser(formData);

      if (response.success) {
        alert("Registered Successfully");
        setIsLoggedIn(false);
        onSubmitProps.resetForm();
        navigate("/LoggedInPage?type=login");
      } else {
        alert(response.message);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Registration failed.";
      alert(errorMessage);
    } finally {
      onSubmitProps.setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(8, "Must contain at least 8 characters")
      .required("Required"),
    role: Yup.string().required("Role is required"),
  });

  return (
    <>
      <div className="border border-black/10 p-6 md:p-7 rounded-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(formik) => (
              <Form className="grid gap-5">
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center">
                    <img
                      className="w-14"
                      src="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
                      alt="User Avatar"
                    />
                    <h1 className="text-xl font-Poppins">
                      Create Your Account
                    </h1>
                  </div>
                </div>

                <motion.div className="flex flex-col gap-1">
                  <label className="font-RobotoFlex text-sm">
                    Upload Profile Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0] || null;
                      formik.setFieldValue("image", file);
                    }}
                    className="bg-gray-50 py-3 rounded-md text-sm font-RobotoFlex"
                  />
                </motion.div>

                {/* Name Field */}
                <motion.div className="flex flex-col gap-1">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    className="py-3 rounded-md bg-gray-50 border-none text-sm font-RobotoFlex"
                  />
                  <ErrorMessage name="name" component={ErrorMessages} />
                </motion.div>

                {/* Email Field */}
                <motion.div className="flex flex-col gap-1">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    className="py-3 rounded-md bg-gray-50 border-none text-sm font-RobotoFlex"
                  />
                  <ErrorMessage name="email" component={ErrorMessages} />
                </motion.div>

                {/* Password Field */}
                <motion.div className="relative flex flex-col gap-1">
                  <div className="relative">
                    <Field
                      name="password"
                      placeholder="Enter Your Password"
                      type={hide ? "password" : "text"}
                      className="w-full pr-10 py-3 rounded-md bg-gray-50 border-none text-sm font-RobotoFlex"
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
                  <ErrorMessage name="password" component={ErrorMessages} />
                </motion.div>

                {/* Role Field */}
                <motion.div className=" bg-gray-50 flex flex-col gap-1">
                  <Field
                    as="select"
                    name="role"
                    className="py-3 rounded-md border-none text-sm font-RobotoFlex bg-gray-50"
                  >
                    <option value="" disabled className=" text-gray-500">
                      Select Your Role
                    </option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                  </Field>
                  <ErrorMessage name="role" component={ErrorMessages} />
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
                  Create Account
                </motion.button>

                {/* Create Account Link */}
                <div className="flex justify-center gap-2">
                  <span className="font-RobotoFlex">
                    Already have an account?
                  </span>
                  <motion.button
                    onClick={() => navigate("/LoggedInPage?type=login")}
                    className="hover:underline text-[15px] font-RobotoFlex text-cyan-500 font-medium"
                    whileHover={{ scale: 1.05, color: "#06b6d4" }}
                  >
                    Login
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

export default Register;
