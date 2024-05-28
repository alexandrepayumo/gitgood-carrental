import { useState } from "react";
import "./AdminPage.css";
import React from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AdminPage() {
  const reservations = [
    {
      id: "113213",
      userId: 4687498,
      createdOn: new Date("2024/04/07"),
      vehicleId: "6544",
      branch: "1",
      startDate: new Date("2024/05/25"),
      endDate: new Date("2024/06/15"),
      comments: "user comments will be here",
      status: 0,
    },
    {
      id: "324122",
      userId: 9875643,
      createdOn: new Date("2024/02/02"),
      vehicleId: "3522",
      branch: "2",
      startDate: new Date("2024/03/16"),
      endDate: new Date("2024/03/26"),
      comments: "user comments will be here",
      status: 2,
    },
    {
      id: "563873",
      userId: 1647897,
      createdOn: new Date("2023/12/10"),
      vehicleId: "8431",
      branch: "3",
      startDate: new Date("2023/12/25"),
      endDate: new Date("2023/12/29"),
      comments: "user comments will be here",
      status: 1,
    },
    {
      id: "764323",
      userId: 7984321,
      createdOn: new Date("2023/12/10"),
      vehicleId: "8431",
      branch: "3",
      startDate: new Date("2023/12/25"),
      endDate: new Date("2023/12/29"),
      comments: "user comments will be here",
      status: 2,
    },
  ];

  const vehicles = [
    {
      id: 65413,
      addedOn: new Date("2015/05/24"),
      branchId: 1,
      type: "SUV",
      brand: "carbrand1",
      model: "carmodel1",
      company: "company1",
      desc: "car description1",
      price: 789,
      addOn: "list of add ons",
      status: 0,
    },
    {
      id: 33245,
      addedOn: new Date("2017/11/13"),
      branchId: 2,
      type: "SUV",
      brand: "carbrand2",
      model: "carmodel2",
      company: "company2",
      desc: "car description2",
      price: 593,
      addOn: "list of add ons",
      status: 1,
    },
    {
      id: 16572,
      addedOn: new Date("2018/06/29"),
      branchId: 2,
      type: "SUV",
      brand: "carbrand3",
      model: "carmodel3",
      company: "company3",
      desc: "car description3",
      price: 324,
      addOn: "list of add ons",
      status: 0,
    },
    {
      id: 68733,
      addedOn: new Date("2014/08/14"),
      branchId: 4,
      type: "SUV",
      brand: "carbrand4",
      model: "carmodel4",
      company: "company1",
      desc: "car description4",
      price: 451,
      addOn: "list of add ons",
      status: 1,
    },
    {
      id: 84634,
      addedOn: new Date("2013/09/26"),
      branchId: 3,
      type: "SUV",
      brand: "carbrand5",
      model: "carmodel5",
      company: "company2",
      desc: "car description5",
      price: 138,
      addOn: "list of add ons",
      status: 0,
    },
  ];

  const users = [
    {
      id: 4687498,
      email: "user4687498@email.com",
      fName: "John",
      lName: "Doe",
      phone: "5148952365",
      role: "User",
      isActive: true,
      isStaff: false,
      isSuperuser: false,
    },
    {
      id: 9875643,
      email: "user9875643@email.com",
      fName: "Heather",
      lName: "Brown",
      phone: "9132010766",
      role: "User",
      isActive: false,
      isStaff: false,
      isSuperuser: false,
    },
    {
      id: 6873213,
      email: "user6873213@email.com",
      fName: "Paul",
      lName: "Caulder",
      phone: "2562395593",
      role: "User",
      isActive: true,
      isStaff: true,
      isSuperuser: false,
    },
    {
      id: 1647897,
      email: "user1647897@email.com",
      fName: "Monica",
      lName: "Leake",
      phone: "4253264524",
      role: "Admin",
      isActive: true,
      isStaff: true,
      isSuperuser: true,
    },
    {
      id: 7984321,
      email: "user7984321@email.com",
      fName: "Carlos",
      lName: "Turner",
      phone: "646-327-7252",
      role: "Admin",
      isActive: false,
      isStaff: true,
      isSuperuser: true,
    },
  ];

  const options = {
    user: 0,
    reservation: 1,
    vehicle: 2,
  };

  const [selected, setSelected] = useState(options.user);
  const [readOnly, setReadOnly] = useState(true);
  const [viewId, setViewId] = useState(-1); // index of the element in its respective array (users, reservations, vehicles)
  const [userInputs, setUserInputs] = useState({});
  const [vehicleInputs, setVehicleInputs] = useState({});
  const [reservationInputs, setReservationInputs] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    var temp;
    switch (selected) {
      case options.user: {
        temp = {
          id: userInputs.id,
          email: userInputs.email,
          fName: userInputs.fname,
          lName: userInputs.lname,
          phone: userInputs.phone,
          isSuperuser: userInputs.superuser,
          isStaff: userInputs.staff,
          isActive: userInputs.active,
          role: userInputs.role,
        };

        users[viewId] = temp;
        break;
      }
      case options.reservation: {
        temp = {
          id: reservationInputs.id,
          userId: reservationInputs.userId,
          createdOn: reservationInputs.createdOn,
          vehicleId: reservationInputs.vehicleId,
          branch: reservationInputs.branch,
          startDate: reservationInputs.startDate,
          endDate: reservationInputs.endDate,
          comments: reservationInputs.comments,
          status: reservationInputs.status,
        };

        reservations[viewId] = temp;
        break;
      }
      case options.vehicle: {
        temp = {
          id: vehicleInputs.id,
          addedOn: vehicleInputs.addedOn,
          branchId: vehicleInputs.branchId,
          type: vehicleInputs.type,
          brand: vehicleInputs.brand,
          model: vehicleInputs.model,
          company: vehicleInputs.company,
          desc: vehicleInputs.desc,
          price: vehicleInputs.price,
          addOn: vehicleInputs.addOn,
          status: vehicleInputs.status,
        };

        vehicles[viewId] = temp;
        break;
      }
    }
    setReadOnly(true);
  };

  const handleInputChange = (event) => {
    const name = event.target.name;
    var value = event.target.value;

    switch (selected) {
      case options.user: {
        if (name == "superuser" || name == "staff") {
          setUserInputs((values) => ({ ...values, [name]: !userInputs[name] }));
        } else {
          setUserInputs((values) => ({ ...values, [name]: value }));
        }
        break;
      }
      case options.reservation: {
        setReservationInputs((values) => ({ ...values, [name]: value }));
        break;
      }
      case options.vehicle: {
        setVehicleInputs((values) => ({ ...values, [name]: value }));
        break;
      }
    }
  };

  const handleEndDateChange = (event) => {
    setReservationInputs((values) => ({ ...values, ["endDate"]: event }));
  };
  const handleStartDateChange = (event) => {
    setReservationInputs((values) => ({ ...values, ["startDate"]: event }));
  };

  const handleSetSelected = (index = viewId) => {
    var temp;
    switch (selected) {
      case options.user: {
        temp = users[index];
        setUserInputs({
          id: temp.id,
          email: temp.email,
          fname: temp.fName,
          lname: temp.lName,
          phone: temp.phone,
          superuser: temp.isSuperuser,
          staff: temp.isStaff,
          active: temp.isActive,
          role: temp.role,
        });
        break;
      }
      case options.reservation: {
        temp = reservations[index];
        setReservationInputs({
          id: temp.id,
          userId: temp.userId,
          createdOn: temp.createdOn,
          vehicleId: temp.vehicleId,
          branch: temp.branch,
          startDate: temp.startDate,
          endDate: temp.endDate,
          comments: temp.comments,
          status: temp.status,
        });
        break;
      }
      case options.vehicle: {
        temp = vehicles[index];
        setVehicleInputs({
          id: temp.id,
          addedOn: temp.addedOn,
          branchId: temp.branchId,
          type: temp.type,
          brand: temp.brand,
          model: temp.model,
          company: temp.company,
          desc: temp.desc,
          price: temp.price,
          addOn: temp.addOn,
          status: temp.status,
        });
        break;
      }
    }
    setReadOnly(true);
    setViewId(index);
  };

  const rStatus = {
    0: "Confirmed",
    1: "Completed",
    2: "Cancelled",
  };

  const vStatus = {
    0: "Available",
    1: "Booked",
  };

  const uStatus = {
    0: "Active",
    1: "Innactive",
  };

  const userRoles = {
    user: "User",
    admin: "Admin",
  };
  const editable = readOnly ? "" : "editable";

  const editBtn = (
    <button
      type="button"
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      onClick={() => setReadOnly(!readOnly)}
    >
      {readOnly ? "Edit" : "Cancel"}
    </button>
  );

  const reservationTable = (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reservation Id
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created On
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vehicle Id
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reservations.map((val, key) => {
            if (viewId === -1 || val.userId === users[viewId].id) {
              return (
                <tr key={key}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">#{val.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {moment(val.createdOn).format("MMMM Do YYYY")}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{val.vehicleId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {rStatus[val.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => handleSetSelected(key)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );

  const vehiclesTable = (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Vehicle Id
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Added On
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Brand
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {vehicles.map((val, key) => (
            <tr key={key}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">#{val.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                  {moment(val.addedOn).format("MMMM Do YYYY")}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{val.brand}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{val.company}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {vStatus[val.status]}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => handleSetSelected(key)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const userTable = (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User Id
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              First Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((val, key) => (
            <tr key={key}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">#{val.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{val.fName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{val.lName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{val.role}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {val.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  type="button"
                  className="text-indigo-600 hover:text-indigo-900"
                  onClick={() => handleSetSelected(key)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  const UserView = (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={() => setViewId(() => -1)}
        >
          Back
        </button>
        <h1 className="text-2xl font-bold">
          User Id: <span className="text-indigo-600">{userInputs.id}</span>
        </h1>
        <div className="flex items-center space-x-4">
          <label className="block text-sm font-medium text-gray-700">
            Status:
          </label>
          <select
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            name="active"
            value={userInputs.isActive}
            onChange={handleInputChange}
            disabled={readOnly}
          >
            <option value={true}>{uStatus[0]}</option>
            <option value={false}>{uStatus[1]}</option>
          </select>
          {editBtn}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              First Name:
            </label>
            <input
              className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${editable}`}
              name="fname"
              defaultValue={userInputs.fname}
              disabled={readOnly}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Last Name:
            </label>
            <input
              className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${editable}`}
              name="lname"
              defaultValue={userInputs.lname}
              disabled={readOnly}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${editable}`}
            name="email"
            defaultValue={userInputs.email}
            disabled={readOnly}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Phone:
          </label>
          <input
            className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${editable}`}
            name="phone"
            defaultValue={userInputs.phone}
            disabled={readOnly}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Role:</label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                name="role"
                value={userRoles.admin}
                checked={userInputs.role === "Admin"}
                onChange={handleInputChange}
                disabled={readOnly}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label className="ml-3 block text-sm font-medium text-gray-700">
                Admin
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="role"
                value={userRoles.user}
                checked={userInputs.role === "User"}
                onChange={handleInputChange}
                disabled={readOnly}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label className="ml-3 block text-sm font-medium text-gray-700">
                User
              </label>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center space-x-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="superuser"
              checked={userInputs.superuser}
              onChange={handleInputChange}
              disabled={readOnly}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label className="ml-3 block text-sm font-medium text-gray-700">
              Super user
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="staff"
              checked={userInputs.staff}
              onChange={handleInputChange}
              disabled={readOnly}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label className="ml-3 block text-sm font-medium text-gray-700">
              Staff
            </label>
          </div>
        </div>
        <div className="mt-6">{reservationTable}</div>
        <button
          type="submit"
          className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
  
  const ReservationView = (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={() => setViewId(() => -1)}
        >
          Back
        </button>
        <h1 className="text-2xl font-bold">
          Reservation Id:{" "}
          <span className="text-indigo-600">#{reservationInputs.id}</span>
        </h1>
        <div className="flex items-center space-x-4">
          <label className="block text-sm font-medium text-gray-700">
            Status:
          </label>
          <select
            name="status"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={reservationInputs.status}
            onChange={handleInputChange}
            disabled={readOnly}
          >
            <option value={0}>{rStatus[0]}</option>
            <option value={1}>{rStatus[1]}</option>
            <option value={2}>{rStatus[2]}</option>
          </select>
          {editBtn}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Created On:
          </label>
          <p className="mt-1 text-sm text-gray-500">
            {moment(reservationInputs.createdOn).format("MMMM Do YYYY")}
          </p>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            User Id:
          </label>
          <input
            name="userId"
            className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${editable}`}
            defaultValue={"#" + reservationInputs.userId}
            disabled={readOnly}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Vehicle Id:
          </label>
          <input
            name="vehicleId"
            className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${editable}`}
            defaultValue={reservationInputs.vehicleId}
            disabled={readOnly}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Branch:
          </label>
          <input
            name="branch"
            className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${editable}`}
            defaultValue={reservationInputs.branch}
            disabled={readOnly}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Start Date:
          </label>
          <DatePicker
            name="startDate"
            disabled={readOnly}
            showIcon
            minDate={new Date()}
            maxDate={reservationInputs.endDate}
            selected={reservationInputs.startDate}
            value={reservationInputs.startDate}
            onChange={handleStartDateChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            End Date:
          </label>
          <DatePicker
            name="endDate"
            disabled={readOnly}
            showIcon
            minDate={reservationInputs.startDate}
            selected={reservationInputs.endDate}
            value={reservationInputs.endDate}
            onChange={handleEndDateChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Comments:
          </label>
          <textarea
            className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${editable}`}
            name="comments"
            rows={4}
            defaultValue={reservationInputs.comments}
            disabled={readOnly}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
  const VehicleView = (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={() => setViewId(() => -1)}
        >
          Back
        </button>
        <h1 className="text-2xl font-bold">
          Vehicle Id: <span className="text-indigo-600">#{vehicleInputs.id}</span>
        </h1>
        <div className="flex items-center space-x-4">
          <label className="block text-sm font-medium text-gray-700">
            Status:
          </label>
          <select
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={vehicleInputs.status}
            onChange={handleInputChange}
            disabled={readOnly}
          >
            <option value={0}>Available</option>
            <option value={1}>Booked</option>
          </select>
          {editBtn}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Added On:
          </label>
          <p className="mt-1 text-sm text-gray-500">
            {moment(vehicleInputs.addedOn).format("MMMM Do YYYY")}
          </p>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Company:
          </label>
          <input
            name="company"
            className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${editable}`}
            defaultValue={vehicleInputs.company}
            disabled={readOnly}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Brand:</label>
          <input
            name="brand"
            className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${editable}`}
            defaultValue={vehicleInputs.brand}
            disabled={readOnly}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Model:</label>
          <input
            name="model"
            className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${editable}`}
            defaultValue={vehicleInputs.model}
            disabled={readOnly}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">Type:</label>
          <input
            name="type"
            className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${editable}`}
            defaultValue={vehicleInputs.type}
            disabled={readOnly}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${editable}`}
            name="desc"
            rows={4}
            defaultValue={vehicleInputs.desc}
            disabled={readOnly}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700">
            Branch:
          </label>
          <input
            name="branchId"
            className={`mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${editable}`}
            defaultValue={vehicleInputs.branchId}
            disabled={readOnly}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
  var tableContent = "";
  switch (selected) {
    case options.user:
      tableContent = userTable;
      break;
    case options.reservation:
      tableContent = reservationTable;
      break;
    case options.vehicle:
      tableContent = vehiclesTable;
      break;
    default:
      tableContent = userTable;
  }
  
  const listView = (
    <div className="flex">
      <div className="w-1/4 bg-gray-100 p-4">
        <nav className="space-y-2">
          <button
            className={`block w-full py-2 px-4 text-sm font-medium text-left rounded-md focus:outline-none ${
              selected === options.user
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setSelected(() => options.user)}
          >
            Users
          </button>
          <button
            className={`block w-full py-2 px-4 text-sm font-medium text-left rounded-md focus:outline-none ${
              selected === options.reservation
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setSelected(() => options.reservation)}
          >
            Reservations
          </button>
          <button
            className={`block w-full py-2 px-4 text-sm font-medium text-left rounded-md focus:outline-none ${
              selected === options.vehicle
                ? "bg-indigo-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setSelected(() => options.vehicle)}
          >
            Vehicles
          </button>
        </nav>
      </div>
      <div className="flex-1 p-4">
        <ScrollArea className="h-full overflow-y-scroll">
          {tableContent}
        </ScrollArea>
      </div>
    </div>
  );
  
  var mainContent;
  if (viewId !== -1) {
    switch (selected) {
      case options.user: {
        mainContent = UserView;
        break;
      }
      case options.vehicle: {
        mainContent = VehicleView;
        break;
      }
      case options.reservation: {
        mainContent = ReservationView;
        break;
      }
    }
  } else {
    mainContent = listView;
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow-lg">
              <div className="p-6">{mainContent}</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminPage;
