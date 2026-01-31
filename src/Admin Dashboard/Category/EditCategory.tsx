import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import ErrorMessages from "../../pages/ErrorMessages";
import { LuUser } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../Redux Toolkit/Store";
import { fetchAllUsers } from "../../Redux Toolkit/slice/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllCategory } from "../../Redux Toolkit/slice/CategorySlice";
import { getSingleCategoryData } from "../../services/CategoryService";
import { editCategoryData } from "../../services/CategoryService";

interface CategoryValues {
  name: string;
}

const EditCategory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams() as { id: string };
  console.log("id", id);
  const navigate = useNavigate();
  const [singleCategory, setSingleCategory] = useState<CategoryValues>();

  useEffect(() => {
    const fetchSingleCategory = async () => {
      try {
        const data = await getSingleCategoryData(id);
        setSingleCategory(data);
      } catch (error) {
        console.log("Error fetching single post:", error);
      }
    };
    fetchSingleCategory();
  }, [id]);

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  if (!singleCategory) {
    return <div>Loading...</div>;
  }

  const initialValues: CategoryValues = {
    name: singleCategory.name || "",
  };

  const onSubmit = async (
    values: CategoryValues,
    onSubmitProps: FormikHelpers<CategoryValues>,
  ) => {
    try {
      await editCategoryData(id, values);
      alert("category edited successfully");
      navigate("/dashboard/category");
      onSubmitProps.resetForm();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed. Please try again.";
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
          <LuUser className=" text-cyan-400 text-2xl" />
          <h2 className="text-lg font-Inter font-medium text-center">
            Edit Category
          </h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Formik
            initialValues={initialValues || singleCategory}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            enableReinitialize
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
                  Edit Category
                </motion.button>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </>
  );
};

export default EditCategory;
