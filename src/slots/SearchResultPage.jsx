import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function SearchResultPage() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || ""; // matches backend 'name'
  const minPrice = Number(searchParams.get("minPrice") || 0);
  const maxPrice = Number(searchParams.get("maxPrice") || 1000000);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/search?name=${name}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [name, minPrice, maxPrice]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>

      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <Link
              to={`/product-details/${p._id}`}
              key={p._id}
              className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold text-gray-800">{p.name}</h3>
              <p className="text-blue-600 font-bold mt-1">${p.price}</p>
              <p className="text-sm text-gray-500 mt-1">{p.category}</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          No products found in this range/category.
        </p>
      )}
    </div>
  );
}

export default SearchResultPage;
