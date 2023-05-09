export default async function getCities(query, limit) {
  try {
    const rawData = await fetch(
      `https://nominatim.openstreetmap.org/?q=${query}&format=json&${limit}`
    );
    const data = await rawData.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
