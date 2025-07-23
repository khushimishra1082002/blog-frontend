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
import { getDecodedToken } from "../../utils/tokenUtils";
import { getSingleUserData } from "../../services/UserServices";
import { editUserData } from "../../services/UserServices";

interface UserValues {
  name: string;
  email: string;
  password: string;
  role: string;
  image: string;
}

const EditProfile: React.FC = () => {
  
  const [hide, setHide] = useState<boolean>(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch<AppDispatch>();

  const decoded = getDecodedToken();
  console.log(decoded);
  
  const userId = decoded?.id ?? "";

  console.log("userId",userId);


  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

   const [singleUser, setSingleUser] = useState<any>(null);
   
     useEffect(() => {
       const fetchSingleUser = async () => {
         try {
           const data = await getSingleUserData(userId); 
           setSingleUser(data);
         } catch (error) {
           console.log("Error fetching single user:", error);
         }
       };
       fetchSingleUser();
     }, [userId]);

  if (!singleUser) {
    return <div>Loading...</div>;
  }

  const initialValues: UserValues = {
    name: singleUser.name || "",
    email: singleUser.email || "",
    password: singleUser.password || "",
    role: singleUser.role || "",
    image: singleUser.image || "",
  };

  const onSubmit = async (
     values: UserValues,
     onSubmitProps: FormikHelpers<UserValues>
   ) => {
      const decoded = getDecodedToken();
       console.log(decoded);
       
       const userId = decoded?.id ?? "";
     
       console.log("userId",userId);
 
     const formData = new FormData();
     formData.append("name", values.name);
     formData.append("email", values.email);
     formData.append("password", values.password);
     formData.append("role", values.role);
     if (values.image) {
       formData.append("image", values.image);
     }
     formData.append("author", userId);
     formData.append("createdAt", new Date().toISOString());
     console.log("formData", formData);
 
     try {
       await editUserData(userId, formData);
       alert("Profile updated successfully");
       navigate("/dashboard/profileDetails");
       onSubmitProps.resetForm();
     } catch (error: any) {
       console.error("Error:", error);
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
  });

  return (
    <>
      <div className=" p-10  w-[55vw] m-auto rounded-md space-y-4">
        <div className=" flex gap-1 items-center justify-center">
          <LuUser className=" text-cyan-400 text-2xl" />
          <h2 className="text-lg font-Inter font-medium text-center">
            Edit Profile
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

export default EditProfile;


