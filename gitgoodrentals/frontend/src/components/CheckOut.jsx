import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';

const CheckOut = ({ onComplete, onTotalAmount, rentalFee, additionalCharges }) => {
  const handleTotalAmount = () => {
    const totalAmount = document.getElementById("total").innerText;
    onTotalAmount(totalAmount);
    onComplete();
  };

  const addRow = () => {
    var tbody = document.getElementById("checkoutTbody");
    var newRow = tbody.insertRow(-1);
    newRow.setAttribute("data-testid", "row");

    var newCell = newRow.insertCell(0);
    var newEl = document.createElement("input");
    newEl.setAttribute("placeholder", "Damages");
    newEl.setAttribute("type", "text");
    newEl.classList.add("w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500");
    newCell.appendChild(newEl);

    var newCell = newRow.insertCell(1);
    var currency = document.createElement("span");
    currency.appendChild(document.createTextNode("$"));
    currency.classList.add("mr-2", "inline-block", "mt-2");
    newCell.appendChild(currency);
    var newEl = document.createElement("input");
    newEl.setAttribute("type", "number");
    newEl.setAttribute("name", "amount");
    newEl.setAttribute("placeholder", "0");
    newEl.classList.add("w-full", "px-3", "py-2", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "mt-2");
    newEl.addEventListener("input", () => {
      Subtotal();
    });
    newCell.appendChild(newEl);

    var newCell = newRow.insertCell(2);
    var newEl = document.createElement("button");
    newEl.setAttribute("type", "button");
    newEl.setAttribute("data-testid", "removeRow");
    newEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24"><path d="M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z"></path></svg>';
    newEl.classList.add("text-red-500", "hover:text-red-700", "mt-2");
    newEl.addEventListener("click", () => {
      removeRow(newEl);
      Subtotal();
    });
    newCell.appendChild(newEl);
  };

  const removeRow = (el) => {
    var p = el.parentNode.parentNode;
    p.parentNode.removeChild(p);
  };

  const [isTableVisible, setIsTableVisible] = useState(false);

  useEffect(() => {
    const table = document.querySelector(".checkoutTable");
    if (table) {
      const total = table.querySelector("#total");
      if (total) Subtotal();
    }
  }, []);

  return (
    <Fragment>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-lg p-6"
      >
        <div className="max-w-lg mx-auto">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Billing</h2>
          </div>
          <form className="grid gap-4 py-4 checkoutTable" data-testid="checkoutTable" action="#">
            <table id="checkoutTable" className="w-full">
              <thead className="border-b-2 text-left">
                <tr>
                  <th className="pb-2 pr-4">Charges Description</th>
                  <th className="pb-2">Amount</th>
                </tr>
              </thead>
              <tbody id="checkoutTbody" data-testid="checkoutTbody" className="relative pt-6 pb-6">
                <tr data-testid="row">
                  <td className="py-2 pr-4">Rent</td>
                  <td className="py-2">
                    <span className="currency-symbol mr-2">$</span>
                    <input
                      name="amount"
                      type="number"
                      value={rentalFee}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Service Charges</td>
                  <td className="py-2">
                    <span className="currency-symbol mr-2">$</span>
                    <input
                      name="amount"
                      type="number"
                      value={additionalCharges}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                </tr>
              </tbody>
              <tfoot className="border-t-2">
                <tr>
                  <td className="py-2 pr-4">Subtotal</td>
                  <td className="py-2">
                    <span className="currency-symbol mr-2">$</span>
                    <label id="subtotal" data-testid="subtotal">
                      {rentalFee + additionalCharges}
                    </label>
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Taxes</td>
                  <td className="py-2">
                    <span className="currency-symbol mr-2">$</span>
                    <label id="taxes" data-testid="taxes">
                      {parseFloat((rentalFee + additionalCharges) * 0.15).toFixed(2)}
                    </label>
                  </td>
                </tr>
                <tr className="bg-blue-500 text-white rounded-md">
                  <td className="py-2 pr-4">Total</td>
                  <td className="py-2">
                    <span className="currency-symbol mr-2">$</span>
                    <label id="total" data-testid="total">
                      {parseFloat(
                        rentalFee + additionalCharges + 0.15 * (rentalFee + additionalCharges)
                      ).toFixed(2)}
                    </label>
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={addRow}
                data-testid="addRow"
                className="flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Row
              </button>
            </div>
          </form>
          <div className="flex justify-end mt-4">
            <Button onClick={handleTotalAmount}>Charge Customer</Button>
          </div>
        </div>
      </motion.div>
    </Fragment>
  );
};

const Subtotal = () => {
  var amounts = document.getElementsByName("amount");
  var sum = 0;
  amounts.forEach((el) => {
    if (!isNaN(parseFloat(el.value))) {
      sum += parseFloat(el.value);
    }
  });
  document.getElementById("subtotal").innerText = sum.toFixed(2);
  Taxes();
};

const Taxes = () => {
  document.getElementById("taxes").innerText = (
    parseFloat(document.getElementById("subtotal").innerText) * 0.15
  ).toFixed(2);
  Total();
};

const Total = () => {
  var subtotal = parseFloat(document.getElementById("subtotal").innerText);
  var taxes = parseFloat(document.getElementById("taxes").innerText);
  document.getElementById("total").innerText = (taxes + subtotal).toFixed(2);
};

CheckOut.propTypes = {
  rentalFee: PropTypes.number.isRequired,
  additionalCharges: PropTypes.number.isRequired,
};

export default CheckOut;