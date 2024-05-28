import React, { Fragment } from "react";
import { Button } from "../ui/button";

const Register = () => {
  return (
    <Fragment>
      <form className="w-full pr-20 space-y-4 md:space-y-6" action="#">
        <div className="grid grid-cols-2 gap-3 content-evenly">
          <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="bg-light-green/50 border border-gray-300 text-gray-900 sm:text-sm 
                            rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="John"
            />
          </div>
          <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              First Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              className="bg-light-green/50 border border-gray-300 text-gray-900 sm:text-sm 
                          rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Doe"
            />
          </div>
        </div>
        <div className="">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="bg-light-green/50 border border-gray-300 text-gray-900 sm:text-sm 
                        rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            placeholder="name@company.com"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-light-green/50 border border-gray-300 text-gray-900 sm:text-sm 
                        rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="password"
            placeholder="••••••••"
            className="bg-light-green/50 border border-gray-300 text-gray-900 sm:text-sm 
                        rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          />
        </div>
        <Button
          type="submit"
          className="w-full text-black bg-light-blue hover:bg-mid-blue focus:ring-4 focus:outline-none
                  focus:ring-light-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Register
        </Button>
      </form>
    </Fragment>
  );
};

export default Register;
