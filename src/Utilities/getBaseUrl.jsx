export function getBaseUrl() {
  const url = new URL(window.location.href);
  const ip = url.searchParams.get("ip");
  console.log(`Ip address before if statement: ${ip}`)
  console.log(`Url: ${url}`)

  if (ip) {
    console.log(`Ip address: ${ip}`)
    return `http://${ip}:3000`; // Use query string IP
  }

  // fallback for local dev
  return "http://localhost:3000";
}
