import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";

const PendingUsers = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  //those who want to became admin
  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const res = await fetch("https://electronic-website-server.vercel.app/users/pending", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch pending users");
        const data = await res.json();
        setPendingUsers(data);
      } catch (error) {
        console.error("Error fetching pending users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingUsers();
  }, []);

  if (authLoading || loading)
    return <p className="text-center mt-10">Loading...</p>;

  if (user && !["admin", "superadmin"].includes(user.role)) {
    return <p className="text-center mt-10 text-red-500">Access Denied</p>;
  }

  if (!pendingUsers.length)
    return <p className="text-center mt-10">No pending users found.</p>;


  //make admin function
const handleApproveToBecameAdmin = async(userId, userName) => {

  try {
    const res = await fetch(`https://electronic-website-server.vercel.app/users/approve/${userId}`,{
      method:'PATCH',
      credentials:'include',
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to approve user");

    alert(data.message);


        setPendingUsers(prev => prev.filter(u => u._id !== userId));

  } catch (error) {
     console.error(error);
  }
}


//reject to be admin function
const handleReject = async (id) => {
  try {
    const res = await fetch(`https://electronic-website-server.vercel.app/users/reject/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to reject user");
    alert("User rejected!");
    setPendingUsers((prev) => prev.filter(u => u._id !== id));
  } catch (err) {
    console.error(err);
  }
};



  return (
    <div className="w-full max-w-full p-4 sm:p-6 bg-neutral-primary-soft border border-default rounded-lg shadow-xs">
      <h5 className="text-xl font-semibold text-heading mb-6">
        Pending Users
      </h5>
      <ul className="divide-y divide-gray-200">
        {pendingUsers.map((u) => (
          <li key={u._id} className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">{u.name}</p>
              <p className="text-sm text-gray-500">{u.email}</p>
            </div>
            <div>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                onClick={() => handleApproveToBecameAdmin(u._id, u.name)}
              >
                Admin
              </button>
              <button
  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
  onClick={() => handleReject(u._id)}
>
  Reject
</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingUsers;