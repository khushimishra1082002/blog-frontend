import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessages from "../../pages/ErrorMessages";
import { RootState, AppDispatch } from "../../Redux Toolkit/Store";
import { editPostData, getSinglePostData } from "../../services/PostServices";
import { getDecodedToken } from "../../utils/tokenUtils";
import { fetchAllCategory } from "../../Redux Toolkit/slice/CategorySlice";
import conf from "../../config/Conf";
import { getImageUrl } from "../../utils/getImageUrls";

interface EditPostFormValues {
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

const EditPost: React.FC = () => {
  const { id } = useParams() as { id: string };
  const dispatch = useDispatch<AppDispatch>();
  const [singlePosts, setSinglePosts] = useState<any>(null);
  console.log("singlePosts", singlePosts);
  const { category, loading, error } = useSelector(
    (state: RootState) => state.categoryData
  );
  console.log("category",category);

  useEffect(() => {
    dispatch(fetchAllCategory());
  }, [dispatch]);

  const navigate = useNavigate();

  // Fetch post
  useEffect(() => {
    const fetchSinglePosts = async () => {
      try {
        const data = await getSinglePostData(id);
        setSinglePosts(data);
      } catch (error) {
        console.error("Error fetching single post:", error);
      }
    };
    fetchSinglePosts();
  }, [id]);

 

  if (!singlePosts) return <div>Loading...</div>;

  const initialValues: EditPostFormValues = {
    title: singlePosts.title || "",
    content: singlePosts.content || "",
    category: singlePosts.category?._id || "",
    tags: singlePosts.tags,
    image: null,
    author: singlePosts.author?._id || "",
    published: singlePosts.published || false,
    createdAt: singlePosts.createdAt || new Date().toISOString(),
    isFeatured: singlePosts.isFeatured || false,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    category: Yup.string().required("Category is required"),
  });

  const onSubmit = async (
    values: EditPostFormValues,
    onSubmitProps: FormikHelpers<EditPostFormValues>
  ) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("content", values.content);
    formData.append("category", values.category); 
    formData.append("tags", values.tags);
    formData.append("author", values.author); 
    formData.append("published", values.published.toString());
    formData.append("createdAt", values.createdAt);
    formData.append("isFeatured", values.isFeatured.toString());

    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      await editPostData(id, formData);
      alert("Post edited successfully");
      navigate("/dashboard/post");
      onSubmitProps.resetForm();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed. Please try again.";
      alert(errorMessage);
    } finally {
      onSubmitProps.setSubmitting(false);
    }
  };

  return (
    <div className="p-10 border border-black/15 w-[55vw] m-auto rounded-md space-y-4">
      <div className="flex gap-1 items-center justify-center">
        <AiOutlineEdit className="text-cyan-400 text-2xl" />
        <h2 className="text-lg font-Inter font-medium text-center">
          Edit Post
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
          enableReinitialize
        >
          {(formik) => (
            <Form className="grid gap-7">
              {/* Image upload */}
              <div className="flex flex-col gap-1">
                <label className="font-RobotoFlex text-sm">Post Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0] || null;
                    formik.setFieldValue("image", file);
                  }}
                  className="bg-gray-50 py-3 rounded-md text-sm font-RobotoFlex"
                />
                {singlePosts.image && typeof singlePosts.image === "string" && (
                  <img
                    src={getImageUrl(singlePosts.image)}
                    alt="Preview"
                    className="w-20 h-20 object-cover mt-2 rounded"
                  />
                )}
              </div>

              {/* Title */}
              <div className="flex flex-col gap-1">
                <label className="font-Inter text-sm font-medium">Title</label>
                <Field
                  type="text"
                  name="title"
                  placeholder="Enter Title"
                  className="py-3 rounded-md border border-black/15 text-sm font-RobotoFlex"
                />
                <ErrorMessage name="title" component={ErrorMessages} />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-1">
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
              </div>

              {/* Tags */}
              <div className="flex flex-col gap-1">
                <label className="font-Inter text-sm font-medium">Tags</label>
                <Field
                  type="text"
                  name="tags"
                  placeholder="Enter Tags"
                  className="py-3 rounded-md border border-black/15 text-sm font-RobotoFlex"
                />
                <ErrorMessage name="tags" component={ErrorMessages} />
              </div>

              {/* Category */}
              <div className="flex flex-col gap-1">
                <label className="font-Inter text-sm font-medium">
                  Category
                </label>
                <Field
                  as="select"
                  name="category"
                  className="py-3 rounded-md text-sm font-RobotoFlex border border-black/15"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {category.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="category" component={ErrorMessages} />
              </div>

              {/* Published */}
              <div className="flex items-center gap-2">
                <label className="font-Inter text-sm font-medium">
                  Published
                </label>
                <Field type="checkbox" name="published" className="h-5 w-5" />
              </div>

              {/* Is Featured */}
              <div className="flex items-center gap-2">
                <label className="font-Inter text-sm font-medium">
                  Is Featured
                </label>
                <Field type="checkbox" name="isFeatured" className="h-5 w-5" />
              </div>

              {/* Submit */}
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
                Edit Post
              </motion.button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  );
};

export default EditPost;
