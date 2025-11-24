export const sendEmail = async () => {
  const response = await fetch("http://localhost:3000/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: "britneynunes@gmail.com",
      subject: "Order Confirmation",
      message: "Thank you for ordering with NunesAuto!",
    }),
  });

  const data = await response.json();
  console.log(data);
};
