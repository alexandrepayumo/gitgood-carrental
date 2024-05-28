import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ReservationIdPage from "../components/CheckIn/ReservationIdPage";

const mockReservation = {
  id: 1,
  checked_in: false,
  customer: {
    name: "John Doe",
  },
  vehicle: {
    brand: "Toyota",
    model: "Camry",
    year: 2022,
    branch: 2,
  },
  start_date: "2023-06-15",
  end_date: "2023-06-20",
  addEquipment: true,
};

beforeAll(() => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
});


describe("Reservation ID Page", () => {
  test("renders check-in steps for a reservation", async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/reservations/1", state: mockReservation }]}>
        <ReservationIdPage />
      </MemoryRouter>
    );

    // Verify initial step is rendered
    expect(screen.getByText("Inspect the Car")).toBeInTheDocument();

    // Click start inspection button and wait for loading to complete
    fireEvent.click(screen.getByText("Start Inspection"));
    await waitFor(() => expect(screen.getByText("Proceed to Next Step")).toBeInTheDocument(), {
      timeout: 4000,
    });

    // Proceed to rental agreement step
    fireEvent.click(screen.getByText("Proceed to Next Step"));
    expect(screen.getByText("Rental Agreement")).toBeInTheDocument();

    // Fill in renter name and agree to terms
    fireEvent.change(screen.getByLabelText("Representative name"), { target: { value: "John wdwdw" } });
    fireEvent.change(screen.getByLabelText("Renter Name"), { target: { value: "John Doe" } });
    fireEvent.click(screen.getByText("Agree and Continue"));

    await waitFor(() => expect(screen.getByText("Deposit")).toBeInTheDocument(), { timeout: 3000 });

    // Enter credit card and process deposit
    fireEvent.change(screen.getByLabelText("Credit Card Number"), { target: { value: "1234567890" } });
    fireEvent.click(screen.getByText("Process Deposit"));
  }, 10000);
});
