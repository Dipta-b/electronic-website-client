import React from "react";
import { Link } from "react-router-dom";

const ProductDetailsButton = ({ id, className = "" }) => {
  return (
    <Link
      to={`/product-details/${id}`}
      className={`inline-block mt-3 text-sm text-blue-500 hover:underline ${className}`}
    >
      View Details
    </Link>
  );
};

export default ProductDetailsButton;
