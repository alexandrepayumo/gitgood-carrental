import React, { Fragment, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import UserReservationManagement from "./UserReservationManagement";
import { motion } from "framer-motion";
import { getUser } from "../api/users";
import moment from 'moment';

function Account() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(sessionStorage.getItem('user')).then((data) => {
      console.log(data);
      setUser(data);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 py-24 px-4 md:px-8"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-center text-gray-800">
            Your Account
          </h1>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-1"
          >
            <div className="bg-white rounded-lg shadow-lg p-8">
              {user && (
                <AccountInfo
                  name={user.first_name + " " + user.last_name}
                  email={user.email}
                  joinedOn={moment(user.date_joined).format('MMMM Do YYYY')}
                />
              )}
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2"
          >
            <div className="bg-white rounded-lg shadow-lg p-8">
              <AccountSettings />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

const AccountInfo = ({ name, email, joinedOn }) => {
  return (
    <Fragment>
      <div className="flex flex-col items-center">
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-36 h-36 rounded-full"
          src="https://github.com/shadcn.png"
          alt=""
        />
        <div className="mt-6 space-y-2">
          <div>
            <label className="font-bold">Name: </label>
            <label className="italic">{name}</label>
          </div>
          <div>
            <label className="font-bold">Email: </label>
            <label className="italic">{email}</label>
          </div>
          <div>
            <label className="font-bold">Joined on: </label>
            <label className="italic">{joinedOn}</label>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

AccountInfo.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  joinedOn: PropTypes.string.isRequired,
};

const AccountSettings = () => {
  return (
    <Fragment>
      <Tabs defaultValue="reservations" className="w-full">
        <TabsList className="flex space-x-4 border-b border-gray-300 mb-6">
          <TabsTrigger
            value="reservations"
            className="px-4 py-2 text-lg font-semibold focus:outline-none focus:border-b-2 focus:border-blue-500"
          >
            My Reservations
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="px-4 py-2 text-lg font-semibold focus:outline-none focus:border-b-2 focus:border-blue-500"
          >
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="reservations">
          <UserReservationManagement />
        </TabsContent>
        <TabsContent value="settings">
          <div className="space-y-8">
            <ChangePassword />
            <DeleteAccount />
          </div>
        </TabsContent>
      </Tabs>
    </Fragment>
  );
};

const ChangePassword = () => {
  return (
    <Fragment>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <form className="space-y-4" action="#">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Password
          </button>
        </form>
      </motion.div>
    </Fragment>
  );
};

const DeleteAccount = () => {
  return (
    <Fragment>
      <Dialog>
        <DialogTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete Account
          </motion.button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Are you sure?
            </DialogTitle>
            <DialogDescription className="mt-2 text-gray-500">
              This will permanently delete your account.
            </DialogDescription>
          </DialogHeader>
          <form className="mt-6 space-y-4" action="#">
            <div className="flex items-center space-x-4">
              <label className="flex-shrink-0 text-gray-700 font-semibold">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete Account
                </motion.button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default Account;
