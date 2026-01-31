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
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { editUserData, getSingleUserData } from "../../services/UserServices";
import { getDecodedToken } from "../../utils/tokenUtils";
import { getImageUrl } from "../../utils/getImageUrls";

interface UserValues {
  name: string;
  email: string;
  password: string;
  role: string;
  image: File | null;
}

const EditUser: React.FC = () => {
  const { id } = useParams() as { id: string };
  console.log("userid", id);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const [singleUser, setSingleUser] = useState<any>(null);

  useEffect(() => {
    const fetchSingleUser = async () => {
      try {
        const data = await getSingleUserData(id);
        setSingleUser(data);
      } catch (error) {
        console.log("Error fetching single user:", error);
      }
    };
    fetchSingleUser();
  }, [id]);

  if (!singleUser) {
    return <div>Loading...</div>;
  }

  const initialValues: UserValues = {
    name: singleUser.name || "",
    email: singleUser.email || "",
    password: singleUser.password || "",
    role: singleUser.role || "",
    image: singleUser.image || null,
  };

  // const onSubmit = async (
  //   values: UserValues,
  //   onSubmitProps: FormikHelpers<UserValues>,
  // ) => {
  //   console.log("yu",values);

  //   const formData = new FormData();
  //   formData.append("name", values.name);
  //   formData.append("email", values.email);
  //   formData.append("password", values.password);
  //   formData.append("role", values.role);
  //   if (values.image instanceof File) {
  //     formData.append("image", values.image);
  //   }

  //   formData.append("author", id);
  //   formData.append("createdAt", new Date().toISOString());

  //   try {
  //     const res = await editUserData(id, formData); // res.user has updated user

  //     alert("User edited successfully");

  //     // ✅ Step 1: update Formik values so preview shows new image
  //     onSubmitProps.setValues({
  //       ...values,
  //       image: res.user.image, // new image URL from backend
  //     });

  //     // ✅ Step 2: update singleUser state
  //     setSingleUser(res.user);

  //     // ✅ Step 3: optionally navigate if needed
  //     navigate("/dashboard/user");
  //   } catch (error: any) {
  //     console.error("Error:", error);
  //     const errorMessage =
  //       error.response?.data?.message || "Failed. Please try again.";
  //     alert(errorMessage);
  //   } finally {
  //     onSubmitProps.setSubmitting(false);
  //   }
  // };

  const onSubmit = async (
    values: UserValues,
    onSubmitProps: FormikHelpers<UserValues>,
  ) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("role", values.role);

    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      await editUserData(id, formData);
      alert("User edited successfully");
      navigate("/dashboard/user");
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
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .min(8, "Must contain at least 8 characters")
      .required("Required"),
    role: Yup.string().required("Role is required"),
  });

  return (
    <>
      <div className=" p-10 border border-black/15 w-[55vw] m-auto rounded-md space-y-4">
        <div className=" flex gap-1 items-center justify-center">
          <LuUser className=" text-cyan-400 text-2xl" />
          <h2 className="text-lg font-Inter font-medium text-center">
            Edit User
          </h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Formik
            initialValues={initialValues || singleUser}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            enableReinitialize
          >
            {(formik) => (
              <Form className="grid gap-7 ">
                {/* Image Preview */}
                <motion.div className="flex flex-col gap-1">
                  <label className="font-RobotoFlex text-sm">
                    Profile Image
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

                  {formik.values.image instanceof File ? (
                    <img
                      src={URL.createObjectURL(formik.values.image)}
                      alt="Preview"
                      className="w-20 h-20 object-cover mt-2 rounded"
                    />
                  ) : formik.values.image ? (
                    <img
                      src={formik.values.image} // now uses Formik value updated from backend
                      alt="Profile Preview"
                      className="w-20 h-20 object-cover mt-2 rounded"
                    />
                  ) : null}
                </motion.div>

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

                <motion.div className="flex flex-col gap-1">
                  <label className=" font-Inter text-sm font-medium">
                    Email
                  </label>
                  <Field
                    type="text"
                    name="email"
                    placeholder="Enter email"
                    className="py-3 rounded-md  border border-black/15  text-sm font-RobotoFlex"
                  />
                  <ErrorMessage name="email" component={ErrorMessages} />
                </motion.div>

                <motion.div className="   flex flex-col gap-1">
                  <label className=" font-Inter text-sm font-medium">
                    Role
                  </label>

                  <Field
                    as="select"
                    name="role"
                    className="py-3 rounded-md  text-sm font-RobotoFlex  border border-black/15"
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
                  Edit User
                </motion.button>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </>
  );
};

export default EditUser;
