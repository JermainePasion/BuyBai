import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <div className="pt-16 flex">
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

