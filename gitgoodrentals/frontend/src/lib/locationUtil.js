// utils/locationUtils.js
import { branches } from "./mockdata";

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

export const getClosestBranch = (location) => {
    if (typeof location === 'string') {
      // If location is a string, find the closest branch by name or address
      return branches.find(
        (branch) =>
          branch.name.toLowerCase() === location.toLowerCase() ||
          branch.address.toLowerCase().includes(location.toLowerCase())
      );
    } else if (typeof location === 'object' && location.latitude && location.longitude) {
      // If location is an object with latitude and longitude, find the closest branch by distance
      const { latitude: userLat, longitude: userLon } = location;
      let closestBranch = null;
      let closestDistance = Infinity;
  
      branches.forEach((branch) => {
        const { latitude: branchLat, longitude: branchLon } = branch;
        const distance = getDistanceFromLatLonInKm(userLat, userLon, branchLat, branchLon);
  
        if (distance < closestDistance) {
          closestBranch = branch;
          closestDistance = distance;
        }
      });
  
      return closestBranch;
    }
  
    return null;
  };

 export const getMatchingBranches = (location) => {
  // Remove spaces and convert to lowercase for more flexible matching
  const inputLocation = location.replace(/\s/g, '').toLowerCase();

  // Check if the input location has at least 1 character
  if (inputLocation.length < 1) {
    return [];
  }

  return branches.filter(
    (branch) =>
      branch.name.replace(/\s/g, '').toLowerCase().includes(inputLocation) ||
      branch.address.replace(/\s/g, '').toLowerCase().includes(inputLocation)
  );
};

export const isValidLocation = (location) => {
  // Remove spaces and convert to lowercase for more flexible matching
  const inputLocation = location.replace(/\s/g, '').toLowerCase();

  // Check if the input location has at least 1 character
  if (inputLocation.length < 1) {
    return false;
  }

  return branches.some(
    (branch) =>
      branch.name.replace(/\s/g, '').toLowerCase().includes(inputLocation) ||
      branch.address.replace(/\s/g, '').toLowerCase().includes(inputLocation)
  );
};