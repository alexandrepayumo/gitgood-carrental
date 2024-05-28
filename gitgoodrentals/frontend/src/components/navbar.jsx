import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import LoginForm from "./Login-Register/Login-Form";
import RegisterForm from "./Login-Register/Register-Form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "./ui/Sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { logout, isLoggedIn } from "./api/authentication";

const Navbar = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    logout();
    window.location.assign("/");
  };

  return (
    <Fragment>
      <nav
        id="navbar"
        data-testid="navbar"
        className="bg-deep-blue border-gray-200 w-full fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to={"/"}
            id="logo"
            data-testid="logo"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <div className="w-10 h-10 bg-black"></div>
            <span className="self-center text-2xl text-light-blue font-semibold whitespace-nowrap">
              Git Good Rentals
            </span>
          </Link>
          {isLoggedIn && (
            <div className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              {/* User Info Button */}
              <DropdownMenu>
                <DropdownMenuTrigger id="userAvatar" data-testid="userAvatar">
                  <Avatar>
                    <AvatarImage
                      className="w-10 h-10 rounded-full"
                      src="https://github.com/shadcn.png"
                    />
                    <AvatarFallback className="w-10 h-10 rounded-full bg-gray-600"></AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  id="userOptions"
                  data-testid="userOptions"
                  className="w-60 items-center my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg"
                >
                  <DropdownMenuLabel className="px-5 py-4 bg-gray-100">
                    <div className="block text-lg font-semibold text-gray-800 dark:text-white">
                      {sessionStorage.getItem("user").first_name}{" "}
                      {sessionStorage.getItem("user").last_name}
                    </div>
                    <span className="block text-sm text-gray-600 truncate dark:text-gray-400">
                      {sessionStorage.getItem("user").email}
                    </span>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link
                      to={"/account"}
                      className="flex items-center px-5 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <a
                      href="http://127.0.0.1:8000/admin/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-5 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Admin
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <button
                      onClick={handleSubmit}
                      className="flex items-center w-full px-5 py-3 text-base font-medium text-red-600 bg-gray-100 hover:bg-red-50 hover:text-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          <div
            className="items-center justify-between w-auto order-1"
            id="navbar-user"
            data-testid="navbar-user"
          >
            <ul className="flex flex-row font-medium p-0 mt-0 border-0 border-gray-100 rounded-lg bg-transparent space-x-8">
              {isLoggedIn && (
                <li>
                  <Link
                    to={"CheckIn"}
                    className="block py-2 px-3 text-light-blue rounded hover:bg-light-blue hover:text-blue-700"
                  >
                    Reservation Management
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to={"/"}
                  className="block py-2 px-3 text-light-blue rounded hover:bg-light-blue hover:text-blue-700"
                >
                  Home
                </Link>
              </li>
              <li>
                {!isLoggedIn && (
                  <Sheet id="loginRegisterSheet" data-testid="loginRegisterSheet">
                    <SheetTrigger
                      id="sheetTrigger"
                      data-testid="sheetTrigger"
                      className="block py-2 px-3 text-light-blue rounded hover:bg-light-blue hover:text-blue-700"
                    >
                      Login/Register
                    </SheetTrigger>
                    <SheetContent id="sheetContent" data-testid="sheetContent">
                      <SheetHeader>
                        <SheetDescription>
                          <Tabs defaultValue="login" className="w-[400px]">
                            <TabsList className="grid grid-cols-2 gap-3 pt-7 pb-5 pr-12 text-base">
                              <TabsTrigger
                                value="login"
                                className="focus:border-t-2 focus:border-t-mid-blue hover:bg-light-green text-deep-blue"
                              >
                                Login
                              </TabsTrigger>
                              <TabsTrigger
                                value="register"
                                className="focus:border-t-2 focus:border-t-mid-blue hover:bg-light-green text-deep-blue"
                              >
                                Register
                              </TabsTrigger>
                            </TabsList>
                            <TabsContent value="login">
                              <LoginForm />
                            </TabsContent>
                            <TabsContent value="register">
                              <RegisterForm />
                            </TabsContent>
                          </Tabs>
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default Navbar;