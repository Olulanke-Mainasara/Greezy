export default async function getCities(e) {
  const operation = {
    method: "GET",
    headers: { "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY },
    contentType: "application/json",
  };

  const rawData = await fetch(
    "https://api.api-ninjas.com/v1/geocoding?city=" + e.target.value,
    operation
  );
  const jsonData = await rawData.json();

  return jsonData;
}
