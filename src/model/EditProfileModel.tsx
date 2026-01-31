import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import EditProfiles from "../Admin Dashboard/Profile/EditProfiles";

interface EditTaskModelProps {
  openEditProfileModal: boolean;
  setOpenEditProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfileModel: React.FC<EditTaskModelProps> = ({
  openEditProfileModal,
  setOpenEditProfileModal,
}) => {
  useEffect(() => {
    if (openEditProfileModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openEditProfileModal]);
  return (
    <AnimatePresence>
      {openEditProfileModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-md shadow-2xl p-9 w-[45vw] text-center relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
              onClick={() => setOpenEditProfileModal(false)}
            >
              <X className="text-xl" />
            </button>

            <EditProfiles setOpenEditProfileModal={setOpenEditProfileModal} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModel;
