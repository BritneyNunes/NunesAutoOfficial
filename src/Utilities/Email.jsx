import { use } from "react";

export async function sendEmail(to, subject, html) {
  try {
    const userExists = localStorage.getItem("user")
    console.log("userExists: ", userExists)
    console.log({ ...localStorage })

    if (!userExists) {
      console.log("No auth token found in localStorage");
      return { success: false, message: "User not logged in" };
    }

    const response = await fetch("http://98.91.62.10:3000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ to, subject, html })
    });

    return await response.json();
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error: error.message };
  }
}
