import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import EditProfile from "../Admin Dashboard/Profile/EditProfile";
import EditProfiles from "../Admin Dashboard/Profile/EditProfiles";

interface EditTaskModelProps {
  openEditModal: boolean;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditProfileModel: React.FC<EditTaskModelProps> = ({
  openEditModal,
  setOpenEditModal,
}) => {
  useEffect(() => {
    if (openEditModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openEditModal]);
  return (
    <AnimatePresence>
      {openEditModal && (
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
              onClick={() => setOpenEditModal(false)}
            >
              <X className="text-xl" />
            </button>

            <EditProfiles setOpenEditModal={setOpenEditModal} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModel;
