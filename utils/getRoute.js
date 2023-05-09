export default async function getRoute(originCoords, destinationCoords, mode) {
  // API call to get the route
  const api_key = process.env.NEXT_PUBLIC_ROUTE_API_KEY;

  const url = `https://api.openrouteservice.org/v2/directions/${mode}?api_key=${api_key}&start=${originCoords}&end=${destinationCoords}`;

  const headers = {
    Accept:
      "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
  };

  try {
    const response = await fetch(url, { headers });
    const data = await response.json();
    const routeData = data.features[0].properties.segments[0].steps;

    return routeData;
  } catch (error) {
    return [];
  }
}
