import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import ErrorMessages from "./ErrorMessages";
import { useNavigate } from "react-router-dom";

interface values {
  name: string;
  email: string;
}

interface valueProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Contact: React.FC<valueProps> = ({ setIsLoggedIn }) => {
  const [hide, setHide] = useState<boolean>(true);
  const navigate = useNavigate();

  const initialValues: values = {
    name: "",
    email: "",
  };

  const onSubmit = async (
    values: values,
    onSubmitProps: FormikHelpers<values>
  ) => {
    console.log(values);
    alert("Form Submitted successfully")
    navigate("/")
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Required"),
  });

  return (
    <>
      <div className="border border-black/10 md:p-10 rounded-md 
       flex justify-center items-center">
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
              <Form className="grid gap-5 w-[80vw] md:w-[45vw] m-auto border border-black/10 p-6 md:p-12">
                <div className="flex flex-col items-center justify-center">
                  <div className="flex items-center">
                    <h1 className="text-xl font-Poppins font-medium">Contact Us</h1>
                  </div>
                </div>

                {/* Name Field */}
                <motion.div className="flex flex-col gap-1">
                    <label>Name</label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter Your Name"
                    className="py-3 rounded-md border border-black/10  text-sm font-RobotoFlex"
                  />
                  <ErrorMessage name="name" component={ErrorMessages} />
                </motion.div>

                {/* Email Field */}
                <motion.div className="flex flex-col gap-1">
                    <label>Email</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter Your Email"
                    className="py-3 rounded-md border border-black/10  text-sm font-RobotoFlex"
                  />
                  <ErrorMessage name="email" component={ErrorMessages} />
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
                  Submit
                </motion.button>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </>
  );
};

export default Contact;
