import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

const libraries = ["places"];

const containerStyle = {
  width: "90%",
  height: "400px",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  zIndex: 1,
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function haversineDistance(lat1, lng1, lat2, lng2) {
  function toRad(x) {
    return (x * Math.PI) / 180;
  }

  const R = 6371; // earth radius (km)
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

function MyComponent({ branches, selectedBranch }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState(""); // Define the search state variable here
  const [autocomplete, setAutocomplete] = useState(null); // Add this line

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${import.meta.env.VITE_MAPS_API_KEY}`,
    libraries, // Add this line
  });

  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const onLoad = useCallback(
    function callback(map) {
      const bounds = new window.google.maps.LatLngBounds();
      branches.forEach((branch) => {
        const position = {
          lat: parseFloat(branch.geolocation.split(",")[0]),
          lng: parseFloat(branch.geolocation.split(",")[1]),
        };
        bounds.extend(position);

        if (selectedBranch && branch.name === selectedBranch.name) {
          map.setCenter(position);
          map.setZoom(20); // Zoom in on the selected branch
        }
      });
      map.fitBounds(bounds);
      setMap(map);
    },
    [branches, selectedBranch]
  );

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleClick = () => {
    console.log(selectedMarker);
    navigate("/browse", { state: { branch: selectedMarker } });
  };

  return isLoaded ? (
    <div className="relative">
      <div className="flex items-center mb-4">
        <Autocomplete
          onLoad={(auto) => {
            setAutocomplete(auto);
          }}
          onPlaceChanged={() => {
            if (autocomplete != null) {
              const place = autocomplete.getPlace();
              if (place.geometry && place.geometry.location) {
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                console.log(`Latitude: ${lat}, Longitude: ${lng}`);

                let nearestBranch = null;
                let smallestDistance = Infinity;
                branches.forEach((branch) => {
                  const branchLat = parseFloat(
                    branch.geolocation.split(",")[0]
                  );
                  const branchLng = parseFloat(
                    branch.geolocation.split(",")[1]
                  );
                  const distance = haversineDistance(
                    lat,
                    lng,
                    branchLat,
                    branchLng
                  );
                  if (distance < smallestDistance) {
                    smallestDistance = distance;
                    nearestBranch = branch;
                  }
                });

                setSelectedMarker(nearestBranch);
              }
            }
          }}
          className="w-full"
        >
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[75%] px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Autocomplete>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={1}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {branches.map((branch) => {
          const position = {
            lat: parseFloat(branch.geolocation.split(",")[0]),
            lng: parseFloat(branch.geolocation.split(",")[1]),
          };
          return (
            <Marker
              key={branch.name}
              position={position}
              onClick={() => {
                setSelectedMarker(branch);
              }}
            />
          );
        })}
        {selectedMarker && (
          <InfoWindow
            position={{
              lat: parseFloat(selectedMarker.geolocation.split(",")[0]),
              lng: parseFloat(selectedMarker.geolocation.split(",")[1]),
            }}
            onCloseClick={() => {
              setSelectedMarker(null);
            }}
          >
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">
                {selectedMarker.name}
              </h2>
              <p className="text-gray-600">{selectedMarker.address}</p>
              <button
                onClick={handleClick}
                className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Browse Vehicles
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
