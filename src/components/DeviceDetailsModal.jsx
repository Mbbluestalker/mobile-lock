import React, { useState } from 'react'

const DeviceDetailsModal = ({ device, onClose, onLock, onUnlock, showToast }) => {
  const [showMap, setShowMap] = useState(false)

  const handleSendMessage = () => {
    showToast('Message sent successfully', 'success')
  }

  const handleLocateDevice = () => {
    setShowMap(!showMap)
    if (!showMap) {
      showToast('Locating device...', 'info')
    }
  }

  const handleLockClick = () => {
    onLock(device.id)
    onClose()
  }

  const handleUnlockClick = () => {
    onUnlock(device.id)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">{device.model}</h2>
              <p className="text-amber-50 mt-0.5 text-sm">Device Details & Controls</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-1.5 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Device Status Banner */}
          <div className={`p-3 rounded-lg border-2 ${
            device.deviceStatus === 'Active'
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  device.deviceStatus === 'Active' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className={`font-semibold text-sm ${
                  device.deviceStatus === 'Active' ? 'text-green-800' : 'text-red-800'
                }`}>
                  Device Status: {device.deviceStatus}
                </span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                device.loanStatus === 'Paid' ? 'bg-green-100 text-green-700' :
                device.loanStatus === 'Active' ? 'bg-amber-100 text-amber-700' :
                device.loanStatus === 'Overdue' ? 'bg-orange-100 text-orange-700' :
                'bg-red-100 text-red-700'
              }`}>
                Loan: {device.loanStatus}
              </span>
            </div>
          </div>

          {/* Device Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Owner Information */}
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 text-base border-b pb-1.5">Owner Information</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-sm text-gray-500">Customer Name</label>
                  <p className="font-medium text-gray-900">{device.customerName}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Purchase Date</label>
                  <p className="font-medium text-gray-900">{device.purchaseDate}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Warranty Expiry</label>
                  <p className="font-medium text-gray-900">{device.warrantyExpiry}</p>
                </div>
              </div>
            </div>

            {/* Device Specifications */}
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 text-base border-b pb-1.5">Device Specifications</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-sm text-gray-500">Device Model</label>
                  <p className="font-medium text-gray-900">{device.model}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">IMEI Number</label>
                  <p className="font-medium text-gray-900 font-mono">{device.imei}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Serial Number</label>
                  <p className="font-medium text-gray-900 font-mono">{device.serialNumber}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">OS Version</label>
                  <p className="font-medium text-gray-900">{device.osVersion}</p>
                </div>
              </div>
            </div>

            {/* Device Status */}
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 text-base border-b pb-1.5">Device Status</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-sm text-gray-500">Battery Level</label>
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${
                          device.batteryLevel > 50 ? 'bg-green-500' :
                          device.batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${device.batteryLevel}%` }}
                      ></div>
                    </div>
                    <span className="font-medium text-gray-900">{device.batteryLevel}%</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Last Seen</label>
                  <p className="font-medium text-gray-900">{device.lastSeen}</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 text-base border-b pb-1.5">Location</h3>
              <div className="space-y-2">
                <div>
                  <label className="text-sm text-gray-500">Current Location</label>
                  <p className="font-medium text-gray-900">{device.location}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Coordinates</label>
                  <p className="font-medium text-gray-900 font-mono">
                    {device.coordinates.lat}, {device.coordinates.lng}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          {showMap && (
            <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-3 border-b border-gray-200 flex items-center justify-between">
                <span className="font-medium text-gray-900">Device Location (Simulated)</span>
                <button
                  onClick={() => setShowMap(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-600">Map Preview: {device.location}</p>
                  <p className="text-sm text-gray-500 mt-1">Lat: {device.coordinates.lat}, Lng: {device.coordinates.lng}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="border-t pt-4">
            <h3 className="font-bold text-gray-900 text-base mb-3">Device Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {device.deviceStatus === 'Active' ? (
                <button
                  onClick={handleLockClick}
                  className="flex flex-col items-center justify-center p-3 border-2 border-red-200 rounded-lg hover:bg-red-50 transition-colors group"
                >
                  <svg className="w-6 h-6 text-red-600 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="font-medium text-gray-900 group-hover:text-red-600 text-sm">Lock Device</span>
                </button>
              ) : (
                <button
                  onClick={handleUnlockClick}
                  className="flex flex-col items-center justify-center p-3 border-2 border-green-200 rounded-lg hover:bg-green-50 transition-colors group"
                >
                  <svg className="w-6 h-6 text-green-600 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-gray-900 group-hover:text-green-600 text-sm">Unlock Device</span>
                </button>
              )}

              <button
                onClick={handleLocateDevice}
                className="flex flex-col items-center justify-center p-3 border-2 border-amber-200 rounded-lg hover:bg-amber-50 transition-colors group"
              >
                <svg className="w-6 h-6 text-amber-600 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium text-gray-900 group-hover:text-amber-600 text-sm">Locate Device</span>
              </button>

              <button
                onClick={handleSendMessage}
                className="flex flex-col items-center justify-center p-3 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors group"
              >
                <svg className="w-6 h-6 text-purple-600 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span className="font-medium text-gray-900 group-hover:text-purple-600 text-sm">Send Message</span>
              </button>

              <button
                onClick={onClose}
                className="flex flex-col items-center justify-center p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <svg className="w-6 h-6 text-gray-600 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="font-medium text-gray-900 group-hover:text-gray-600 text-sm">Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeviceDetailsModal
