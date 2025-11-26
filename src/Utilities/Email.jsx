import emailjs from "@emailjs/browser";
import { useRef } from "react";

function ContactForm() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_hg9kvvj",
        "template_jnsiogm",
        form.current,
        "NtcoRuX6i6c0q2X2R"
      )
      .then(
        (result) => {
          console.log("Email sent:", result.text);
        },
        (error) => {
          console.log("Error:", error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <input type="text" name="user_name" placeholder="Your name" />
      <input type="email" name="user_email" placeholder="Your email" />
      <textarea name="message" placeholder="Message"></textarea>
      <button type="submit">Send</button>
    </form>
  );
}

export default ContactForm;
