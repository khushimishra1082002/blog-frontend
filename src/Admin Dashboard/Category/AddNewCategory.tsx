import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";
import axios from "axios";
import ErrorMessages from "../../pages/ErrorMessages";
import { LuUser } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../Redux Toolkit/Store";
import { fetchAllUsers } from "../../Redux Toolkit/slice/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategory } from "../../Redux Toolkit/slice/CategorySlice";
import { FaPlus } from "react-icons/fa";
import { addNewCategoryData } from "../../services/CategoryService";

interface CategoryValues {
  name: string;
}

const AddNewCategory: React.FC = () => {
 
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  const initialValues: CategoryValues = {
    name: "",
  };

  const onSubmit = async (
    values: CategoryValues,
    onSubmitProps: FormikHelpers<CategoryValues>
  ) => {
    console.log("values", values);
    try {
      await addNewCategoryData(values);
      alert("Category added Successfully");
      dispatch(fetchAllCategory());
      navigate("/dashboard/category");

      onSubmitProps.resetForm();
    } catch (error: any) {
      console.error("error:", error);
      const errorMessage =
        error.response?.data?.message || " failed. Please try again.";
      alert(errorMessage);
    } finally {
      onSubmitProps.setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
  });

  return (
    <>
      <div className=" p-10 border border-black/15 w-[55vw] m-auto rounded-md space-y-4">
        <div className=" flex gap-1 items-center justify-center">
          <FaPlus className=" text-cyan-400 text-xl" />
          <h2 className="text-lg font-Inter font-medium text-center">
            Add New Category
          </h2>
        </div>
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
              <Form className="grid gap-7 ">
                <motion.div className="flex flex-col gap-1">
                  <label className=" font-Inter text-sm font-medium">
                    Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    className="py-3 rounded-md  border border-black/15  text-sm font-RobotoFlex
                     "
                  />
                  <ErrorMessage name="name" component={ErrorMessages} />
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
                  Add Category
                </motion.button>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </>
  );
};

export default AddNewCategory;
