import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ChangePassword from "../Admin Dashboard/Profile/ChangePassword";

interface EditPasswordModelProps {
  openEditPasswordModal: boolean;
  setOpenEditPasswordModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditPasswordModel: React.FC<EditPasswordModelProps> = ({
  openEditPasswordModal,
  setOpenEditPasswordModal,
}) => {
  useEffect(() => {
    if (openEditPasswordModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openEditPasswordModal]);
  return (
    <AnimatePresence>
      {openEditPasswordModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-md  w-[45vw] text-center relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
              onClick={() => setOpenEditPasswordModal(false)}
            >
              <X className="text-xl" />
            </button>

            <ChangePassword setOpenEditPasswordModal={setOpenEditPasswordModal}/>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditPasswordModel;
