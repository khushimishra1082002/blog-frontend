import React from "react";

interface ErrorProps {
  message?: string;
}

const Error: React.FC<ErrorProps> = ({
  message = "Something went wrong"
}) => {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="bg-red-50 border border-red-300 text-red-600 
      px-6 py-4 rounded-md text-center shadow-sm">
        <p className="text-sm md:text-base font-medium">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Error;
