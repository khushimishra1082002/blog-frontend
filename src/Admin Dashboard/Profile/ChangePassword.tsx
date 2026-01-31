import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux Toolkit/Store";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";
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

interface EditPasswordProps {
  setOpenEditPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangePassword: React.FC<EditPasswordProps> = ({
  setOpenEditPasswordModal,
}) => {
  const [hideOld, setHideOld] = useState(true);
  const [hideNew, setHideNew] = useState(true);
  const [hideConfirm, setHideConfirm] = useState(true);

  const decoded = getDecodedToken();
  console.log(decoded);

  const userId = decoded?.id ?? "";

  console.log("userId", userId);

  const initialValues: FormValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const onSubmit = async (
    values: FormValues,
    onSubmitProps: FormikHelpers<FormValues>,
  ) => {
    console.log(values);
    try {
      const token = localStorage.getItem("token");
      const res = await api.put(`${conf.ChangePasswordUrl}/${userId}`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Password Changed successfully");
      setOpenEditPasswordModal(false);
      onSubmitProps.resetForm();
    } catch (error: any) {
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
          <Form className="grid gap-3 border border-black/10 p-12 rounded shadow-lg ">
            <div className=" flex  gap-1 items-center justify-center">
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
              <label className="text-left font-Inter text-sm font-medium">
                Old Password
              </label>
              <div className="relative">
                <Field
                  name="oldPassword"
                  placeholder="Enter your old password"
                  type={hideOld ? "password" : "text"}
                  className="w-full pr-10 py-3 rounded-md text-sm font-RobotoFlex border border-black/15 px-3"
                />
                <span
                  onClick={() => setHideOld(!hideOld)}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                >
                  {hideOld ? (
                    <AiFillEyeInvisible className="text-xl" />
                  ) : (
                    <AiFillEye className="text-xl" />
                  )}
                </span>
              </div>
              <div className="error">
                <ErrorMessage name="oldPassword" component={ErrorMessages} />
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col gap-1"
              transition={{ duration: 0.2 }}
            >
              {/* Label */}
              <label className="text-left font-Inter text-sm font-medium">
                New Password
              </label>

              {/* Input + Eye Icon */}
              <div className="relative">
                <Field
                  name="newPassword"
                  placeholder="Enter your new password"
                  type={hideNew ? "password" : "text"}
                  className="w-full pr-10 py-3 rounded-md text-sm font-RobotoFlex border border-black/15 px-3"
                />
                <span
                  onClick={() => setHideNew(!hideNew)}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                >
                  {hideNew ? (
                    <AiFillEyeInvisible className="text-xl" />
                  ) : (
                    <AiFillEye className="text-xl" />
                  )}
                </span>
              </div>

              {/* Error Message */}
              <div className="error">
                <ErrorMessage name="newPassword" component={ErrorMessages} />
              </div>
            </motion.div>

            <motion.div
              className="flex flex-col gap-1"
              transition={{ duration: 0.2 }}
            >
              {/* Label */}
              <label className="text-left font-Inter text-sm font-medium">
                Confirm Password
              </label>

            
              <div className="relative">
                <Field
                  name="confirmPassword"
                  placeholder="Enter your confirm password"
                  type={hideConfirm ? "password" : "text"}
                  className="w-full pr-10 py-3 rounded-md text-sm font-RobotoFlex border border-black/15 px-3"
                />
                <span
                  onClick={() => setHideConfirm(!hideConfirm)}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                >
                  {hideConfirm ? (
                    <AiFillEyeInvisible className="text-xl" />
                  ) : (
                    <AiFillEye className="text-xl" />
                  )}
                </span>
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
