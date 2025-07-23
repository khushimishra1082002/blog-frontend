import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux Toolkit/Store";
import { jwtDecode } from "jwt-decode";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";
import axios from "axios";
import ErrorMessages from "../../pages/ErrorMessages";
import { TbLockPassword } from "react-icons/tb";
import conf from "../../config/Conf";
import api from "../../utils/api";
import { getDecodedToken } from "../../utils/tokenUtils";

interface FormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword: React.FC = () => {
  const [hideOld, setHideOld] = useState(true);
const [hideNew, setHideNew] = useState(true);
const [hideConfirm, setHideConfirm] = useState(true);

  const token = localStorage.getItem("token");
  const dispatch = useDispatch<AppDispatch>();

  const decoded = getDecodedToken();
  console.log(decoded);
  
  const userId = decoded?.id ?? "";

  console.log("userId",userId);
  

  const initialValues: FormValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const onSubmit = async (values,onSubmitProps) => {
   console.log(values);
   try{
    const token = localStorage.getItem("token");
    const res = await api.put(`${conf.ChangePasswordUrl}/${userId}`,values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    alert("Password Changed successfully");
    onSubmitProps.resetForm();
   }
   
   catch(error){
    console.error("Error:", error);
    const errorMessage =
      error.response?.data?.message || "Failed. Please try again.";
    alert(errorMessage);
   }
    
  };

  const validationSchema = Yup.object({
    // password: Yup.string()
    //   .min(8, "Must contain at least 8 characters")
    //   .required("Required"),
  });

  return (
    <div className="w-10/12 m-auto p-5">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form className="grid gap-7 border border-black/10 p-12 rounded ">
            <div className=" flex  flex-col gap-1 items-center justify-center">
              <TbLockPassword className=" text-sky-500 text-2xl" />
              <h2
                className="text-lg font-Inter font-medium text-center
              tracking-wider"
              >
                Change Your Password
              </h2>
            </div>

            <motion.div
              className="relative flex flex-col gap-1"
              transition={{ duration: 0.2 }}
            >
              <div className="relative space-y-2">
                <label className=" font-Inter text-sm font-medium">
                  Old Password
                </label>
                <Field
                  name="oldPassword"
                  placeholder="Enter Your oldPassword"
                  type={hideOld ? "oldPassword" : "text"}
                  className="w-full pr-10 py-3 rounded-md  text-sm font-RobotoFlex
                   border border-black/15 px-3"
                />
                {hideOld ? (
                  <AiFillEyeInvisible
                    onClick={() => setHideOld(!hideOld)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-xl cursor-pointer
                    text-gray-500"
                  />
                ) : (
                  <AiFillEye
                    onClick={() => setHideOld(!hideOld)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-xl cursor-pointer
                    text-gray-500"
                  />
                )}
              </div>
              <div className="error">
                <ErrorMessage name="oldPassword" component={ErrorMessages} />
              </div>
            </motion.div>

            <motion.div
              className="relative flex flex-col gap-1"
              transition={{ duration: 0.2 }}
            >
              <div className="relative space-y-2">
                <label className=" font-Inter text-sm font-medium">
                  New Password
                </label>
                <Field
                  name="newPassword"
                  placeholder="Enter Your newPassword"
                  type={hideNew ? "newPassword" : "text"}
                  className="w-full pr-10 py-3 rounded-md  
                  text-sm font-RobotoFlex px-3 border border-black/15"
                />
                {hideNew ? (
                  <AiFillEyeInvisible
                    onClick={() => setHideNew(!hideNew)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-xl cursor-pointer
                    text-gray-500"
                  />
                ) : (
                  <AiFillEye
                    onClick={() => setHideNew(!hideNew)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-xl cursor-pointer
                    text-gray-500"
                  />
                )}
              </div>
              <div className="error">
                <ErrorMessage name="newPassword" component={ErrorMessages} />
              </div>
            </motion.div>

            <motion.div
              className="relative flex flex-col gap-1"
              transition={{ duration: 0.2 }}
            >
              <div className="relative space-y-2">
                <label className=" font-Inter text-sm font-medium">
                  Confirm Password
                </label>
                <Field
                  name="confirmPassword"
                  placeholder="Enter Your confirmPassword"
                  type={hideConfirm ? "oldPassword" : "text"}
                  className="w-full pr-10 py-3 rounded-md  text-sm font-RobotoFlex
                   border border-black/15 px-3"
                />
                {hideConfirm ? (
                  <AiFillEyeInvisible
                    onClick={() => setHideConfirm(!hideConfirm)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-xl cursor-pointer
                    text-gray-500"
                  />
                ) : (
                  <AiFillEye
                    onClick={() => setHideConfirm(!hideConfirm)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-xl cursor-pointer
                    text-gray-500"
                  />
                )}
              </div>
              <div className="error">
                <ErrorMessage
                  name="confirmPassword"
                  component={ErrorMessages}
                />
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
              Change password
            </motion.button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
