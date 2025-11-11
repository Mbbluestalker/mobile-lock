import React, { useState } from 'react'
import { devices as initialDevices, loans as initialLoans } from '../data/mockData'
import DeviceDetailsModal from '../components/DeviceDetailsModal'
import AddDeviceModal from '../components/AddDeviceModal'
import Toast from '../components/Toast'

const DeviceManagement = () => {
  const [devices, setDevices] = useState(initialDevices)
  const [loans, setLoans] = useState(initialLoans)
  const [selectedDevice, setSelectedDevice] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', type: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000)
  }

  const handleAddDevice = (newDevice, newLoan) => {
    setDevices([...devices, newDevice])
    setLoans([...loans, newLoan])
  }

  const handleLockDevice = (deviceId) => {
    setDevices(devices.map(device =>
      device.id === deviceId
        ? { ...device, deviceStatus: 'Locked' }
        : device
    ))
    showToast('Device successfully locked', 'success')
  }

  const handleUnlockDevice = (deviceId) => {
    setDevices(devices.map(device =>
      device.id === deviceId
        ? { ...device, deviceStatus: 'Active' }
        : device
    ))
    showToast('Device successfully unlocked', 'success')
  }

  const handleViewDetails = (device) => {
    setSelectedDevice(device)
    setShowModal(true)
  }

  const getStatusBadge = (status) => {
    const badges = {
      'Active': 'bg-green-100 text-green-700',
      'Locked': 'bg-red-100 text-red-700'
    }
    return badges[status] || 'bg-gray-100 text-gray-700'
  }

  const getLoanStatusBadge = (status) => {
    const badges = {
      'Paid': 'bg-green-100 text-green-700',
      'Active': 'bg-amber-100 text-amber-700',
      'Overdue': 'bg-orange-100 text-orange-700',
      'Defaulted': 'bg-red-100 text-red-700'
    }
    return badges[status] || 'bg-gray-100 text-gray-700'
  }

  const filteredDevices = devices.filter(device => {
    const matchesSearch =
      device.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.imei.includes(searchTerm)

    const matchesFilter =
      filterStatus === 'all' ||
      device.deviceStatus.toLowerCase() === filterStatus.toLowerCase()

    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-5">
      {/* Toast Notification */}
      {toast.show && <Toast message={toast.message} type={toast.type} />}

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Device Management</h1>
          <p className="text-gray-600 mt-0.5 text-sm">Monitor and control financed devices</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors font-medium shadow-sm hover:shadow-md text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Add Device</span>
        </button>
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
                placeholder="Search by customer, device model, or IMEI..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
              />
            </div>
          </div>

          {/* Filter */}
          <div className="flex items-center space-x-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-sm"
            >
              <option value="all">All Devices</option>
              <option value="active">Active Only</option>
              <option value="locked">Locked Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Devices Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Device Model
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  IMEI/Serial
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Loan Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Device Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Last Seen
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDevices.map((device) => (
                <tr key={device.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <span className="text-amber-600 font-semibold text-sm">
                          {device.customerName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-2">
                        <p className="font-medium text-gray-900 text-sm">{device.customerName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 text-sm">{device.model}</p>
                    <p className="text-xs text-gray-500">{device.osVersion}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-gray-900 font-mono">{device.imei}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getLoanStatusBadge(device.loanStatus)}`}>
                      {device.loanStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        device.deviceStatus === 'Active' ? 'bg-green-500' : 'bg-red-500'
                      }`}></span>
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusBadge(device.deviceStatus)}`}>
                        {device.deviceStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-gray-900">{device.lastSeen}</p>
                    <p className="text-xs text-gray-500">{device.location}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      {device.deviceStatus === 'Active' ? (
                        <button
                          onClick={() => handleLockDevice(device.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Lock Device"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUnlockDevice(device.id)}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                          title="Unlock Device"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={() => handleViewDetails(device)}
                        className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                        title="View Details"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDevices.length === 0 && (
          <div className="text-center py-8">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500 text-sm">No devices found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Device Details Modal */}
      {showModal && selectedDevice && (
        <DeviceDetailsModal
          device={selectedDevice}
          onClose={() => setShowModal(false)}
          onLock={handleLockDevice}
          onUnlock={handleUnlockDevice}
          showToast={showToast}
        />
      )}

      {/* Add Device Modal */}
      {showAddModal && (
        <AddDeviceModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddDevice}
          showToast={showToast}
        />
      )}
    </div>
  )
}

export default DeviceManagement
