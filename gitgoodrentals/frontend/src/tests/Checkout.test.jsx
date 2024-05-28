import React from "react";
import { describe } from "node:test";
import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react";
import CheckOut from "@/components/CheckOut";

describe("Checkout reservation", () => {
  test("Should render a checkout table after clicking in the button 'Checkout'", () => {
    render(<CheckOut rentalFee={55} additionalCharges={44} />);

    const checkoutBtn = screen.getByText("Billing");
    expect(checkoutBtn).toBeInTheDocument();
    fireEvent.click(checkoutBtn);

    expect(screen.queryByTestId("checkoutTable")).toBeInTheDocument();
  });

  test("Should add a row after clicking on the plus sign", () => {
    render(<CheckOut rentalFee={55} additionalCharges={44} />);
    fireEvent.click(screen.getByText("Billing"));

    const addRow = screen.queryByTestId("addRow");
    expect(addRow).toBeInTheDocument();
    var rowCountBefore = screen.queryAllByTestId("row").length;
    fireEvent.click(addRow);
    var rowCountAfter = screen.queryAllByTestId("row").length;
    expect(rowCountAfter - rowCountBefore).toBe(1);
  });

  test("Should remove a row after clicking on the trash icon", () => {
    render(<CheckOut rentalFee={55} additionalCharges={44} />);
    fireEvent.click(screen.getByText("Billing"));
    fireEvent.click(screen.queryByTestId("addRow"));

    var rowCountBefore = screen.queryAllByTestId("row").length;
    const removeRow = screen.queryByTestId("removeRow");
    fireEvent.click(removeRow);
    var rowCountAfter = screen.queryAllByTestId("row").length;
    expect(rowCountBefore - rowCountAfter).toBe(1);
  });

  test("Should calculate subtotal, taxes, and total", () => {
    render(<CheckOut rentalFee={55} additionalCharges={44} />);
    fireEvent.click(screen.getByText("Billing"));

    const subtotal = parseFloat(screen.queryByTestId("subtotal").innerHTML);
    const taxes = parseFloat(screen.queryByTestId("taxes").innerHTML);
    const total = parseFloat(screen.queryByTestId("total").innerHTML);

    expect(subtotal).toBe(99);
    expect(taxes).toBeCloseTo(parseFloat(99 * 0.15, 2));
    expect(total).toBeCloseTo((subtotal + taxes), 2);
  });
});