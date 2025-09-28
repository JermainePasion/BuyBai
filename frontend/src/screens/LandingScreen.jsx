import React from "react";

function LandingScreen({ mode }) {
  return (
    <div className={`p-4 md:p-6 min-h-screen ${mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      {/* Main Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <aside className={`col-span-12 md:col-span-3 p-4 rounded shadow-sm ${mode === "dark" ? "bg-gray-800" : "bg-gray-50"}`}>
          <h2 className="font-semibold mb-3">Categories</h2>
          <ul className="space-y-2">
            {Array.from({ length: 9 }).map((_, i) => (
              <li key={i} className="hover:text-blue-400 cursor-pointer transition-colors">
                Category {i + 1}
              </li>
            ))}
          </ul>
        </aside>

        {/* Center Content */}
        <main className="col-span-12 md:col-span-6">
          {/* Large Banner */}
          <div className="mb-6">
            <div className={`h-40 flex items-center justify-center rounded ${mode === "dark" ? "bg-blue-700" : "bg-blue-200"}`}>
              Large Banner
            </div>
          </div>

          {/* Medium Banners */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className={`h-24 flex items-center justify-center rounded ${mode === "dark" ? "bg-blue-600" : "bg-blue-200"}`}>
              Medium Banner 1
            </div>
            <div className={`h-24 flex items-center justify-center rounded ${mode === "dark" ? "bg-blue-600" : "bg-blue-200"}`}>
              Medium Banner 2
            </div>
          </div>

          {/* Daily Discover */}
          <h2 className="text-2xl font-semibold mb-4">Daily Discover</h2>

          {/* Scrollable on mobile, grid on desktop */}
          <div className="md:grid md:grid-cols-3 md:gap-4 flex gap-4 overflow-x-auto pb-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`aspect-square min-w-[140px] md:min-w-0 border p-3 rounded flex-shrink-0 cursor-pointer 
                  ${mode === "dark" ? "bg-gray-800 border-gray-700 hover:bg-gray-700" : "bg-white border-gray-200 hover:bg-gray-100"}
                  hover:scale-105 hover:shadow-lg transition-transform transition-colors duration-200 flex flex-col justify-between`}
                onClick={() => console.log(`Clicked product ${i + 1}`)}
              >
                <div className={`flex-1 mb-2 flex items-center justify-center rounded w-full ${mode === "dark" ? "bg-gray-700" : "bg-gray-200"}`}>
                  Image
                </div>
                <p className="font-medium mb-2 truncate">Product Name</p>
                <div className="flex justify-between text-sm text-gray-500 mt-auto">
                  <span className={`font-bold ${mode === "dark" ? "text-white" : "text-black"}`}>₱0.00</span>
                  <span>0 sold</span>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className={`col-span-12 md:col-span-3 p-4 rounded shadow-sm ${mode === "dark" ? "bg-gray-800" : "bg-gray-50"}`}>
          <h2 className="font-semibold mb-3">Recently Viewed</h2>
          <p className="mb-6">Product Placeholder</p>

          <h2 className="font-semibold mb-3">Trending Item</h2>
          <p>Product Placeholder</p>
        </aside>
      </div>
    </div>
  );
}

export default LandingScreen;
