// utils/mockData.js
export const mockVehicles = [
  {
    id: 1,
    brand: 'Tesla',
    model: 'Model S',
    price: 99,
    category: 'Car',
    image: 'https://via.placeholder.com/150',
    year: 2021,
    mileage: Math.floor(Math.random() * 50000),
    branch: 'New York'
  },
  {
    id: 2,
    brand: 'Ford',
    model: 'Mustang',
    price: 25,
    category: 'Car',
    image: 'https://via.placeholder.com/150',
    year: 2020,
    mileage: Math.floor(Math.random() * 50000),
    branch: 'Los Angeles'
  },
  {
    id: 3,
    brand: 'Chevrolet',
    model: 'Silverado',
    price: 79,
    category: 'Truck',
    image: 'https://via.placeholder.com/150',
    year: 2019,
    mileage: Math.floor(Math.random() * 50000),
    branch: 'Chicago'
  },
  {
    id: 4,
    brand: 'Toyota',
    model: 'Camry',
    price: 69,
    category: 'Car',
    image: 'https://via.placeholder.com/150',
    year: 2022,
    mileage: Math.floor(Math.random() * 50000),
    branch: 'New York'
  },
  {
    id: 5,
    brand: 'Honda',
    model: 'Civic',
    price: 45,
    category: 'Car',
    image: 'https://via.placeholder.com/150',
    year: 2023,
    mileage: Math.floor(Math.random() * 50000),
    branch: 'Los Angeles'
  },
  {
    id: 6,
    brand: 'Jeep',
    model: 'Wrangler',
    price: 99,
    category: 'SUV',
    image: 'https://via.placeholder.com/150',
    year: 2021,
    mileage: Math.floor(Math.random() * 50000),
    branch: 'Chicago'
  },
  {
    id: 7,
    brand: 'Porsche',
    model: '911',
    price: 199,
    category: 'Car',
    image: 'https://via.placeholder.com/150',
    year: 2020,
    mileage: Math.floor(Math.random() * 50000),
    branch: 'New York'
  },
  {
    id: 8,
    brand: 'Mercedes-Benz',
    model: 'S-Class',
    price: 149,
    category: 'Car',
    image: 'https://via.placeholder.com/150',
    year: 2022,
    mileage: Math.floor(Math.random() * 50000),
    branch: 'Los Angeles'
  },
  {
    id: 9,
    brand: 'BMW',
    model: 'X5',
    price: 129,
    category: 'SUV',
    image: 'https://via.placeholder.com/150',
    year: 2021,
    mileage: Math.floor(Math.random() * 50000),
    branch: 'Houston'
  },
  {
    id: 10,
    brand: 'Audi',
    model: 'A4',
    price: 89,
    category: 'Car',
    image: 'https://via.placeholder.com/150',
    year: 2022,
    mileage: Math.floor(Math.random() * 50000),
    branch: 'San Francisco'
  },
  {
    id: 11,
    brand: 'Nissan',
    model: 'Altima',
    price: 55,
    category: 'Car',
    image: 'https://via.placeholder.com/150',
    year: 2023,
    mileage: Math.floor(Math.random() * 50000),
    branch: 'Seattle'
  },
  {
    id: 12,
    brand: 'Subaru',
    model: 'Outback',
    price: 79,
    category: 'SUV',
    image: 'https://via.placeholder.com/150',
    year: 2021,
    mileage: Math.floor(Math.random() * 50000),
    branch: 'Miami'
  }
]

export const branches = [
  {
    name: 'New York',
    address: '123 Main St, New York, NY 10001',
    contact: '(123) 456-7890',
    hours: 'Mon-Fri: 9am-5pm, Sat-Sun: 10am-3pm',
    latitude: 40.7128,
    longitude: -74.006
  },
  {
    name: 'Los Angeles',
    address: '456 Sunset Blvd, Los Angeles, CA 90001',
    contact: '(987) 654-3210',
    hours: 'Mon-Fri: 8am-6pm, Sat-Sun: 9am-4pm',
    latitude: 34.0522,
    longitude: -118.2437
  },
  {
    name: 'Chicago',
    address: '789 Michigan Ave, Chicago, IL 60601',
    contact: '(246) 135-7908',
    hours: 'Mon-Fri: 10am-7pm, Sat-Sun: 11am-5pm',
    latitude: 41.8781,
    longitude: -87.6298
  },
  {
    name: 'Houston',
    address: '1001 Texas St, Houston, TX 77002',
    contact: '(713) 987-6543',
    hours: 'Mon-Fri: 9am-6pm, Sat-Sun: 10am-4pm',
    latitude: 29.7604,
    longitude: -95.3698
  },
  {
    name: 'San Francisco',
    address: '555 Market St, San Francisco, CA 94105',
    contact: '(415) 123-4567',
    hours: 'Mon-Fri: 8am-5pm, Sat-Sun: 9am-3pm',
    latitude: 37.7749,
    longitude: -122.4194
  },
  {
    name: 'Seattle',
    address: '1234 Pike St, Seattle, WA 98101',
    contact: '(206) 987-6543',
    hours: 'Mon-Fri: 9am-7pm, Sat-Sun: 10am-5pm',
    latitude: 47.6062,
    longitude: -122.3321
  },
  {
    name: 'Miami',
    address: '777 Ocean Dr, Miami Beach, FL 33139',
    contact: '(305) 123-4567',
    hours: 'Mon-Fri: 8am-6pm, Sat-Sun: 9am-4pm',
    latitude: 25.7617,
    longitude: -80.1918
  }
]
