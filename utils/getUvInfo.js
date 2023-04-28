export default async function getUvInfo() {
  // let myHeaders = new Headers();
  // myHeaders.append("x-access-token", "openuv-2xtc3tlc6dy4ed-io");
  // myHeaders.append("Content-Type", "application/json");

  // let requestOptions = {
  //   method: "GET",
  //   headers: myHeaders,
  //   redirect: "follow",
  // };

  // const rawData = await fetch(
  //   "https://api.openuv.io/api/v1/uv?lat=6.62&lng=3.38&alt=100&dt=",
  //   requestOptions
  // );

  // const jsonData = await rawData.json();

  // const uvIndex = Math.round(jsonData.result.uv);
  // const exposureLevel = "Unknown";

  // if (Math.round(jsonData.result.uv) <= 2) {
  //   exposureLevel == "Low";
  // } else if (
  //   (Math.round(jsonData.result.uv) >= 3) &
  //   (Math.round(jsonData.result.uv) <= 5)
  // ) {
  //   exposureLevel == "Moderate";
  // } else if (
  //   (Math.round(jsonData.result.uv) >= 6) &
  //   (Math.round(jsonData.result.uv) <= 8)
  // ) {
  //   exposureLevel == "High";
  // } else if (
  //   (Math.round(jsonData.result.uv) >= 9) &
  //   (Math.round(jsonData.result.uv) <= 10)
  // ) {
  //   exposureLevel == "Very High";
  // } else if (Math.round(jsonData.result.uv) >= 11) {
  //   exposureLevel == "Extreme";
  // }

  // return [uvIndex, exposureLevel];
}
