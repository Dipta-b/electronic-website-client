import React, { useState, Fragment } from "react";
import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function RegisterForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  const onSubmit = async (data) => {
    try {
      const res = await fetch("https://electronic-website-server.vercel.app/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();
console.log(result);
      if (!res.ok) {
        alert(result.message || "Registration failed");
      } else {
        setRegisteredUser(result); // store user data
        setIsOpen(true); // open modal
        reset(); // clear form
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-white rounded-lg shadow-md space-y-4"
      >
        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div className="relative ">
             <label className="block mb-1 font-medium">Password</label>
         <div className="flex items-center">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-2 pr-12 border rounded"
          />
          <span
            className="mr-5 top-9 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
          </span>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
         </div>
        </div>

        {/* Role */}
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <select
            {...register("role", { required: "Role is required" })}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Select role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
        </div>

        {/* Profile Image */}
        <div>
          <label className="block mb-1 font-medium">Profile Image URL</label>
          <input
            type="text"
            {...register("image")}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>

      {/* ✅ Headless UI Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="ease-in duration-200"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <Dialog.Panel className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
                <Dialog.Title className="text-lg font-bold mb-3">
                  🎉 Registration Successful
                </Dialog.Title>

                {registeredUser?.image && (
                  <img
                    src={registeredUser.image}
                    alt="Profile"
                    className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
                  />
                )}

                <p className="mb-2">Welcome, {registeredUser?.name}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Role: {registeredUser?.role}
                </p>

                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  OK
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

    </div>
  );
}

export default RegisterForm;