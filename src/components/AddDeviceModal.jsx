import React, { useState } from 'react'
import { customers } from '../data/mockData'

const AddDeviceModal = ({ onClose, onAdd, showToast }) => {
  const [formData, setFormData] = useState({
    customerId: '',
    model: '',
    imei: '',
    serialNumber: '',
    osVersion: '',
    amountFinanced: '',
    duration: '',
    interestRate: 5,
    monthlyPayment: '',
    purchaseDate: new Date().toISOString().split('T')[0]
  })

  const [errors, setErrors] = useState({})

  const deviceModels = [
    'Samsung Galaxy A55',
    'Samsung Galaxy S23',
    'Infinix Zero 30',
    'Tecno Phantom X2',
    'iPhone 14',
    'iPhone 15',
    'Xiaomi Redmi Note 13',
    'Oppo Reno 10',
    'Vivo V29'
  ]

  const loanDurations = [
    { value: '3', label: '3 months' },
    { value: '6', label: '6 months' },
    { value: '9', label: '9 months' },
    { value: '12', label: '12 months' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Auto-calculate monthly payment
    if (name === 'amountFinanced' || name === 'duration' || name === 'interestRate') {
      const amount = name === 'amountFinanced' ? parseFloat(value) : parseFloat(formData.amountFinanced)
      const months = name === 'duration' ? parseInt(value) : parseInt(formData.duration)
      const rate = name === 'interestRate' ? parseFloat(value) : parseFloat(formData.interestRate)

      if (amount && months && rate !== undefined) {
        const totalWithInterest = amount + (amount * rate / 100)
        const monthly = totalWithInterest / months
        setFormData(prev => ({
          ...prev,
          monthlyPayment: monthly.toFixed(2)
        }))
      }
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const generateIMEI = () => {
    const imei = Math.floor(100000000000000 + Math.random() * 900000000000000).toString()
    setFormData(prev => ({
      ...prev,
      imei
    }))
  }

  const generateSerialNumber = () => {
    const prefix = formData.model.substring(0, 3).toUpperCase()
    const year = new Date().getFullYear()
    const random = Math.floor(1000 + Math.random() * 9000)
    const serial = `${prefix}-${year}-${random}`
    setFormData(prev => ({
      ...prev,
      serialNumber: serial
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.customerId) {
      newErrors.customerId = 'Please select a customer'
    }

    if (!formData.model) {
      newErrors.model = 'Please select a device model'
    }

    if (!formData.imei.trim()) {
      newErrors.imei = 'IMEI is required'
    } else if (formData.imei.length < 15) {
      newErrors.imei = 'IMEI must be at least 15 digits'
    }

    if (!formData.serialNumber.trim()) {
      newErrors.serialNumber = 'Serial number is required'
    }

    if (!formData.osVersion.trim()) {
      newErrors.osVersion = 'OS version is required'
    }

    if (!formData.amountFinanced || parseFloat(formData.amountFinanced) <= 0) {
      newErrors.amountFinanced = 'Amount financed must be greater than 0'
    }

    if (!formData.duration) {
      newErrors.duration = 'Loan duration is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      const selectedCustomer = customers.find(c => c.id === parseInt(formData.customerId))

      const newDevice = {
        id: Date.now(),
        customerId: parseInt(formData.customerId),
        customerName: selectedCustomer.name,
        model: formData.model,
        imei: formData.imei,
        serialNumber: formData.serialNumber,
        osVersion: formData.osVersion,
        batteryLevel: 100,
        lastSeen: 'Just now',
        location: 'Lagos, Nigeria',
        coordinates: { lat: 6.5244, lng: 3.3792 },
        loanStatus: 'Active',
        deviceStatus: 'Active',
        purchaseDate: formData.purchaseDate,
        warrantyExpiry: new Date(new Date(formData.purchaseDate).setFullYear(new Date(formData.purchaseDate).getFullYear() + 1)).toISOString().split('T')[0]
      }

      const newLoan = {
        id: `LN-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
        customerId: parseInt(formData.customerId),
        customerName: selectedCustomer.name,
        deviceId: newDevice.id,
        deviceModel: formData.model,
        amountFinanced: parseFloat(formData.amountFinanced),
        amountPaid: 0,
        amountRemaining: parseFloat(formData.amountFinanced) + (parseFloat(formData.amountFinanced) * formData.interestRate / 100),
        monthlyPayment: parseFloat(formData.monthlyPayment),
        paymentStatus: 'Active',
        nextPaymentDue: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
        lastPaymentDate: 'N/A',
        startDate: formData.purchaseDate,
        endDate: new Date(new Date(formData.purchaseDate).setMonth(new Date(formData.purchaseDate).getMonth() + parseInt(formData.duration))).toISOString().split('T')[0],
        duration: `${formData.duration} months`,
        interestRate: formData.interestRate,
        missedPayments: 0
      }

      onAdd(newDevice, newLoan)
      showToast('Device and loan created successfully', 'success')
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Add New Device & Loan</h2>
              <p className="text-amber-50 mt-0.5 text-sm">Finance a new device for a customer</p>
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Customer Selection */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-3">Customer Information</h3>
            <div>
              <label htmlFor="customerId" className="block text-sm font-medium text-gray-700 mb-2">
                Select Customer <span className="text-red-500">*</span>
              </label>
              <select
                id="customerId"
                name="customerId"
                value={formData.customerId}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none ${
                  errors.customerId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">-- Select a customer --</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} - {customer.email}
                  </option>
                ))}
              </select>
              {errors.customerId && <p className="text-red-500 text-sm mt-1">{errors.customerId}</p>}
            </div>
          </div>

          {/* Device Information */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-3">Device Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Device Model */}
              <div>
                <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
                  Device Model <span className="text-red-500">*</span>
                </label>
                <select
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none ${
                    errors.model ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">-- Select device model --</option>
                  {deviceModels.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
                {errors.model && <p className="text-red-500 text-sm mt-1">{errors.model}</p>}
              </div>

              {/* OS Version */}
              <div>
                <label htmlFor="osVersion" className="block text-sm font-medium text-gray-700 mb-2">
                  OS Version <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="osVersion"
                  name="osVersion"
                  value={formData.osVersion}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none ${
                    errors.osVersion ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Android 14, iOS 17"
                />
                {errors.osVersion && <p className="text-red-500 text-sm mt-1">{errors.osVersion}</p>}
              </div>

              {/* IMEI */}
              <div>
                <label htmlFor="imei" className="block text-sm font-medium text-gray-700 mb-2">
                  IMEI Number <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="imei"
                    name="imei"
                    value={formData.imei}
                    onChange={handleChange}
                    className={`flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none ${
                      errors.imei ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="15-digit IMEI number"
                  />
                  <button
                    type="button"
                    onClick={generateIMEI}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium"
                  >
                    Generate
                  </button>
                </div>
                {errors.imei && <p className="text-red-500 text-sm mt-1">{errors.imei}</p>}
              </div>

              {/* Serial Number */}
              <div>
                <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Serial Number <span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="serialNumber"
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleChange}
                    className={`flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none ${
                      errors.serialNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Device serial number"
                  />
                  <button
                    type="button"
                    onClick={generateSerialNumber}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium"
                    disabled={!formData.model}
                  >
                    Generate
                  </button>
                </div>
                {errors.serialNumber && <p className="text-red-500 text-sm mt-1">{errors.serialNumber}</p>}
              </div>
            </div>
          </div>

          {/* Loan Information */}
          <div>
            <h3 className="text-base font-bold text-gray-900 mb-3">Loan Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Amount Financed */}
              <div>
                <label htmlFor="amountFinanced" className="block text-sm font-medium text-gray-700 mb-2">
                  Amount Financed (NGN) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="amountFinanced"
                  name="amountFinanced"
                  value={formData.amountFinanced}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none ${
                    errors.amountFinanced ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="150000"
                />
                {errors.amountFinanced && <p className="text-red-500 text-sm mt-1">{errors.amountFinanced}</p>}
              </div>

              {/* Loan Duration */}
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Duration <span className="text-red-500">*</span>
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none ${
                    errors.duration ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">-- Select duration --</option>
                  {loanDurations.map(duration => (
                    <option key={duration.value} value={duration.value}>{duration.label}</option>
                  ))}
                </select>
                {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration}</p>}
              </div>

              {/* Interest Rate */}
              <div>
                <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-2">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  id="interestRate"
                  name="interestRate"
                  value={formData.interestRate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                  step="0.1"
                />
              </div>

              {/* Monthly Payment (calculated) */}
              <div>
                <label htmlFor="monthlyPayment" className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Payment (NGN)
                </label>
                <input
                  type="text"
                  id="monthlyPayment"
                  name="monthlyPayment"
                  value={formData.monthlyPayment}
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 outline-none"
                  placeholder="Auto-calculated"
                />
              </div>

              {/* Purchase Date */}
              <div className="md:col-span-2">
                <label htmlFor="purchaseDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Purchase Date
                </label>
                <input
                  type="date"
                  id="purchaseDate"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>

          {/* Summary Box */}
          {formData.amountFinanced && formData.duration && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <h4 className="font-semibold text-green-800 mb-2 text-sm">Loan Summary</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-green-700">Principal Amount:</p>
                  <p className="font-bold text-green-900">NGN {parseFloat(formData.amountFinanced).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-green-700">Total with Interest:</p>
                  <p className="font-bold text-green-900">
                    NGN {(parseFloat(formData.amountFinanced) + (parseFloat(formData.amountFinanced) * formData.interestRate / 100)).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-green-700">Monthly Payment:</p>
                  <p className="font-bold text-green-900">NGN {parseFloat(formData.monthlyPayment).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-green-700">Duration:</p>
                  <p className="font-bold text-green-900">{formData.duration} months</p>
                </div>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center justify-end space-x-2 pt-3 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium text-gray-700 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors font-medium text-sm"
            >
              Create Device & Loan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddDeviceModal
