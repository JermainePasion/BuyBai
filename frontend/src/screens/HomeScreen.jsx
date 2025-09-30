import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayouts";
import ProductCard from "../components/ProductCard";
import CategoriesSidebar from "../components/CategoriesSidebar";
import RightSidebar from "../components/RightSidebar";

function HomeScreen({ searchTerm, mode }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row gap-6 min-h-screen">
        {/* Sidebar: centered on mobile, left-aligned on desktop */}
        <aside className="w-full md:w-64 flex justify-center md:justify-start">
          <CategoriesSidebar />
        </aside>

        {/* Products: take remaining space */}
        <div className="flex-1 flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No product found.
              </p>
            )}
          </div>
        </div>
        <aside className="w-full md:w-auto flex justify-center md:justify-start">
          <RightSidebar />
        </aside>
      </div>
    </DashboardLayout>
  );
}

export default HomeScreen;
