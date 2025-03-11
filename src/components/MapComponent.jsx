import React, { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 38.986006,
  lng: -76.942558,
};

const STATIC_CIRCLE_OPTIONS = {
  fillColor: "#4285F4",
  fillOpacity: 0.3,
  strokeColor: "#4285F4",
  strokeOpacity: 0.6,
  strokeWeight: 2,
  clickable: false,
};

const MapComponent = ({
  onLocationSelected,
  hintVisible,
  hintCenter,
  hintRadius,
  correctLocation,
}) => {
  const [markerPosition, setMarkerPosition] = useState(null);
  const mapRef = useRef(null);
  const circleRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const handleMapClick = useCallback(
    (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setMarkerPosition({ lat, lng });
      onLocationSelected({ lat, lng });
    },
    [onLocationSelected]
  );

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // Handle circle creation/deletion
  useEffect(() => {
    if (!mapRef.current || !hintCenter || !hintRadius) return;

    // Create circle if it doesn't exist
    if (!circleRef.current) {
      circleRef.current = new window.google.maps.Circle({
        ...STATIC_CIRCLE_OPTIONS,
        center: hintCenter,
        radius: hintRadius,
        map: null // Start with no map
      });
    }

    // Set the map property to show/hide the circle
    circleRef.current.setMap(hintVisible ? mapRef.current : null);

    // Cleanup on unmount
    return () => {
      if (circleRef.current) {
        circleRef.current.setMap(null);
        circleRef.current = null;
      }
    };
  }, [hintVisible, hintCenter, hintRadius]);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={15}
      onClick={handleMapClick}
      onLoad={onMapLoad}
    >
      {markerPosition && <Marker position={markerPosition} />}
      {correctLocation && (
        <Marker
          position={correctLocation}
          icon={{
            url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
            scaledSize: { width: 40, height: 40 },
          }}
        />
      )}
    </GoogleMap>
  );
};

export default React.memo(MapComponent);
