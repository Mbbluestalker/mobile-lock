import React, { useState } from 'react'
import { loans, getDeviceById } from '../data/mockData'
import { useNavigate } from 'react-router-dom'

const LoanManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const navigate = useNavigate()

  const getStatusBadge = (status) => {
    const badges = {
      'Paid': 'bg-green-100 text-green-700',
      'Active': 'bg-blue-100 text-blue-700',
      'Overdue': 'bg-orange-100 text-orange-700',
      'Defaulted': 'bg-red-100 text-red-700'
    }
    return badges[status] || 'bg-gray-100 text-gray-700'
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount)
  }

  const calculateProgress = (paid, total) => {
    return (paid / total) * 100
  }

  const filteredLoans = loans.filter(loan => {
    const matchesSearch =
      loan.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.deviceModel.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterStatus === 'all' ||
      loan.paymentStatus.toLowerCase() === filterStatus.toLowerCase()

    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Loan Management</h1>
        <p className="text-gray-600 mt-0.5 text-sm">Monitor loan repayments and financing details</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <svg className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by loan ID, customer, or device..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
            </div>
          </div>

          {/* Filter */}
          <div className="flex items-center space-x-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
            >
              <option value="all">All Loans</option>
              <option value="active">Active</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
              <option value="defaulted">Defaulted</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <p className="text-xs text-gray-600 font-medium">Total Loans</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{loans.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <p className="text-xs text-gray-600 font-medium">Active Loans</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {loans.filter(l => l.paymentStatus === 'Active').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <p className="text-xs text-gray-600 font-medium">Overdue Payments</p>
          <p className="text-2xl font-bold text-orange-600 mt-1">
            {loans.filter(l => l.paymentStatus === 'Overdue' || l.paymentStatus === 'Defaulted').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <p className="text-xs text-gray-600 font-medium">Total Financed</p>
          <p className="text-xl font-bold text-purple-600 mt-1">
            {formatCurrency(loans.reduce((sum, l) => sum + l.amountFinanced, 0))}
          </p>
        </div>
      </div>

      {/* Loans Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Loan ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Device
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount Financed
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Repayment Progress
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Next Payment
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLoans.map((loan) => (
                <tr key={loan.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 font-mono text-xs">{loan.id}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-semibold text-sm">
                          {loan.customerName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-2">
                        <p className="font-medium text-gray-900 text-sm">{loan.customerName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 text-sm">{loan.deviceModel}</p>
                    <p className="text-xs text-gray-500">{loan.duration}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 text-sm">{formatCurrency(loan.amountFinanced)}</p>
                    <p className="text-xs text-gray-500">@ {loan.interestRate}% interest</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1.5 min-w-[180px]">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-600">
                          {formatCurrency(loan.amountPaid)} / {formatCurrency(loan.amountFinanced)}
                        </span>
                        <span className="font-medium text-gray-900">
                          {Math.round(calculateProgress(loan.amountPaid, loan.amountFinanced))}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${
                            loan.paymentStatus === 'Paid' ? 'bg-green-500' :
                            loan.paymentStatus === 'Active' ? 'bg-blue-500' :
                            loan.paymentStatus === 'Overdue' ? 'bg-orange-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${calculateProgress(loan.amountPaid, loan.amountFinanced)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500">
                        Remaining: {formatCurrency(loan.amountRemaining)}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusBadge(loan.paymentStatus)}`}>
                      {loan.paymentStatus}
                    </span>
                    {loan.missedPayments > 0 && (
                      <p className="text-xs text-red-600 mt-0.5">
                        {loan.missedPayments} missed payment{loan.missedPayments > 1 ? 's' : ''}
                      </p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-gray-900">{loan.nextPaymentDue}</p>
                    <p className="text-xs text-gray-500">{formatCurrency(loan.monthlyPayment)}/month</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => navigate('/devices')}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="View Device"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button
                        className="p-1.5 text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                        title="View Customer"
                        onClick={() => navigate('/customers')}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLoans.length === 0 && (
          <div className="text-center py-8">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500 text-sm">No loans found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoanManagement
