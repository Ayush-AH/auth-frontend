import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
 const handleLogout = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
      method: "GET",
      credentials: "include", // send cookies
    });
    console.log(res);

    if (!res.ok) {
      throw new Error(`Logout failed: ${res.status}`);
    }

    const data = await res.json();
    console.log("Logout success:", data);
    toast.success(data.message || "Logout successful");

    // Optionally redirect user
    router.push("/");

  } catch (error) {
    toast.error(error.message || "Logout failed");
  }
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
