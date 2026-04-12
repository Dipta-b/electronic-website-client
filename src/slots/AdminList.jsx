import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";

const AdminList = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await fetch(`${import.meta.env.DEV ? "http://localhost:5000" : "https://electronic-website-server.vercel.app"}/users/admins`, {
          credentials: "include", // include cookies/session
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to fetch admins");
        }

        const data = await res.json();
        setAdmins(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);


const handleUser = async(id, name)=>{
    try {
      const res = await fetch(`${import.meta.env.DEV ? "http://localhost:5000" : "https://electronic-website-server.vercel.app"}/users/demote/${id}`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to demote admin");

      alert(data.message);
      setAdmins(prev => prev.filter(a => a._id !== id)); // remove demoted admin from list
    } catch (err) {
      console.error(err);
    }
}

  // Auth & access control
  if (authLoading || loading) return <p className="text-center mt-10">Loading...</p>;
  if (user && user.role === "user")
    return <p className="text-center mt-10 text-red-500">Access Denied</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!admins.length) return <p className="text-center mt-10">No admins found.</p>;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white border rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Admins</h2>
      <ul className="divide-y divide-gray-200">
        {admins.map((admin) => (
          <li key={admin._id} className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">{admin.name}</p>
              <p className="text-sm text-gray-500">{admin.email}</p>
            </div>
            <div>
              {
                user&& user.role==="admin"?<span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                Admin
              </span>:<span><button onClick={()=>handleUser(admin._id)} className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">Make user</button></span>
              }
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminList;