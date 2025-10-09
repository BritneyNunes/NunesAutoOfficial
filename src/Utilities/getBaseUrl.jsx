export function getBaseUrl() {
  // Get the current URL from the browser
  const url = new URL(window.location.href);

  // Extract the 'ip' query parameter from the URL, default to '44.209.222.79' if not present
  const ip = url.searchParams.get("ip") || '98.91.62.10';

  // Log the IP address for debugging purposes
  console.log(`Using IP address: ${ip}`);

  // Return the base URL with the IP and port 3000
  return `http://${ip}:3000`;
}
