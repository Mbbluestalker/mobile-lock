import React from 'react'
import { getDashboardStats, activityLog } from '../data/mockData'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const stats = getDashboardStats()
  const navigate = useNavigate()

  const statCards = [
    {
      title: 'Total Devices',
      value: stats.totalDevices,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-indigo-600',
      bgLight: 'bg-blue-50',
      change: '+12%',
      changePositive: true
    },
    {
      title: 'Devices Locked',
      value: stats.lockedDevices,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      gradient: 'from-red-500 to-pink-600',
      bgLight: 'bg-red-50',
      change: '-5%',
      changePositive: false
    },
    {
      title: 'Active Loans',
      value: stats.activeLoans,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      gradient: 'from-emerald-500 to-teal-600',
      bgLight: 'bg-emerald-50',
      change: '+8%',
      changePositive: true
    },
    {
      title: 'Active Customers',
      value: stats.totalCustomers,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-600',
      bgLight: 'bg-purple-50',
      change: '+15%',
      changePositive: true
    },
    {
      title: 'Overdue Payments',
      value: stats.overduePayments,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-orange-500 to-amber-600',
      bgLight: 'bg-orange-50',
      change: '-3%',
      changePositive: false
    }
  ]

  const quickActions = [
    {
      title: 'View Devices',
      description: 'Manage all financed devices',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      path: '/devices',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Manage Loans',
      description: 'Track loan repayments',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      path: '/loans',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'View Customers',
      description: 'Manage customer accounts',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      path: '/customers',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Generate Reports',
      description: 'View analytics & insights',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      path: '/dashboard',
      gradient: 'from-orange-500 to-amber-600'
    }
  ]

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Welcome Banner */}
      <div className="gradient-primary rounded-2xl p-5 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full -mr-24 -mt-24"></div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-1">Welcome back, Admin! 👋</h1>
          <p className="text-indigo-100 text-sm">Here's what's happening with your device financing today</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="modern-card p-4 relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.gradient} opacity-10 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500`}></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.gradient} rounded-lg flex items-center justify-center text-white`}>
                  <div className="w-5 h-5">{stat.icon}</div>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${stat.changePositive ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
                  {stat.change}
                </span>
              </div>

              <h3 className="text-gray-600 text-xs font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => navigate(action.path)}
              className="modern-card p-4 text-left group relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

              <div className="relative z-10">
                <div className={`w-10 h-10 bg-gradient-to-br ${action.gradient} rounded-lg flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
                  <div className="w-5 h-5">{action.icon}</div>
                </div>
                <h3 className="font-bold text-gray-900 mb-0.5 text-sm">{action.title}</h3>
                <p className="text-xs text-gray-500">{action.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="modern-card overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {activityLog.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  activity.action === 'Lock Device' ? 'gradient-danger' :
                  activity.action === 'Unlock Device' ? 'gradient-success' :
                  activity.action === 'Loan Created' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' :
                  'bg-gradient-to-br from-gray-400 to-gray-500'
                }`}>
                  {activity.action === 'Lock Device' ? (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  ) : activity.action === 'Unlock Device' ? (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-md ${
                      activity.action === 'Lock Device' ? 'bg-red-100 text-red-700' :
                      activity.action === 'Unlock Device' ? 'bg-green-100 text-green-700' :
                      activity.action === 'Loan Created' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {activity.action}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      activity.status === 'Success' ? 'bg-green-500' : 'bg-red-500'
                    }`}></span>
                  </div>
                  <p className="text-gray-900 font-medium mb-1 text-sm">{activity.description}</p>
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <span className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {activity.performedBy}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {activity.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
