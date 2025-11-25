export async function sendEmail(to, subject, html) {
  try {
    const stored = localStorage.getItem("basicAuthToken")
    console.log("to, subject: ", to, subject)
    console.log({...localStorage})

    if (!stored) {
      console.log("No auth token found in localStorage");
      return { success: false, message: "User not logged in" };
    }

    const response = await fetch("http://98.91.62.10:3000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${stored}`   
      },
      body: JSON.stringify({ to, subject, html })

    });

    return await response.json();
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error: error.message };
  }
}
