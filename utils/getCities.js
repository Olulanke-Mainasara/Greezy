export default async function getCities(query, limit) {
  try {
    const rawData = await fetch(
      `https://nominatim.openstreetmap.org/?q=${query}&format=json&${limit}`
    );
    const data = await rawData.json();

    const names = [];
    const actualData = [];

    data.forEach((item) => {
      const locationData = item.display_name.split(",");
      const length = locationData.length;

      if (!names.includes(item.display_name) && length > 1) {
        names.push(item.display_name);
        actualData.push(item);
      }
    });

    return actualData;
  } catch (error) {}
}
