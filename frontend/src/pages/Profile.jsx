import React from "react";
import MyOrderPages from "./MyOrderPages";

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          {/*left section  */}
          <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
            <h1 className="text-xl font-bold md:text-3xl mb-4">
              Manoranjan Kumar
            </h1>
            <p className="text-lg textgray600 mb-4">admin@gmail.com</p>
            <button className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-gray-700">
              Logout
            </button>
          </div>
          {/* Right section : Order Table */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrderPages />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
