import React, { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import ChangePassword from "./ChangePassword";
import { Link } from "react-router-dom";
import conf from "../../config/Conf";
import { getImageUrl } from "../../utils/getImageUrls";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../Redux Toolkit/Store";
import { fetchProfile } from "../../Redux Toolkit/slice/ProfileSlice";
import EditProfiles from "./EditProfiles";

const ProfileDetails = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state: RootState) => state.profile);

  console.log("user in ProfileDetails:", user);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) await dispatch(fetchProfile());
      setLoading(false);
    };
    loadProfile();
  }, [user, dispatch]);

  if (loading) return <div className="text-center py-6">Loading...</div>;
  if (!user)
    return <div className="text-center text-red-500">User not found</div>;

  return (
    <>
      <div className=" bg-white grid gap-4">
        <EditProfiles />
      </div>
    </>
  );
};

export default ProfileDetails;
