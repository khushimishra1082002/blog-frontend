import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { motion } from "framer-motion";
import ErrorMessages from "../../pages/ErrorMessages";
import { LuUser } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "../../Redux Toolkit/Store";
import { fetchAllUsers } from "../../Redux Toolkit/slice/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { addNewUserData } from "../../services/UserServices";

interface UserValues {
  name: string;
  email: string;
  password: string;
  role: string;
  image: File | null;
}

const AddNewUser: React.FC = () => {
  const [hide, setHide] = useState<boolean>(true);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const initialValues: UserValues = {
    name: "",
    email: "",
    password: "",
    role: "user",
    image: null,
  };

  const onSubmit = async (
    values: UserValues,
    onSubmitProps: FormikHelpers<UserValues>,
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
      await addNewUserData(formData);
      alert("User added Successfully");
      dispatch(fetchAllUsers());
      navigate("/dashboard/user");

      onSubmitProps.resetForm();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "User added failed.";
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
            Add New User
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

                <motion.div
                  className="relative flex flex-col gap-1"
                  animate={
                    formik.errors.password && formik.touched.password
                      ? { x: [0, -5, 5, -5, 0] }
                      : {}
                  }
                  transition={{ duration: 0.2 }}
                >
                  <label className="font-Inter text-sm font-medium">
                    Password
                  </label>

                  <div className="relative w-full">
                    <Field
                      name="password"
                      placeholder="Enter Your Password"
                      type={hide ? "password" : "text"}
                      className="w-full pr-10 py-3 rounded-md border border-black/15 text-sm font-RobotoFlex"
                    />

                    {/* Eye Icon */}
                    {hide ? (
                      <AiFillEyeInvisible
                        onClick={() => setHide(!hide)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-xl text-gray-500 cursor-pointer"
                      />
                    ) : (
                      <AiFillEye
                        onClick={() => setHide(!hide)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-xl text-gray-500 cursor-pointer"
                      />
                    )}
                  </div>

                  {/* Error Message */}
                  <div className="error">
                    <ErrorMessage name="password" component={ErrorMessages} />
                  </div>
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
                  Create User
                </motion.button>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </>
  );
};

export default AddNewUser;
