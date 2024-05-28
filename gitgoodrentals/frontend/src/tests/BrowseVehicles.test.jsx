import React from 'react';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BrowseVehicles } from '../components/Pages/BrowseVehicles';
import { mockVehicles } from '../lib/mockdata'; // Import mock data
import { BASE_URL, ENVIRONMENT } from '@/constants';

jest.mock('three/examples/jsm/loaders/FBXLoader', () => {
  return jest.fn().mockImplementation(() => {
    return {
      load: jest.fn().mockImplementation((url, onLoad) => {
        onLoad({}); // Simulate a successful load with an empty object
      }),
    };
  });
});

jest.mock('three/examples/jsm/controls/OrbitControls', () => {
  return jest.fn().mockImplementation(() => {
    return {
      load: jest.fn().mockImplementation((url, onLoad) => {
        onLoad({}); // Simulate a successful load with an empty object
      }),
    };
  });
});

jest.mock('../constants', () => ({
  ENVIRONMENT: 'development',
  BASE_URL: 'http://localhost:5173/',
}));

describe('Browse Vehicles', () => {

  test('mocking constants', () => {
    expect(ENVIRONMENT).toBe('development');
    expect(BASE_URL).toBe('http://localhost:5173/');
  }),

  test('renders available vehicles', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/browse', state: { branch: { id: 1 } } }]}>
        <BrowseVehicles data={mockVehicles}/>
      </MemoryRouter>
    );
    const vehicleCards = screen.getAllByTestId('vehicle-card');
    expect(vehicleCards.length).toBeGreaterThan(0);
  });

  test('includes a filter sidebar', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/browse', state: { branch: { id: 1 } } }]}>
        <BrowseVehicles data={mockVehicles}/>
      </MemoryRouter>
    );
    const filterSidebar = screen.getByTestId('filter-sidebar');
    expect(filterSidebar).toBeInTheDocument();
  });

  test('allows filtering vehicles by price range', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/browse', state: { branch: { id: 1 } } }]}>
        <BrowseVehicles data={mockVehicles}/>
      </MemoryRouter>
    );
    const priceRangeCheckbox = screen.getByLabelText('$0 - $50');
    fireEvent.click(priceRangeCheckbox);
    const applyFiltersButton = screen.getByText('Apply Filters');
    fireEvent.click(applyFiltersButton);
    await waitFor(() => {
      const vehicleCards = screen.getAllByTestId('vehicle-card');
      vehicleCards.forEach((card) => {
        const price = parseFloat(within(card).getByText(/\$/i).textContent.replace('$', ''));
        expect(price).toBeGreaterThanOrEqual(0);
        expect(price).toBeLessThanOrEqual(50);
      });
    });
  });
  
  test('allows filtering vehicles by category', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/browse', state: { branch: { id: 1 } } }]}>
        <BrowseVehicles data={mockVehicles}/>
      </MemoryRouter>
    );
    const categoryCheckbox = screen.getByLabelText('Car');
    fireEvent.click(categoryCheckbox);
    const applyFiltersButton = screen.getByText('Apply Filters');
    fireEvent.click(applyFiltersButton);
    const vehicleCards = screen.getAllByTestId('vehicle-card');
    vehicleCards.forEach(async (card) => {
      expect(await within(card).findByText(categoryCheckbox.textContent)).toBeInTheDocument();
    });
  });

  test('allows sorting vehicles by price', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/browse', state: { branch: { id: 1 } } }]}>
        <BrowseVehicles data={mockVehicles}/>
      </MemoryRouter>
    );
    const sortDropdown = screen.getByRole('button', { name: /sort by:/i });
    fireEvent.click(sortDropdown);
    const sortByPriceOption = screen.getByText('Price (lowest first)');
    fireEvent.click(sortByPriceOption);
    const vehicleCards = screen.getAllByTestId('vehicle-card');
    const prices = vehicleCards.map((card) =>
      parseFloat(within(card).getByText(/\$/i).textContent.replace('$', ''))
    );
    expect(prices).toEqual(prices.sort((a, b) => a - b));
  });

  test('allows sorting vehicles by mileage', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/browse', state: { branch: { id: 1 } } }]}>
        <BrowseVehicles data={mockVehicles}/>
      </MemoryRouter>
    );
    const sortDropdown = await screen.findByRole('button', { name: /sort by:/i });
    fireEvent.click(sortDropdown);
    const sortByMileageOption =  screen.getByText('Price (lowest first)');
    fireEvent.click(sortByMileageOption);
    const vehicleCards = screen.getAllByTestId('vehicle-card');
    const mileages = vehicleCards.map((card) =>
      parseFloat(within(card).getByText(/mileage:/i).textContent.replace('Mileage: ', ''))
    );
    expect(mileages).toEqual(mileages.sort((a, b) => a - b));
  });
});