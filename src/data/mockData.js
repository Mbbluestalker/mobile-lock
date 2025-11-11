// Mock Data for Smart Device Financing Demo

export const customers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+234 801 234 5678',
    activeLoans: 1,
    devicesOwned: 1,
    joinDate: '2025-01-15',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+234 802 345 6789',
    activeLoans: 1,
    devicesOwned: 1,
    joinDate: '2025-02-10',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    phone: '+234 803 456 7890',
    activeLoans: 2,
    devicesOwned: 2,
    joinDate: '2024-11-20',
    status: 'Active'
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    phone: '+234 804 567 8901',
    activeLoans: 0,
    devicesOwned: 1,
    joinDate: '2024-10-05',
    status: 'Completed'
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@example.com',
    phone: '+234 805 678 9012',
    activeLoans: 1,
    devicesOwned: 1,
    joinDate: '2025-03-12',
    status: 'Overdue'
  }
]

export const devices = [
  {
    id: 1,
    customerId: 1,
    customerName: 'John Doe',
    model: 'Samsung Galaxy A55',
    imei: '359843928411123',
    serialNumber: 'SG-A55-2025-001',
    osVersion: 'Android 14',
    batteryLevel: 67,
    lastSeen: '2 hours ago',
    location: 'Lagos, Nigeria',
    coordinates: { lat: 6.5244, lng: 3.3792 },
    loanStatus: 'Overdue',
    deviceStatus: 'Locked',
    purchaseDate: '2025-01-15',
    warrantyExpiry: '2026-01-15'
  },
  {
    id: 2,
    customerId: 2,
    customerName: 'Jane Smith',
    model: 'Infinix Zero 30',
    imei: '359843928422234',
    serialNumber: 'INF-Z30-2025-002',
    osVersion: 'Android 13',
    batteryLevel: 89,
    lastSeen: '30 minutes ago',
    location: 'Abuja, Nigeria',
    coordinates: { lat: 9.0765, lng: 7.3986 },
    loanStatus: 'Paid',
    deviceStatus: 'Active',
    purchaseDate: '2025-02-10',
    warrantyExpiry: '2026-02-10'
  },
  {
    id: 3,
    customerId: 3,
    customerName: 'Michael Johnson',
    model: 'Tecno Phantom X2',
    imei: '359843928433345',
    serialNumber: 'TEC-PX2-2024-003',
    osVersion: 'Android 12',
    batteryLevel: 45,
    lastSeen: '5 hours ago',
    location: 'Port Harcourt, Nigeria',
    coordinates: { lat: 4.8156, lng: 7.0498 },
    loanStatus: 'Active',
    deviceStatus: 'Active',
    purchaseDate: '2024-11-20',
    warrantyExpiry: '2025-11-20'
  },
  {
    id: 4,
    customerId: 3,
    customerName: 'Michael Johnson',
    model: 'iPhone 14',
    imei: '359843928444456',
    serialNumber: 'APL-IP14-2024-004',
    osVersion: 'iOS 17.2',
    batteryLevel: 92,
    lastSeen: '1 hour ago',
    location: 'Port Harcourt, Nigeria',
    coordinates: { lat: 4.8156, lng: 7.0498 },
    loanStatus: 'Active',
    deviceStatus: 'Active',
    purchaseDate: '2024-12-01',
    warrantyExpiry: '2025-12-01'
  },
  {
    id: 5,
    customerId: 4,
    customerName: 'Sarah Williams',
    model: 'Samsung Galaxy S23',
    imei: '359843928455567',
    serialNumber: 'SG-S23-2024-005',
    osVersion: 'Android 14',
    batteryLevel: 78,
    lastSeen: '15 minutes ago',
    location: 'Ibadan, Nigeria',
    coordinates: { lat: 7.3775, lng: 3.9470 },
    loanStatus: 'Paid',
    deviceStatus: 'Active',
    purchaseDate: '2024-10-05',
    warrantyExpiry: '2025-10-05'
  },
  {
    id: 6,
    customerId: 5,
    customerName: 'David Brown',
    model: 'Xiaomi Redmi Note 13',
    imei: '359843928466678',
    serialNumber: 'XIA-RN13-2025-006',
    osVersion: 'Android 13',
    batteryLevel: 34,
    lastSeen: '8 hours ago',
    location: 'Kano, Nigeria',
    coordinates: { lat: 12.0022, lng: 8.5919 },
    loanStatus: 'Defaulted',
    deviceStatus: 'Locked',
    purchaseDate: '2025-03-12',
    warrantyExpiry: '2026-03-12'
  }
]

export const loans = [
  {
    id: 'LN-2025-001',
    customerId: 1,
    customerName: 'John Doe',
    deviceId: 1,
    deviceModel: 'Samsung Galaxy A55',
    amountFinanced: 180000,
    amountPaid: 120000,
    amountRemaining: 60000,
    monthlyPayment: 30000,
    paymentStatus: 'Overdue',
    nextPaymentDue: '2025-10-15',
    lastPaymentDate: '2025-09-10',
    startDate: '2025-01-15',
    endDate: '2025-07-15',
    duration: '6 months',
    interestRate: 5,
    missedPayments: 1
  },
  {
    id: 'LN-2025-002',
    customerId: 2,
    customerName: 'Jane Smith',
    deviceId: 2,
    deviceModel: 'Infinix Zero 30',
    amountFinanced: 150000,
    amountPaid: 150000,
    amountRemaining: 0,
    monthlyPayment: 25000,
    paymentStatus: 'Paid',
    nextPaymentDue: 'N/A',
    lastPaymentDate: '2025-08-10',
    startDate: '2025-02-10',
    endDate: '2025-08-10',
    duration: '6 months',
    interestRate: 5,
    missedPayments: 0
  },
  {
    id: 'LN-2024-003',
    customerId: 3,
    customerName: 'Michael Johnson',
    deviceId: 3,
    deviceModel: 'Tecno Phantom X2',
    amountFinanced: 120000,
    amountPaid: 80000,
    amountRemaining: 40000,
    monthlyPayment: 20000,
    paymentStatus: 'Active',
    nextPaymentDue: '2025-11-20',
    lastPaymentDate: '2025-10-20',
    startDate: '2024-11-20',
    endDate: '2025-05-20',
    duration: '6 months',
    interestRate: 5,
    missedPayments: 0
  },
  {
    id: 'LN-2024-004',
    customerId: 3,
    customerName: 'Michael Johnson',
    deviceId: 4,
    deviceModel: 'iPhone 14',
    amountFinanced: 450000,
    amountPaid: 300000,
    amountRemaining: 150000,
    monthlyPayment: 50000,
    paymentStatus: 'Active',
    nextPaymentDue: '2025-12-01',
    lastPaymentDate: '2025-11-01',
    startDate: '2024-12-01',
    endDate: '2025-11-01',
    duration: '9 months',
    interestRate: 5,
    missedPayments: 0
  },
  {
    id: 'LN-2024-005',
    customerId: 4,
    customerName: 'Sarah Williams',
    deviceId: 5,
    deviceModel: 'Samsung Galaxy S23',
    amountFinanced: 350000,
    amountPaid: 350000,
    amountRemaining: 0,
    monthlyPayment: 50000,
    paymentStatus: 'Paid',
    nextPaymentDue: 'N/A',
    lastPaymentDate: '2025-04-05',
    startDate: '2024-10-05',
    endDate: '2025-04-05',
    duration: '7 months',
    interestRate: 5,
    missedPayments: 0
  },
  {
    id: 'LN-2025-006',
    customerId: 5,
    customerName: 'David Brown',
    deviceId: 6,
    deviceModel: 'Xiaomi Redmi Note 13',
    amountFinanced: 95000,
    amountPaid: 19000,
    amountRemaining: 76000,
    monthlyPayment: 19000,
    paymentStatus: 'Defaulted',
    nextPaymentDue: '2025-04-12',
    lastPaymentDate: '2025-03-12',
    startDate: '2025-03-12',
    endDate: '2025-08-12',
    duration: '5 months',
    interestRate: 5,
    missedPayments: 7
  }
]

export const activityLog = [
  {
    id: 1,
    timestamp: '2025-11-10 13:04',
    action: 'Lock Device',
    description: 'Lock command sent to John Doe\'s Samsung A55',
    performedBy: 'Admin User',
    status: 'Success'
  },
  {
    id: 2,
    timestamp: '2025-11-09 10:33',
    action: 'Unlock Device',
    description: 'Payment received – device unlocked',
    performedBy: 'System',
    status: 'Success'
  },
  {
    id: 3,
    timestamp: '2025-11-08 14:12',
    action: 'Loan Created',
    description: 'Loan created for Jane Smith (Infinix Zero 30)',
    performedBy: 'Loan Officer',
    status: 'Success'
  },
  {
    id: 4,
    timestamp: '2025-11-07 09:22',
    action: 'Lock Device',
    description: 'Lock command sent to David Brown\'s Xiaomi Redmi Note 13',
    performedBy: 'Admin User',
    status: 'Success'
  },
  {
    id: 5,
    timestamp: '2025-11-06 16:45',
    action: 'Message Sent',
    description: 'Payment reminder sent to Michael Johnson',
    performedBy: 'Support Agent',
    status: 'Success'
  }
]

// Helper function to get dashboard statistics
export const getDashboardStats = () => {
  const totalDevices = devices.length
  const lockedDevices = devices.filter(d => d.deviceStatus === 'Locked').length
  const activeLoans = loans.filter(l => l.paymentStatus === 'Active' || l.paymentStatus === 'Overdue').length
  const totalCustomers = customers.length
  const overduePayments = loans.filter(l => l.paymentStatus === 'Overdue' || l.paymentStatus === 'Defaulted').length

  return {
    totalDevices,
    lockedDevices,
    activeLoans,
    totalCustomers,
    overduePayments
  }
}

// Helper function to get customer by ID
export const getCustomerById = (id) => {
  return customers.find(c => c.id === parseInt(id))
}

// Helper function to get devices by customer ID
export const getDevicesByCustomerId = (customerId) => {
  return devices.filter(d => d.customerId === parseInt(customerId))
}

// Helper function to get loans by customer ID
export const getLoansByCustomerId = (customerId) => {
  return loans.filter(l => l.customerId === parseInt(customerId))
}

// Helper function to get device by ID
export const getDeviceById = (id) => {
  return devices.find(d => d.id === parseInt(id))
}

// Helper function to get loan by ID
export const getLoanById = (id) => {
  return loans.find(l => l.id === id)
}
