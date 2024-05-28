import React, { Fragment, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { login } from "../api/authentication"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await login(email, password);
  };

  return (
    <Fragment>
      <form className="w-full pr-20 space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            className="bg-light-green/50 border border-gray-300 text-gray-900 sm:text-sm 
                        rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                aria-describedby="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-light-green/50
                            focus:ring-3 focus:ring-primary-300"
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="text-gray-500 dark:text-gray-300">
                Remember me
              </label>
            </div>
          </div>
          <Link
              to={"#"}
              className="text-sm font-medium text-deep-blue hover:underline"
          >
          Forgot Password?
          </Link>
        </div>
        <Button
          type="submit"
          className="w-full text-black bg-light-blue hover:bg-mid-blue focus:ring-4 focus:outline-none
                          focus:ring-light-blue font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Sign in
        </Button>
      </form>
    </Fragment>
  );
}

export default Login;
