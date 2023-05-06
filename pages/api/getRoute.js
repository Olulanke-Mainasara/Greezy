export default async function getRoute({ origin, destination, mode }) {
  const operation = {
    method: "GET",
    headers: { "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY },
    contentType: "application/json",
  };

  // API call to fetch the coords for the origin location
  const originData = await fetch(
    "https://api.api-ninjas.com/v1/geocoding?city=" + origin,
    operation
  );
  const originJsonData = await originData.json();
  const originCoords = [
    originJsonData[0].longitude,
    originJsonData[0].latitude,
  ];

  // API call to fetch the coords for the destination location
  const destinationData = await fetch(
    "https://api.api-ninjas.com/v1/geocoding?city=" + destination,
    operation
  );
  const destinationJsonData = await destinationData.json();
  const destinationCoords = [
    destinationJsonData[0].longitude,
    destinationJsonData[0].latitude,
  ];

  // API call to get the route
  const api_key = process.env.NEXT_PUBLIC_ROUTE_API_KEY;

  const url = `https://api.openrouteservice.org/v2/directions/${mode}`;
  const body = {
    coordinates: [originCoords, destinationCoords],
  };
  const headers = {
    Accept:
      "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
    Authorization: api_key,
    "Content-Type": "application/json; charset=utf-8",
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  const routeJsonData = await response.json();
  const route = routeJsonData.routes[0].segments[0].steps;

  return route;
}
