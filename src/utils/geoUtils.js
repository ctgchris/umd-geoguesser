const EARTH_RADIUS_METERS = 6371000;

export const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const toRadians = (deg) => deg * (Math.PI / 180);
  const dLat = toRadians(lat2 - lat1);
  const dLng = toRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_METERS * c;
};

export const generateRandomPointInRadius = (centerLat, centerLng, radiusMeters) => {
  const r = Math.sqrt(Math.random()) * radiusMeters;
  const theta = Math.random() * 2 * Math.PI;
  const offsetLat = r * Math.cos(theta) / 111320;
  const offsetLng = r * Math.sin(theta) / (111320 * Math.cos(centerLat * (Math.PI / 180)));
  
  return {
    lat: centerLat + offsetLat,
    lng: centerLng + offsetLng,
  };
}; 