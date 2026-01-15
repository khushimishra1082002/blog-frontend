import React, { useEffect, useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
  FormikProps,
} from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import axios from "axios";
import ErrorMessages from "./ErrorMessages";
import { AiOutlineEdit } from "react-icons/ai";
import { AppDispatch } from "../Redux Toolkit/Store";
import { fetchAllPosts } from "../Redux Toolkit/slice/PostSlice";
import { addNewPostData } from "../services/PostServices";
import { getDecodedToken } from "../utils/tokenUtils";
import { RootState } from "../Redux Toolkit/Store";
import { UseSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategory } from "../Redux Toolkit/slice/CategorySlice";
import { useNavigate } from "react-router-dom";

interface PostValues {
  title: string;
  content: string;
  category: string;
  tags: string;
  image: File | null;
  author: string;
  published: boolean;
  createdAt: string;
  isFeatured: boolean;
}

const AddPostByUser: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()

  const { category, loading, error } = useSelector(
    (state: RootState) => state.categoryData
  );
  console.log(category);

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  const initialValues: PostValues = {
    title: "",
    content: "",
    category: "",
    tags: "",
    image: null,
    author: "",
    published: true,
    createdAt: "",
    isFeatured: false,
  };

  const onSubmit = async (
    values: PostValues,
    formikHelpers: FormikHelpers<PostValues>
  ) => {
    const decoded = getDecodedToken();
    const userId = decoded?.id || "";

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("category", values.category);
    formData.append("tags", values.tags);
    formData.append("author", userId);
    formData.append("published", values.published.toString());
    formData.append("createdAt", new Date().toISOString());
    formData.append("isFeatured", values.isFeatured.toString());

    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      await addNewPostData(formData);
      alert("Post added Successfully");
      dispatch(fetchAllPosts());
      navigate("/");
      formikHelpers.resetForm();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed. Please try again.";
      alert(errorMessage);
    } finally {
      formikHelpers.setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    category: Yup.string().required("Category is required"),
    tags: Yup.string().required("Tags are required"),
  });

  return (
    <>
    
    <div className="m-8">
    <div className="p-10 border border-black/10 w-[55vw] m-auto rounded-md space-y-4">
        <div className="flex gap-1 items-center justify-center">
          <AiOutlineEdit className="text-cyan-400 text-2xl" />
          <h2 className="text-lg font-Inter font-medium text-center text-cyan-600 tracking-tight">
            Add New Post
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
            {(formik: FormikProps<PostValues>) => (
              <Form className="grid gap-7">
                {/* Image Upload */}
                <motion.div className="flex flex-col gap-1">
                  <label className="font-RobotoFlex text-sm">
                    Upload Image
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

                {/* Title */}
                <motion.div className="flex flex-col gap-1">
                  <label className="font-Inter text-sm font-medium">
                    Title
                  </label>
                  <Field
                    type="text"
                    name="title"
                    placeholder="Enter Title"
                    className="py-3 rounded-md border border-black/15 text-sm font-RobotoFlex"
                  />
                  <ErrorMessage name="title" component={ErrorMessages} />
                </motion.div>

                {/* Content */}
                <motion.div className="flex flex-col gap-1">
                  <label className="font-Inter text-sm font-medium">
                    Content
                  </label>
                  <Field
                    as="textarea"
                    name="content"
                    placeholder="Enter Content"
                    className="py-3 rounded-md border border-black/15 text-sm font-RobotoFlex"
                  />
                  <ErrorMessage name="content" component={ErrorMessages} />
                </motion.div>

                {/* Tags */}
                <motion.div className="flex flex-col gap-1">
                  <label className="font-Inter text-sm font-medium">Tags</label>
                  <Field
                    type="text"
                    name="tags"
                    placeholder="Enter Tags"
                    className="py-3 rounded-md border border-black/15 text-sm font-RobotoFlex"
                  />
                  <ErrorMessage name="tags" component={ErrorMessages} />
                </motion.div>

                <Field
                  as="select"
                  name="category"
                  className="py-3 rounded-md text-sm font-RobotoFlex border border-black/15"
                >
                  <option value="" disabled className="text-gray-500">
                    Select Category
                  </option>

                  {category.map((category: any) => (
                    <option key={category._id} value={category._id}>
                      {" "}
                      {/* Send _id here */}
                      {category.name}
                    </option>
                  ))}
                </Field>

                {/* Is Featured */}
                <motion.div className="flex items-center gap-2">
                  <label className="font-Inter text-sm font-medium">
                    Is Featured
                  </label>
                  <Field
                    type="checkbox"
                    name="isFeatured"
                    className="h-5 w-5"
                  />
                </motion.div>

                {/* Published Checkbox */}
                <motion.div className="flex items-center gap-2">
                  <label className="font-Inter text-sm font-medium">
                    Published
                  </label>
                  <Field type="checkbox" name="published" className="h-5 w-5" />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  whileHover={
                    formik.isValid && !formik.isSubmitting ? { scale: 1.1 } : {}
                  }
                  whileTap={
                    formik.isValid && !formik.isSubmitting ? { scale: 0.9 } : {}
                  }
                  className={`bg-sky-500 text-white px-4 py-2 w-full hover:bg-sky-600 duration-500 font-Roboto rounded font-semibold shadow-lg hover:scale-105 ${
                    !formik.isValid || formik.isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Create Post
                </motion.button>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </div>
    </>
  );
};

export default AddPostByUser;

