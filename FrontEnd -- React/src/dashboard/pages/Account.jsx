import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Layouts/Layout";

export default function Account({ title }) {
  document.title = title;

  const [client, setClient] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const USER_ID = localStorage.getItem('userLoggedId');

  // For inline messages
  const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: string }

  // Get CSRF token from meta tag
  const csrfToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/clients").then((res) => {
      const userClient = res.data.find((c) => c.user_id === USER_ID);
      if (userClient) {
        setClient(userClient);
        setForm({
          name: userClient.name,
          email: userClient.user.email,
          phone: userClient.phone || "",
          address: userClient.address || "",
          password: "",
        });
      }
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    if (!client) return;
    setLoading(true);
    setMessage(null); // clear old messages

    const data = {
      name: form.name,
      email: form.email,
      password: form.password || undefined,
      phone: form.phone,
      address: form.address,
    };

    axios
      .put(`http://127.0.0.1:8000/api/clients/${client.id}`, data, {
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
      })
      .then((res) => {
        setMessage({ type: "success", text: "Profile updated successfully." });
        setClient(res.data);
        setForm({
          ...form,
          password: "",
        });
      })
      .catch((err) => {
        console.error(err);
        setMessage({
          type: "error",
          text:
            "Update failed: " +
            (err.response?.data?.message || "Unknown error"),
        });
      })
      .finally(() => setLoading(false));
  };

  const image =
    "https://allpublicstorage.s3.amazonaws.com/account_photos/7540_photo_170_170_3e6b592ad9.jpg";

  return (
    <Layout
      pageIcon="fa-user-circle"
      pageTitle="Account Settings"
      pagePath="Dashboard"
      title2="Account Setting"
    >
      <div className="flex flex-col gap-6">
        {/* Inline message */}
        {message && (
          <div
            className={`px-4 py-3 rounded-md text-white ${
              message.type === "success"
                ? "bg-green-500"
                : "bg-red-600"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          <div className="bg-[#1989FE] p-6 rounded-lg shadow-lg flex flex-col items-center justify-center w-full md:w-auto">
            <div className="relative w-32 h-32 mb-6">
              <img
                src={image}
                className="w-full h-full rounded-full object-cover border-2 border-white"
              />
              <label
                htmlFor="profile-upload"
                className="absolute inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <i className="fas fa-pencil text-white text-2xl"></i>
                <input
                  type="file"
                  id="profile-upload"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
            <h3 className="text-white font-medium text-lg">
              {form.name || "Loading..."}
            </h3>
          </div>

          <div className="bg-[#2C2D33] p-6 rounded-lg shadow-lg flex-1">
            <h3 className="text-white font-medium mb-4 border-b border-gray-600 pb-2">
              Main Settings
            </h3>

            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <div className="flex items-center border border-gray-600 rounded-md p-2 bg-[#2C2D33]">
                <i className="fas fa-user text-gray-400 mr-3"></i>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-transparent text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                E-mail
              </label>
              <div className="flex items-center border border-gray-600 rounded-md p-2 bg-[#2C2D33]">
                <i className="fas fa-envelope text-gray-400 mr-3"></i>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  readOnly
                  className="w-full bg-transparent text-white focus:outline-none opacity-60 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <div className="flex items-center border border-gray-600 rounded-md p-2 bg-[#2C2D33]">
                <i className="fas fa-phone text-gray-400 mr-3"></i>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="w-full mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Address
              </label>
              <div className="flex items-center border border-gray-600 rounded-md p-2 bg-[#2C2D33]">
                <i className="fas fa-map-marker-alt text-gray-400 mr-3"></i>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full bg-transparent text-white focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleUpdate}
              disabled={loading}
              className="px-6 py-2 bg-[#1989FE] text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </div>

        <div className="bg-[#2C2D33] p-6 rounded-lg shadow-lg">
          <h3 className="text-white font-medium mb-4 border-b border-gray-600 pb-2">
            Change Password
          </h3>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                New Password
              </label>
              <div className="flex items-center border border-gray-600 rounded-md p-2 bg-[#2C2D33]">
                <i className="fas fa-lock text-gray-400 mr-3"></i>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="w-full bg-transparent text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="flex items-center border border-gray-600 rounded-md p-2 bg-[#2C2D33]">
                <i className="fas fa-lock text-gray-400 mr-3"></i>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full bg-transparent text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-6 py-2 bg-[#1989FE] text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </div>
      </div>
    </Layout>
  );
}
