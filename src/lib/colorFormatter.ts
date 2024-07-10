export default function colorFormatter(color) {
  // Convert the color string to an RGB array
  const rgb = color
    .replace(/^#/, "")
    .match(/.{1,2}/g)
    .map((value) => parseInt(value, 16));

  // Calculate the new RGB values for the darker color
  const darkRgb = rgb.map((value) => Math.round(value * 0.5));

  // Calculate the new RGB values for the lighter color
  const lightRgb = rgb.map((value) => Math.round(value * 0.5 + 127.5));

  // Convert the RGB arrays to hex strings
  const darkColor =
    "#" + darkRgb.map((value) => value.toString(16).padStart(2, "0")).join("");
  const lightColor =
    "#" + lightRgb.map((value) => value.toString(16).padStart(2, "0")).join("");

  // Return an object with the dark and light colors
  return { darkColor, lightColor };
}
