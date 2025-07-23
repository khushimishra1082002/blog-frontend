import React, { useState } from "react";
import api from "../utils/api";
import conf from "../config/Conf";

const SubscriptionForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    try {
      const response = await api.post(conf.SubsribeUrl, { email });

      if (response.status === 201) {
        alert("subscribe successfully")
        setMessage("Subscribed successfully!");
        setEmail("");
      } else {
        setMessage("Something went wrong.");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setMessage("You are already subscribed.");
      } else {
        setMessage("Error subscribing. Please try again.");
      }
    }
  };

  return (
    <>
    <div className="flex  md:flex-row items-start md:items-center ">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="md:w-80 border border-black/10 rounded-md text-sm p-2"
      />
      <button
        onClick={handleSubscribe}
        className="bg-gray-950 text-white font-Inter
         rounded-sm hover:scale-105 duration-500 text-sm p-2 tracking-wider"
      >
        Subscribe
      </button>
      
    </div>
    
    </>
  );
};

export default SubscriptionForm;
