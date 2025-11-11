import React, { useState } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'

const Layout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showNotifications, setShowNotifications] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => {
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  const navItems = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    {
      path: '/devices',
      name: 'Devices',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      path: '/loans',
      name: 'Loans',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      path: '/customers',
      name: 'Customers',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 z-50 ${sidebarOpen ? 'w-56' : 'w-16'}`}>
        {/* Logo */}
        <div className="p-4 border-b border-white border-opacity-10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            {sidebarOpen && (
              <div>
                <h2 className="text-base font-bold">FinanceOS</h2>
                <p className="text-xs text-gray-400">v2.0</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-semibold shadow-md'
                  : 'text-gray-400 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-yellow-500/20 hover:text-white'
              }`}
            >
              {item.icon}
              {sidebarOpen && <span className="font-medium">{item.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute -right-2.5 top-16 w-5 h-5 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-900 hover:scale-110 transition-transform"
        >
          <svg className={`w-3 h-3 transition-transform ${!sidebarOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* User Profile */}
        <div className="absolute bottom-0 w-full p-3 border-t border-white border-opacity-10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AD</span>
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate">Admin User</p>
                <p className="text-xs text-gray-400 truncate">Administrator</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-56' : 'ml-16'}`}>
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-bold text-gray-900">
                {navItems.find(item => item.path === location.pathname)?.name || 'Dashboard'}
              </h1>
            </div>

            <div className="flex items-center space-x-3">
              {/* Search */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-48 pl-8 pr-3 py-1.5 text-sm bg-gray-100 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
                <svg className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Notification Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 animate-fade-in">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-bold text-gray-900">Recent Activity</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="p-4 hover:bg-gray-50 border-b border-gray-50 transition-colors cursor-pointer">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 gradient-danger rounded-xl flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Device Locked</p>
                            <p className="text-xs text-gray-500 mt-1">John Doe's Samsung A55 has been locked</p>
                            <p className="text-xs text-gray-400 mt-1">2025-11-10 13:04</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-gray-50 border-b border-gray-50 transition-colors cursor-pointer">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 gradient-success rounded-xl flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">Payment Received</p>
                            <p className="text-xs text-gray-500 mt-1">Device unlocked automatically</p>
                            <p className="text-xs text-gray-400 mt-1">2025-11-09 10:33</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">New Loan Created</p>
                            <p className="text-xs text-gray-500 mt-1">Jane Smith - Infinix Zero 30</p>
                            <p className="text-xs text-gray-400 mt-1">2025-11-08 14:12</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-lg transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-5">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
