import React, { useEffect, useMemo, useState } from "react";

// icons
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";

import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [data, setData] = useState([]);
  console.log("from all products", data);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // fetch products
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((products) => setData(products));
  }, []);

  // SEARCH
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [data, search]);

  // SORT
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Product?",
      text: "You cannot undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes delete it",
    });

    if (!result.isConfirmed) return;

    const res = await fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const deleteData = await res.json();

    if (deleteData.deletedCount > 0) {
      setData(data.filter((item) => item._id !== id));

      Swal.fire("Deleted!", "Product deleted successfully", "success");
    }
  };

  return (
    <div className="overflow-y-auto p-8 w-full flex flex-col gap-5">
      {/* SEARCH */}
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm py-2.5 px-4 border border-gray-200 rounded-md outline-none"
      />

      <div className="w-full rounded-md border overflow-hidden border-gray-200">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Image</th>

              <th className="p-3">
                <div className="flex items-center gap-1">
                  Name
                  <HiOutlineArrowsUpDown
                    onClick={() => handleSort("name")}
                    className="cursor-pointer"
                  />
                </div>
              </th>

              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Storage</th>
              <th className="p-3">Offer</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedData.map((product) => (
              <tr key={product._id} className="border-t hover:bg-gray-50">
                {/* IMAGE */}
                <td className="p-3">
                  <img
                    src={product.images?.[0] || product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>

                {/* NAME */}
                <td className="p-3">{product.name}</td>

                {/* CATEGORY */}
                <td className="p-3">{product.category}</td>

                {/* PRICE */}
                <td className="p-3">${product.price}</td>

                {/* STORAGE */}
                <td className="p-3">{product.storage}</td>

                {/* Offer active */}
                <td className="p-3">
                  {product.offerActive ? (
                    <>
                      <p>Offer available</p>
                    </>
                  ) : (
                    <></>
                  )}
                </td>

                {/* ACTIONS */}
                <td className="p-3">
                  <div className="flex flex-col gap-2">
                    {/* VIEW */}
                    <Link
                      to={`/dashboard/products/view/${product._id}`}
                      className="flex items-center gap-1 text-blue-600 hover:underline"
                    >
                      <IoEyeOutline /> View
                    </Link>

                    {/* EDIT */}
                    <Link
                      to={`/dashboard/products/update/${product._id}`}
                      className="flex items-center gap-1 text-green-600 hover:underline"
                    >
                      <MdOutlineEdit /> Edit
                    </Link>

                    {/* DELETE */}
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex items-center gap-1 text-red-600 hover:underline"
                    >
                      <MdDeleteOutline /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!sortedData.length && (
          <p className="text-gray-500 py-6 text-center">No products found</p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
