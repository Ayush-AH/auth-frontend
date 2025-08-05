import React from "react";

const ProfilePage = () => {
  const handleLogout = () => {
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <img
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
            src="https://i.pravatar.cc/150?img=32"
            alt="Profile"
          />
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            John Doe
          </h2>
          <p className="text-gray-600 text-sm mt-1">johndoe@example.com</p>

          <div className="mt-6 w-full">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
