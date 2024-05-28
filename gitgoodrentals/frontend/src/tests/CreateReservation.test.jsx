import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchReservation from '../components/CheckIn/SearchReservation';

// Mock data
const mockBranches = [
  { id: 1, name: 'Branch 1' },
  { id: 2, name: 'Branch 2' },
];

const mockUsers = [
  { id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com' },
  { id: 2, first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com' },
];

const mockVehicles = [
  { id: 1, brand: 'Toyota', model: 'Camry' },
  { id: 2, brand: 'Honda', model: 'Civic' },
];

// Mock the API functions
jest.mock('../components/api/branches', () => ({
  getBranches: jest.fn(() => Promise.resolve(mockBranches)),
  getBranch: jest.fn((branchId) => Promise.resolve(mockBranches.find((branch) => branch.id === branchId))),
}));

jest.mock('../components/api/users', () => ({
  getUsers: jest.fn(() => Promise.resolve(mockUsers)),
  getUser: jest.fn((userId) => Promise.resolve(mockUsers.find((user) => user.id === userId))),
}));

jest.mock('../components/api/vehicles', () => ({
    getVehiclesByBranch: jest.fn((branchId) => {
      console.log('Branch ID:', branchId);
      return Promise.resolve(mockVehicles);
    }),
    getVehicle: jest.fn((vehicleId) => Promise.resolve(mockVehicles.find((vehicle) => vehicle.id === vehicleId))),
  }));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('SearchReservation', () => {
  test('renders the form fields', async () => {
    await act(async () => {
      render(<SearchReservation onSearch={() => {}} onCreateReservation={() => {}} />);
    });

    expect(screen.getByPlaceholderText('Booking ID')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
    expect(screen.getByText('Branch')).toBeInTheDocument();
    expect(screen.getByText('Vehicle')).toBeInTheDocument();
    expect(screen.getByText('Pickup Date')).toBeInTheDocument();
    expect(screen.getByText('Return Date')).toBeInTheDocument();
    expect(screen.getByText('Extra Equipment ($500)')).toBeInTheDocument();
    expect(screen.getByText('Create Reservation')).toBeInTheDocument();
  });

  test('calls onSearch when searching for a booking', async () => {
    const onSearchMock = jest.fn();
    await act(async () => {
      render(<SearchReservation onSearch={onSearchMock} onCreateReservation={() => {}} />);
    });

    const bookingIdInput = screen.getByPlaceholderText('Booking ID');
    fireEvent.change(bookingIdInput, { target: { value: 'BOOKING123' } });
    fireEvent.click(screen.getByText('Search'));

    expect(onSearchMock).toHaveBeenCalledWith('BOOKING123');
  });


  test('displays validation errors', async () => {
    await act(async () => {
      render(<SearchReservation onSearch={() => {}} onCreateReservation={() => {}} />);
    });

    fireEvent.click(screen.getByText('Create Reservation'));

    expect(await screen.findByText('Please select a user')).toBeInTheDocument();
    expect(screen.getByText('Please select a branch')).toBeInTheDocument();
    expect(screen.getByText('Please select a vehicle')).toBeInTheDocument();
    expect(screen.getByText('Please select a pickup date')).toBeInTheDocument();
    expect(screen.getByText('Please select a return date')).toBeInTheDocument();
  });
});
