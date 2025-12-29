import { useState } from 'react'
import './App.css'
import { House, Package, Users } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}


function App() {
const [activeNav, setActiveNav] = useState("home");

  const navItems: NavItem[] = [
    {
      id: "home",
      label: "Home",
      icon: <House size={20} />,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "products",
      label: "Products",
      icon: <Package size={20} />,
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: "employees",
      label: "Employees",
      icon: <Users size={20} />,
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className='body'>
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo/Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl">Inventory Manager</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-4 px-3 py-3 rounded-lg transition-colors ${
                    activeNav === item.id
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${item.bgColor}`}
                  >
                    <span className={item.iconColor}>{item.icon}</span>
                  </div>
                  <span className="text-gray-900">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl text-gray-900 mb-1">
                {navItems.find((item) => item.id === activeNav)?.label}
              </h2>
              <p className="text-gray-600">
                {activeNav === "home" &&
                  "Welcome to your inventory management dashboard"}
                {activeNav === "products" &&
                  "View and manage your product inventory"}
                {activeNav === "employees" &&
                  "Manage employee access and information"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                <span>U</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {activeNav === "home" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100">
                      <Package className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-600">Total Products</p>
                      <p className="text-2xl text-gray-900">1,248</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100">
                      <svg
                        className="w-6 h-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-600">In Stock</p>
                      <p className="text-2xl text-gray-900">1,042</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100">
                      <svg
                        className="w-6 h-6 text-orange-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-600">Low Stock</p>
                      <p className="text-2xl text-gray-900">206</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg text-gray-900">Recent Activity</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[
                      {
                        action: "Product added",
                        item: "Wireless Mouse X200",
                        time: "2 minutes ago",
                      },
                      {
                        action: "Stock updated",
                        item: "Gaming Keyboard Pro",
                        time: "15 minutes ago",
                      },
                      {
                        action: "Product removed",
                        item: "USB Cable Type-C",
                        time: "1 hour ago",
                      },
                      {
                        action: "Employee access granted",
                        item: "John Smith",
                        time: "2 hours ago",
                      },
                    ].map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                      >
                        <div>
                          <p className="text-gray-900">{activity.action}</p>
                          <p className="text-gray-600">{activity.item}</p>
                        </div>
                        <span className="text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeNav === "products" && (
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg text-gray-900">Product Inventory</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Add Product
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      name: "Wireless Mouse X200",
                      sku: "WM-X200",
                      stock: 145,
                      status: "In Stock",
                    },
                    {
                      name: "Gaming Keyboard Pro",
                      sku: "GK-PRO",
                      stock: 89,
                      status: "In Stock",
                    },
                    {
                      name: "USB Cable Type-C",
                      sku: "UC-TC",
                      stock: 12,
                      status: "Low Stock",
                    },
                    {
                      name: "Laptop Stand Aluminum",
                      sku: "LS-AL",
                      stock: 234,
                      status: "In Stock",
                    },
                    {
                      name: "Webcam HD 1080p",
                      sku: "WC-HD",
                      stock: 0,
                      status: "Out of Stock",
                    },
                  ].map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex-1">
                        <p className="text-gray-900">{product.name}</p>
                        <p className="text-gray-500">SKU: {product.sku}</p>
                      </div>
                      <div className="flex items-center gap-8">
                        <div>
                          <p className="text-gray-600">Stock</p>
                          <p className="text-gray-900">{product.stock}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full ${
                            product.status === "In Stock"
                              ? "bg-green-100 text-green-700"
                              : product.status === "Low Stock"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {product.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeNav === "employees" && (
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg text-gray-900">Employee Directory</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Add Employee
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      name: "Sarah Johnson",
                      role: "Warehouse Manager",
                      email: "sarah.j@company.com",
                      avatar: "SJ",
                      color: "from-pink-500 to-rose-500",
                    },
                    {
                      name: "Michael Chen",
                      role: "Inventory Specialist",
                      email: "michael.c@company.com",
                      avatar: "MC",
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      name: "Emily Rodriguez",
                      role: "Stock Coordinator",
                      email: "emily.r@company.com",
                      avatar: "ER",
                      color: "from-purple-500 to-indigo-500",
                    },
                    {
                      name: "David Park",
                      role: "Procurement Officer",
                      email: "david.p@company.com",
                      avatar: "DP",
                      color: "from-green-500 to-emerald-500",
                    },
                    {
                      name: "Lisa Anderson",
                      role: "Quality Control",
                      email: "lisa.a@company.com",
                      avatar: "LA",
                      color: "from-orange-500 to-amber-500",
                    },
                  ].map((employee, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full bg-gradient-to-br ${employee.color} flex items-center justify-center text-white`}
                        >
                          <span>{employee.avatar}</span>
                        </div>
                        <div>
                          <p className="text-gray-900">{employee.name}</p>
                          <p className="text-gray-600">{employee.role}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600">{employee.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App
